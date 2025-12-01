import React, { useState, useEffect } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import { resumeService } from '@/services/resumeService';

interface ResumeFormData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: Date | null;
    nationality: string;
    linkedinUrl: string;
  };
  professionalSummary: {
    title: string;
    summary: string;
    yearsOfExperience: number;
    careerLevel: string;
    desiredJobTitle: string;
    preferredWorkType: string;
    immediateAvailability: boolean;
  };
  workExperience: Array<{
    company: string;
    position: string;
    startDate: Date | null;
    endDate: Date | null;
    isCurrent: boolean;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: Date | null;
    endDate: Date | null;
    isCurrent: boolean;
  }>;
  skills: {
    technical: string[];
    soft: string[];
  };
  certifications: Array<{
    name: string;
    issuer: string;
    issueDate: Date | null;
  }>;
  languages: Array<{
    language: string;
    proficiency: string;
  }>;
}

const countryOptions = [
  { value: 'US', label: 'United States' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'CA', label: 'Canada' },
  { value: 'AU', label: 'Australia' },
  { value: 'AE', label: 'United Arab Emirates' },
  { value: 'SA', label: 'Saudi Arabia' },
  { value: 'IN', label: 'India' },
];

const careerLevelOptions = [
  { value: 'entry', label: 'Entry Level' },
  { value: 'junior', label: 'Junior' },
  { value: 'mid', label: 'Mid Level' },
  { value: 'senior', label: 'Senior' },
  { value: 'lead', label: 'Lead' },
  { value: 'executive', label: 'Executive' },
];

const workTypeOptions = [
  { value: 'on-site', label: 'On-Site' },
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'flexible', label: 'Flexible' },
];

const proficiencyOptions = [
  { value: 'native', label: 'Native' },
  { value: 'fluent', label: 'Fluent' },
  { value: 'professional', label: 'Professional' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'basic', label: 'Basic' },
];

