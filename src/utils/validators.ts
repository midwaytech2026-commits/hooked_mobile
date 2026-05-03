import { REGEX } from './constants';

export const isValidEmail = (email: string): boolean =>
  REGEX.EMAIL.test(email.trim());

export const isValidPassword = (password: string): boolean =>
  REGEX.PASSWORD.test(password);

export const isRequired = (value: string): boolean =>
  value.trim().length > 0;

export const minLength = (value: string, min: number): boolean =>
  value.trim().length >= min;

export const maxLength = (value: string, max: number): boolean =>
  value.trim().length <= max;

export const isValidPhone = (phone: string): boolean =>
  REGEX.PHONE.test(phone.trim());

export const getEmailError = (email: string): string | undefined => {
  if (!isRequired(email)) return 'Email is required';
  if (!isValidEmail(email)) return 'Enter a valid email address';
  return undefined;
};

export const getPasswordError = (password: string): string | undefined => {
  if (!isRequired(password)) return 'Password is required';
  if (!minLength(password, 8)) return 'Password must be at least 8 characters';
  if (!isValidPassword(password))
    return 'Must include uppercase, lowercase, and a number';
  return undefined;
};
