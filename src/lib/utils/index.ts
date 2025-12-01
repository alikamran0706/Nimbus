import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const createFormData = (data: any, formData = new FormData(), parentKey?: string) => {
  // skip ID from being appended
  if (parentKey === "_id" || parentKey === "id") return formData;

  // Array handling
  if (Array.isArray(data)) {
    if (data.length === 0) {
      formData.append(`${parentKey}[]`, ""); // send empty array
    } else {
      data.forEach((value, index) => {
        const key = `${parentKey}[${index}]`;
        createFormData(value, formData, key);
      });
    }
    return formData;
  }

  // Object (including nested)
  if (data && typeof data === "object" && !(data instanceof File)) {
    Object.keys(data).forEach(key => {
      createFormData(data[key], formData, parentKey ? `${parentKey}.${key}` : key);
    });
    return formData;
  }

  // primitive values / empty string
  if (data !== undefined && data !== null) {
    formData.append(parentKey!, data);
  }

  return formData;
};


export const formatJobType = (jobType: string) => {
  if (!jobType) return '';
  
  const formatted = jobType
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
    
  return formatted;
};