export default function ResumeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
  } = useForm<ResumeFormData>({
    defaultValues: {
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: null,
        nationality: '',
        linkedinUrl: '',
      },
      professionalSummary: {
        title: '',
        summary: '',
        yearsOfExperience: 0,
        careerLevel: 'mid',
        desiredJobTitle: '',
        preferredWorkType: 'hybrid',
        immediateAvailability: false,
      },
      workExperience: [],
      education: [],
      skills: {
        technical: [],
        soft: [],
      },
      certifications: [],
      languages: []
    }
  });
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('')

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience
  } = useFieldArray({
    control,
    name: "workExperience"
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation
  } = useFieldArray({
    control,
    name: "education"
  });

  const {
    fields: languageFields,
    append: appendLanguage,
    remove: removeLanguage
  } = useFieldArray({
    control,
    name: "languages"
  });

  // Load existing resume data
  useEffect(() => {
    if (id) {
      const loadResume = async () => {
        try {
          setLoading(true);
          const response = await resumeService.getById(id);
          if (response.data) {
            reset(response.data);
          }
        } catch (error) {
          console.error('Failed to load resume:', error);
        } finally {
          setLoading(false);
        }
      };
      loadResume();
    }
  }, [id, reset]);

  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setError('');
    setProgress(0);

    try {
      // Simulate progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      // Upload and parse resume
      const formData = new FormData();
      formData.append('resume', file);

      const response = await resumeService.parseResume(formData);

      clearInterval(interval);
      setProgress(100);

      if (response.success) {
        console.log('Parsed data:', response.data);
        // Use the parsed data to populate your form
        // response.data contains the parsed resume information
      }

      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 500);

    } catch (err: any) {
      setError(err?.message || 'Failed to upload resume');
      setLoading(false);
      setProgress(0);
    }
  };

  const onSubmit = async (data: ResumeFormData) => {
    try {
      setLoading(true);

      if (id) {
        await resumeService.put(data, id);
      } else {
        await resumeService.post(data);
      }

      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to save resume:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Professional Resume Builder</h1>
              <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">
                Build a comprehensive resume that highlights your skills and experience
              </p>
            </div>
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 w-full sm:w-auto"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:space-y-8">
              {/* File Upload Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center">
                  <div className="flex flex-col items-center">
                    <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1 sm:mb-2">Upload Resume</h3>
                    <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
                      Upload your existing resume to auto-fill information
                    </p>
                    <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700">
                      <input
                        type="file"
                        className="sr-only"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                      />
                      Choose File
                    </label>
                    {loading && (
                      <div>
                        <div>Uploading... {progress}%</div>
                        <progress value={progress} max="100" />
                      </div>
                    )}
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <p className="mt-2 text-xs text-gray-500">Supports PDF, DOC, DOCX (Max 5MB)</p>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
                  <span className="bg-primary-100 text-primary-800 rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center mr-2 sm:mr-3 text-sm">
                    1
                  </span>
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">First Name *</label>
                    <input
                      {...register("personalInfo.firstName", { required: "First name is required" })}
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="John"
                    />
                    {errors.personalInfo?.firstName && (
                      <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.personalInfo.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Last Name *</label>
                    <input
                      {...register("personalInfo.lastName", { required: "Last name is required" })}
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Email *</label>
                    <input
                      type="email"
                      {...register("personalInfo.email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      {...register("personalInfo.phone", { required: "Phone number is required" })}
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Nationality</label>
                    <Controller
                      name="personalInfo.nationality"
                      control={control}
                      render={({ field }) => (
                        <Select
                          options={countryOptions}
                          value={countryOptions.find(opt => opt.value === field.value)}
                          onChange={(option) => field.onChange(option?.value)}
                          className="react-select-container"
                          classNamePrefix="react-select"
                          placeholder="Select country"
                        />
                      )}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">LinkedIn Profile</label>
                    <input
                      type="url"
                      {...register("personalInfo.linkedinUrl")}
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Summary */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
                  <span className="bg-primary-100 text-primary-800 rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center mr-2 sm:mr-3 text-sm">
                    2
                  </span>
                  Professional Summary
                </h2>
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Professional Title</label>
                    <input
                      {...register("professionalSummary.title")}
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Senior Software Engineer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Summary</label>
                    <textarea
                      {...register("professionalSummary.summary")}
                      rows={3}
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Briefly describe your professional background, key skills, and career objectives..."
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Years of Experience</label>
                      <input
                        type="number"
                        {...register("professionalSummary.yearsOfExperience")}
                        className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Career Level</label>
                      <Controller
                        name="professionalSummary.careerLevel"
                        control={control}
                        render={({ field }) => (
                          <Select
                            options={careerLevelOptions}
                            value={careerLevelOptions.find(opt => opt.value === field.value)}
                            onChange={(option) => field.onChange(option?.value)}
                            className="react-select-container"
                            classNamePrefix="react-select"
                          />
                        )}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Preferred Work Type</label>
                      <Controller
                        name="professionalSummary.preferredWorkType"
                        control={control}
                        render={({ field }) => (
                          <Select
                            options={workTypeOptions}
                            value={workTypeOptions.find(opt => opt.value === field.value)}
                            onChange={(option) => field.onChange(option?.value)}
                            className="react-select-container"
                            classNamePrefix="react-select"
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      {...register("professionalSummary.immediateAvailability")}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-700">Immediately available for work</label>
                  </div>
                </div>
              </div>

              {/* Work Experience */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center">
                    <span className="bg-primary-100 text-primary-800 rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center mr-2 sm:mr-3 text-sm">
                      3
                    </span>
                    Work Experience
                  </h2>
                  <button
                    type="button"
                    onClick={() => appendExperience({
                      company: '',
                      position: '',
                      startDate: null,
                      endDate: null,
                      isCurrent: false,
                      description: '',
                    })}
                    className="inline-flex items-center justify-center px-3 sm:px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 w-full sm:w-auto"
                  >
                    + Add Experience
                  </button>
                </div>

                {experienceFields.map((field, index) => (
                  <div key={field.id} className="mb-4 sm:mb-6 p-4 sm:p-6 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4 gap-2 sm:gap-0">
                      <h3 className="text-base sm:text-lg font-medium text-gray-900">Experience {index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removeExperience(index)}
                        className="text-red-600 hover:text-red-800 text-sm sm:text-base"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Company *</label>
                        <input
                          {...register(`workExperience.${index}.company`, { required: true })}
                          className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Google"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Position *</label>
                        <input
                          {...register(`workExperience.${index}.position`, { required: true })}
                          className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Senior Software Engineer"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Start Date</label>
                        <Controller
                          name={`workExperience.${index}.startDate`}
                          control={control}
                          render={({ field }) => (
                            <DatePicker
                              selected={field.value}
                              onChange={field.onChange}
                              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                              placeholderText="MM/YYYY"
                              dateFormat="MM/yyyy"
                              showMonthYearPicker
                            />
                          )}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">End Date</label>
                        <Controller
                          name={`workExperience.${index}.endDate`}
                          control={control}
                          render={({ field }) => (
                            <DatePicker
                              selected={field.value}
                              onChange={field.onChange}
                              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                              placeholderText="MM/YYYY"
                              dateFormat="MM/yyyy"
                              showMonthYearPicker
                              disabled={watch(`workExperience.${index}.isCurrent`)}
                            />
                          )}
                        />
                        <div className="mt-2 flex items-center">
                          <input
                            type="checkbox"
                            {...register(`workExperience.${index}.isCurrent`)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <label className="ml-2 text-sm text-gray-700">I currently work here</label>
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Description</label>
                        <textarea
                          {...register(`workExperience.${index}.description`)}
                          rows={2}
                          className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Describe your responsibilities and achievements..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center">
                    <span className="bg-primary-100 text-primary-800 rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center mr-2 sm:mr-3 text-sm">
                      4
                    </span>
                    Education
                  </h2>
                  <button
                    type="button"
                    onClick={() => appendEducation({
                      institution: '',
                      degree: '',
                      fieldOfStudy: '',
                      startDate: null,
                      endDate: null,
                      isCurrent: false,
                    })}
                    className="inline-flex items-center justify-center px-3 sm:px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 w-full sm:w-auto"
                  >
                    + Add Education
                  </button>
                </div>

                {educationFields.map((field, index) => (
                  <div key={field.id} className="mb-4 sm:mb-6 p-4 sm:p-6 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4 gap-2 sm:gap-0">
                      <h3 className="text-base sm:text-lg font-medium text-gray-900">Education {index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removeEducation(index)}
                        className="text-red-600 hover:text-red-800 text-sm sm:text-base"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Institution *</label>
                        <input
                          {...register(`education.${index}.institution`, { required: true })}
                          className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="University Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Degree *</label>
                        <input
                          {...register(`education.${index}.degree`, { required: true })}
                          className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Bachelor of Science"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Field of Study</label>
                        <input
                          {...register(`education.${index}.fieldOfStudy`)}
                          className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="Computer Science"
                        />
                      </div>
                      <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Start Date</label>
                          <Controller
                            name={`education.${index}.startDate`}
                            control={control}
                            render={({ field }) => (
                              <DatePicker
                                selected={field.value}
                                onChange={field.onChange}
                                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                placeholderText="MM/YYYY"
                                dateFormat="MM/yyyy"
                                showMonthYearPicker
                              />
                            )}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">End Date</label>
                          <Controller
                            name={`education.${index}.endDate`}
                            control={control}
                            render={({ field }) => (
                              <DatePicker
                                selected={field.value}
                                onChange={field.onChange}
                                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                placeholderText="MM/YYYY"
                                dateFormat="MM/yyyy"
                                showMonthYearPicker
                                disabled={watch(`education.${index}.isCurrent`)}
                              />
                            )}
                          />
                          <div className="mt-2 flex items-center">
                            <input
                              type="checkbox"
                              {...register(`education.${index}.isCurrent`)}
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            />
                            <label className="ml-2 text-sm text-gray-700">Currently enrolled</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center">
                  <span className="bg-primary-100 text-primary-800 rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center mr-2 sm:mr-3 text-sm">
                    5
                  </span>
                  Skills
                </h2>

                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Technical Skills</label>
                    <textarea
                      {...register("skills.technical")}
                      rows={2}
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="JavaScript, React, Node.js, Python, AWS..."
                    />
                    <p className="mt-1 text-xs sm:text-sm text-gray-500">Separate skills with commas</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Soft Skills</label>
                    <textarea
                      {...register("skills.soft")}
                      rows={2}
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Communication, Leadership, Problem-solving, Teamwork..."
                    />
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center">
                    <span className="bg-primary-100 text-primary-800 rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center mr-2 sm:mr-3 text-sm">
                      6
                    </span>
                    Languages
                  </h2>
                  <button
                    type="button"
                    onClick={() => appendLanguage({
                      language: '',
                      proficiency: 'professional'
                    })}
                    className="inline-flex items-center justify-center px-3 sm:px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 w-full sm:w-auto"
                  >
                    + Add Language
                  </button>
                </div>

                {languageFields.map((field, index) => (
                  <div key={field.id} className="mb-4 sm:mb-6 p-4 sm:p-6 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4 gap-2 sm:gap-0">
                      <h3 className="text-base sm:text-lg font-medium text-gray-900">Language {index + 1}</h3>
                      <button
                        type="button"
                        onClick={() => removeLanguage(index)}
                        className="text-red-600 hover:text-red-800 text-sm sm:text-base"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Language *</label>
                        <input
                          {...register(`languages.${index}.language`, { required: true })}
                          className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          placeholder="English"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2">Proficiency Level</label>
                        <Controller
                          name={`languages.${index}.proficiency`}
                          control={control}
                          render={({ field }) => (
                            <Select
                              options={proficiencyOptions}
                              value={proficiencyOptions.find(opt => opt.value === field.value)}
                              onChange={(option) => field.onChange(option?.value)}
                              className="react-select-container"
                              classNamePrefix="react-select"
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Submit Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
                  <div className="text-center sm:text-left">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900">Save Your Resume</h3>
                    <p className="text-sm text-gray-600">Your resume will be stored securely and can be updated anytime</p>
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                    <button
                      type="button"
                      onClick={() => navigate('/dashboard')}
                      className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 sm:px-6 py-2 sm:py-3 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Saving...' : id ? 'Update Resume' : 'Save Resume'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Sidebar - Preview & Tips */}
          <div className="lg:col-span-1">
            <div className="space-y-4 sm:space-y-6">
              {/* Resume Preview */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Resume Preview</h3>
                <div className="aspect-[1/1.414] bg-gray-50 border border-gray-200 rounded-lg p-3 sm:p-6 overflow-hidden">
                  <div className="h-full overflow-auto">
                    <div className="text-center mb-4 sm:mb-6">
                      <h4 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                        {watch('personalInfo.firstName')} {watch('personalInfo.lastName')}
                      </h4>
                      <p className="text-gray-600 text-sm sm:text-base truncate">
                        {watch('professionalSummary.title')}
                      </p>
                    </div>
                    {watch('professionalSummary.summary') && (
                      <div className="mb-3 sm:mb-4">
                        <p className="text-xs sm:text-sm text-gray-700 line-clamp-3">
                          {watch('professionalSummary.summary')}
                        </p>
                      </div>
                    )}
                    {experienceFields.length > 0 && (
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Experience</h5>
                        {experienceFields.slice(0, 2).map((exp, index) => (
                          <div key={index} className="mb-2 sm:mb-3">
                            <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                              {watch(`workExperience.${index}.position`)}
                            </p>
                            <p className="text-xs text-gray-600 truncate">
                              {watch(`workExperience.${index}.company`)}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <button className="w-full mt-3 sm:mt-4 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Download PDF
                </button>
              </div>

              {/* Tips */}
              <div className="bg-primary-50 rounded-xl border border-primary-100 p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-primary-900 mb-3 sm:mb-4">💡 Tips for a Great Resume</h3>
                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2 text-xs">•</span>
                    <span className="text-xs sm:text-sm text-primary-800">Use action verbs to describe achievements</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2 text-xs">•</span>
                    <span className="text-xs sm:text-sm text-primary-800">Include quantifiable results (increased X by Y%)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2 text-xs">•</span>
                    <span className="text-xs sm:text-sm text-primary-800">Tailor your summary to target job positions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2 text-xs">•</span>
                    <span className="text-xs sm:text-sm text-primary-800">Keep it concise - 1-2 pages maximum</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2 text-xs">•</span>
                    <span className="text-xs sm:text-sm text-primary-800">Proofread carefully for spelling errors</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}