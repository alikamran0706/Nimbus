import { PDFParse } from 'pdf-parse';
import mammoth from 'mammoth';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import vision from "@google-cloud/vision";

// Create promisified version of fs.readFile
const readFileAsync = promisify(fs.readFile);

// Extract text from PDF using v1 API
// Extract text from PDF using file:// URL
const client = new vision.ImageAnnotatorClient();

export const extractTextFromPDF = async (filePath) => {
    try {

        // Normalize path for Windows and convert to file:// URL
        const normalizedPath = path.normalize(filePath);

        // Check if file exists
        if (!fs.existsSync(normalizedPath)) {
            throw new Error(`File not found: ${normalizedPath}`);
        }

        // Convert Windows path to file:// URL
        let fileUrl;
        if (process.platform === 'win32') {
            // For Windows: C:\path\to\file.pdf -> file:///C:/path/to/file.pdf
            fileUrl = `file:///${normalizedPath.replace(/\\/g, '/')}`;
        } else {
            // For Unix/Linux/Mac
            fileUrl = `file://${normalizedPath}`;
        }

        console.log('Using file URL:', fileUrl);

        // Use v2 API with file:// URL
        const parser = new PDFParse({ url: fileUrl });
        const resultParse = await parser.getText();

        console.log('PDF parsed successfully, text length....................................:', resultParse.text.length);
        console.log('First 200 chars:', resultParse.text);

        return resultParse.text;
    } catch (error) {
        console.error('PDF Parse Error:', error);

        // Fallback: Try reading as buffer and parsing with alternative method
        console.log('Trying alternative PDF parsing method...');
        try {
            return await extractTextFromPDFFallback(filePath);
        } catch (fallbackError) {
            throw new Error(`PDF extraction failed: ${error.message}`);
        }
    }
};

// Fallback method using buffer reading
const extractTextFromPDFFallback = async (filePath) => {
    try {
        console.log('Using fallback PDF parsing method');

        const normalizedPath = path.normalize(filePath);
        const dataBuffer = await readFileAsync(normalizedPath);

        // Try to extract text from PDF buffer (basic text extraction)
        // This is a simple regex-based extraction for PDFs with text content
        const bufferStr = dataBuffer.toString('binary');

        // Look for text streams in PDF (simplified)
        const textMatches = [];

        // Pattern 1: Text in parentheses (PDF text strings)
        const parenMatches = bufferStr.match(/\(([^)]+)\)/g) || [];
        textMatches.push(...parenMatches.map(m => m.slice(1, -1)));

        // Pattern 2: Text between TJ operators
        const tjMatches = bufferStr.match(/\[([^\]]+)\]/g) || [];
        textMatches.push(...tjMatches.map(m => m.slice(1, -1)));

        // Pattern 3: Text after Td/TD/T* operators (simplified)
        const textParts = bufferStr.split(/(Td|TD|T\*)/);
        for (let i = 1; i < textParts.length; i += 2) {
            if (textParts[i + 1]) {
                const potentialText = textParts[i + 1].trim();
                if (potentialText.length > 1 && !potentialText.includes('BT') && !potentialText.includes('ET')) {
                    textMatches.push(potentialText);
                }
            }
        }

        // Clean and combine text
        let extractedText = textMatches
            .map(text => text
                .replace(/\\\(/g, '(')
                .replace(/\\\)/g, ')')
                .replace(/\\n/g, '\n')
                .replace(/\\r/g, '\r')
                .replace(/\\t/g, '\t')
                .trim()
            )
            .filter(text => text.length > 0)
            .join(' ');

        console.log('Fallback extraction complete, text length:', extractedText.length);

        if (extractedText.length < 50) {
            throw new Error('Insufficient text extracted from PDF');
        }

        return extractedText;
    } catch (error) {
        console.error('Fallback PDF parse error:', error);
        throw error;
    }
};

// Extract text from DOC/DOCX
export const extractTextFromDoc = async (filePath) => {
    try {
        console.log('Reading DOC file from:', filePath);
        const result = await mammoth.extractRawText({ path: filePath });
        console.log('DOC parsed successfully, text length:', result.value.length);
        return result.value;
    } catch (error) {
        console.error('DOC Parse Error:', error);
        throw new Error(`DOC extraction failed: ${error.message}`);
    }
};

