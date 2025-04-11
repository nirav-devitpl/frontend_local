import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getToken() {
  return localStorage.getItem('token');
}

export function setToken(token: string) {
  localStorage.setItem('token', token);
}

export function removeToken() {
  localStorage.removeItem('token');
}


/**
   * Formats the options for the dropdown
   * @param data The data to format
   * @param valueFrom The name of the field to format
   * @param labelFrom The name of the field to format
   * @returns The formatted options
   */
export function formattedOptions(data: any, valueFrom: string, labelFrom: string) {
  let formattedOptions = [];
  formattedOptions = data?.map((item: any) => ({
    value: item[valueFrom] ?? '',
    label: item[labelFrom] ?? ''
  }));
  return formattedOptions;
}