// Email regex pattern
const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;

// Phone regex pattern (international format)
const phoneRegex = /(\+\d{1,3}[\s-]?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/g;

// LinkedIn URL pattern
const linkedinRegex = /(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?/gi;

// Main resume parsing function
export const parseResumeText = async (text) => {

    const lines = text.split('\n');

    const parsedData = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: null,
        nationality: '',
        linkedinUrl: '',
        title: '',
        summary: text.substring(0, 300), // Use first 300 chars as summary
        yearsOfExperience: 0,
        careerLevel: 'mid',
        desiredJobTitle: '',
        preferredWorkType: 'hybrid',
        immediateAvailability: false,
        workExperience: [],
        education: [],
        skills: {
            technical: [],
            soft: []
        },
        certifications: [],
        languages: []
    };

    // Extract email
    const emailMatches = text.match(emailRegex);
    if (emailMatches && emailMatches.length > 0) {
        parsedData.email = emailMatches[0];
        console.log('Found email:', parsedData.email);
    }

    // Extract phone
    const phoneMatches = text.match(phoneRegex);
    if (phoneMatches && phoneMatches.length > 0) {
        parsedData.phone = phoneMatches[0];
        console.log('Found phone:', parsedData.phone);
    }

    // Extract LinkedIn URL
    const linkedinMatches = text.match(linkedinRegex);
    if (linkedinMatches && linkedinMatches.length > 0) {
        parsedData.linkedinUrl = linkedinMatches[0];
        console.log('Found LinkedIn:', parsedData.linkedinUrl);
    }

    // Extract name (look for common name patterns in first few lines)
    for (let i = 0; i < Math.min(10, lines.length); i++) {
        const line = lines[i].trim();
        // Skip lines that are too short or contain common non-name patterns
        if (line.length < 2 || line.includes('@') || line.includes('http') ||
            line.includes('phone') || line.includes('email') || line.includes('linkedin')) {
            continue;
        }

        // Common name pattern: First Last or First M. Last
        // Look for lines with 2-4 words, all starting with capital letters
        const nameParts = line.split(/\s+/);
        if (nameParts.length >= 2 && nameParts.length <= 4) {
            const allStartWithCapital = nameParts.every(part => /^[A-Z][a-z]*\.?$/.test(part));
            if (allStartWithCapital) {
                parsedData.firstName = nameParts[0];
                parsedData.lastName = nameParts[nameParts.length - 1];
                console.log('Found name:', parsedData.firstName, parsedData.lastName);
                break;
            }
        }
    }

    // Extract work experience (improved logic)
    const workExperience = [];
    let currentExp = null;
    let inExperienceSection = false;

    // Look for experience section header
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim().toLowerCase();

        if (line.includes('experience') || line.includes('employment') || line.includes('work history')) {
            inExperienceSection = true;
            console.log('Found experience section at line:', i);
            continue;
        }

        if (inExperienceSection) {
            // Check if we've moved to next section
            if (line.includes('education') || line.includes('skills') || line.includes('projects') ||
                line.includes('certifications') || line.includes('languages')) {
                inExperienceSection = false;
                if (currentExp) {
                    workExperience.push(currentExp);
                    currentExp = null;
                }
                break;
            }

            // Look for date patterns
            const datePattern = /(\d{4})\s*[-–]\s*(?:(\d{4})|Present|Current|Now)/i;
            const dateMatch = line.match(datePattern);

            if (dateMatch) {
                if (currentExp) {
                    workExperience.push(currentExp);
                }

                const startYear = parseInt(dateMatch[1]);
                const endYear = dateMatch[2] ? parseInt(dateMatch[2]) : null;
                const isCurrent = !dateMatch[2] || ['Present', 'Current', 'Now'].some(term =>
                    dateMatch[2].toLowerCase().includes(term.toLowerCase())
                );

                // Try to extract company and position
                const content = line.replace(datePattern, '').trim();
                let company = content;
                let position = '';

                // Look for common separators
                if (content.includes('|')) {
                    const parts = content.split('|').map(p => p.trim());
                    company = parts[0] || '';
                    position = parts[1] || '';
                } else if (content.includes(' at ')) {
                    const parts = content.split(' at ');
                    position = parts[0] || '';
                    company = parts[1] || '';
                } else if (content.includes(', ')) {
                    const parts = content.split(', ');
                    position = parts[0] || '';
                    company = parts[1] || '';
                }

                currentExp = {
                    company: company,
                    position: position,
                    startDate: startYear ? new Date(startYear, 0, 1) : null,
                    endDate: endYear ? new Date(endYear, 11, 31) : null,
                    isCurrent: isCurrent,
                    description: ''
                };
            } else if (currentExp && line.length > 0) {
                // Add bullet points to description
                if (line.startsWith('•') || line.startsWith('-') || line.startsWith('*')) {
                    currentExp.description += line.substring(1).trim() + '\n';
                } else if (!line.match(/^\s*$/)) {
                    currentExp.description += line + ' ';
                }
            }
        }
    }

    if (currentExp) {
        workExperience.push(currentExp);
    }

    parsedData.workExperience = workExperience;
    console.log('Found work experiences:', workExperience.length);
    workExperience.forEach((exp, idx) => {
        console.log(`Exp ${idx + 1}:`, exp.company, exp.position);
    });

    // Extract education
    const educationKeywords = ['Bachelor', 'Master', 'PhD', 'B\.', 'M\.', 'BS', 'MS', 'MBA', 'BA', 'MA', 'Diploma', 'Associate'];
    const education = [];
    let inEducationSection = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim().toLowerCase();

        if (line.includes('education') || line.includes('academic')) {
            inEducationSection = true;
            console.log('Found education section at line:', i);
            continue;
        }

        if (inEducationSection) {
            // Check if we've moved to next section
            if (line.includes('experience') || line.includes('skills') || line.includes('projects') ||
                line.includes('certifications') || line.includes('languages')) {
                inEducationSection = false;
                break;
            }

            const originalLine = lines[i].trim();
            for (const keyword of educationKeywords) {
                const regex = new RegExp(keyword, 'i');
                if (regex.test(originalLine)) {
                    const eduMatch = originalLine.match(/(\d{4})\s*[-–]\s*(\d{4})/);
                    const startYear = eduMatch ? parseInt(eduMatch[1]) : null;
                    const endYear = eduMatch ? parseInt(eduMatch[2]) : null;

                    education.push({
                        institution: originalLine.replace(/(\d{4})\s*[-–]\s*(\d{4})/, '').trim(),
                        degree: keyword,
                        fieldOfStudy: '',
                        startDate: startYear ? new Date(startYear, 0, 1) : null,
                        endDate: endYear ? new Date(endYear, 11, 31) : null,
                        isCurrent: false
                    });
                    break;
                }
            }
        }
    }

    parsedData.education = education;
    console.log('Found education entries:', education.length);

    // Extract skills (improved)
    const technicalSkills = [
        'javascript', 'python', 'java', 'react', 'node', 'sql', 'aws',
        'typescript', 'html', 'css', 'mongodb', 'docker', 'kubernetes',
        'php', 'c#', 'c++', 'ruby', 'go', 'swift', 'kotlin', 'angular',
        'vue', 'express', 'django', 'flask', 'spring', 'laravel',
        'mysql', 'postgresql', 'redis', 'elasticsearch', 'graphql',
        'jenkins', 'git', 'github', 'gitlab', 'bitbucket',
        'redux', 'next.js', 'nestjs', 'fastapi', 'rails',
        'rest api', 'api', 'microservices', 'ci/cd', 'devops'
    ];

    const softSkills = [
        'communication', 'leadership', 'teamwork', 'problem-solving',
        'time management', 'adaptability', 'creativity', 'critical thinking',
        'collaboration', 'organization', 'analytical', 'interpersonal',
        'presentation', 'negotiation', 'decision making', 'project management',
        'agile', 'scrum', 'kanban', 'mentoring', 'training'
    ];

    const textLower = text.toLowerCase();

    // Extract technical skills
    for (const skill of technicalSkills) {
        if (textLower.includes(skill.toLowerCase()) && !parsedData.skills.technical.includes(skill)) {
            parsedData.skills.technical.push(skill);
        }
    }

    // Extract soft skills
    for (const skill of softSkills) {
        if (textLower.includes(skill.toLowerCase()) && !parsedData.skills.soft.includes(skill)) {
            parsedData.skills.soft.push(skill);
        }
    }

    // Also look for skills section
    let inSkillsSection = false;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim().toLowerCase();

        if (line.includes('skills') || line.includes('technologies') || line.includes('tools')) {
            inSkillsSection = true;
            continue;
        }

        if (inSkillsSection) {
            if (line.includes('experience') || line.includes('education') ||
                line.includes('projects') || line.includes('certifications')) {
                inSkillsSection = false;
                break;
            }

            // Parse comma/pipe separated skills in skills section
            const skillsLine = lines[i].trim();
            const skillItems = skillsLine.split(/[,|•\-·]/).map(s => s.trim()).filter(s => s.length > 0);

            for (const item of skillItems) {
                const itemLower = item.toLowerCase();
                for (const skill of technicalSkills) {
                    if (itemLower.includes(skill.toLowerCase()) && !parsedData.skills.technical.includes(skill)) {
                        parsedData.skills.technical.push(skill);
                    }
                }
            }
        }
    }

    console.log('Found technical skills:', parsedData.skills.technical.length);
    console.log('Found soft skills:', parsedData.skills.soft.length);

    // Calculate years of experience
    if (parsedData.workExperience.length > 0) {
        let totalYears = 0;
        for (const exp of parsedData.workExperience) {
            if (exp.startDate) {
                const endDate = exp.isCurrent ? new Date() : exp.endDate;
                if (endDate) {
                    const years = (endDate.getFullYear() - exp.startDate.getFullYear()) +
                        (endDate.getMonth() - exp.startDate.getMonth()) / 12;
                    totalYears += Math.max(0, years);
                }
            }
        }
        parsedData.yearsOfExperience = Math.round(totalYears);
        console.log('Calculated years of experience:', parsedData.yearsOfExperience);
    }

    // Try to extract job title from first few lines or summary
    if (!parsedData.title) {
        const firstFewLines = lines.slice(0, 5).join(' ').toLowerCase();
        const titleKeywords = ['frontend', 'backend', 'fullstack', 'developer', 'engineer', 'architect',
            'manager', 'lead', 'senior', 'junior', 'mid-level'];

        for (const keyword of titleKeywords) {
            if (firstFewLines.includes(keyword)) {
                // Capitalize the first letter
                parsedData.title = keyword.charAt(0).toUpperCase() + keyword.slice(1) + ' Developer';
                break;
            }
        }
    }

    return parsedData;
};

// Simple text file reader for txt files
export const extractTextFromTxt = async (filePath) => {
    try {
        console.log('Reading TXT file from:', filePath);
        const text = await readFileAsync(filePath, 'utf-8');
        console.log('TXT file read, length:', text.length);
        return text;
    } catch (error) {
        console.error('TXT Read Error:', error);
        throw new Error(`TXT extraction failed: ${error.message}`);
    }
};

// Generic file text extractor
export const extractTextFromFile = async (filePath, fileType) => {
    try {
        if (fileType === 'application/pdf') {
            return await extractTextFromPDF(filePath);
        } else if (fileType.includes('msword') || fileType.includes('wordprocessingml')) {
            return await extractTextFromDoc(filePath);
        } else if (fileType.includes('text/plain') || filePath.endsWith('.txt')) {
            return await extractTextFromTxt(filePath);
        } else {
            console.log('Reading unknown file type as text:', filePath);
            return await readFileAsync(filePath, 'utf-8');
        }
    } catch (error) {
        console.error('File extraction error:', error);
        throw new Error(`Failed to extract text from file: ${error.message}`);
    }
};

export default {
    extractTextFromPDF,
    extractTextFromDoc,
    extractTextFromTxt,
    extractTextFromFile,
    parseResumeText
};