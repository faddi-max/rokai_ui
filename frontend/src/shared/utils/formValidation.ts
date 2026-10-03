import { isValidEmail } from "@/shared/utils/emailValidation";

export const LIMITS = {
  nameMin: 2,
  nameMax: 80,
  emailMax: 254,
  passwordMin: 8,
  passwordMax: 128,
  otpLength: 6,
} as const;

// Letters (any language), marks, spaces, apostrophes, hyphens, periods
const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M}\s.'’-]*$/u;

export const normalizeName = (value: string) => value.trim().replace(/\s+/g, " ");

export function validateFullName(value: string): string {
  const name = normalizeName(value);
  if (!name) return "Enter your full name.";
  if (name.length < LIMITS.nameMin) return `Name must be at least ${LIMITS.nameMin} characters.`;
  if (name.length > LIMITS.nameMax) return `Name must be ${LIMITS.nameMax} characters or fewer.`;
  if (!NAME_PATTERN.test(name))
    return "Name can only contain letters, spaces, apostrophes, hyphens and periods.";
  return "";
}

export function validateEmail(value: string): string {
  const email = value.trim();
  if (!email) return "Enter your email address.";
  if (!isValidEmail(email)) return "Enter a valid email address, for example name@example.com.";
  return "";
}

/** For signup: enforces the rules. */
export function validateNewPassword(value: string): string {
  if (!value) return "Enter a password.";
  if (value.length < LIMITS.passwordMin)
    return `Password must be at least ${LIMITS.passwordMin} characters.`;
  if (value.length > LIMITS.passwordMax)
    return `Password must be ${LIMITS.passwordMax} characters or fewer.`;
  if (!/[A-Za-z]/.test(value) || !/\d/.test(value))
    return "Use at least one letter and one number.";
  return "";
}

/** For login: only checks presence/length, never rejects an existing password on strength. */
export function validateLoginPassword(value: string): string {
  if (!value) return "Enter your password.";
  if (value.length > LIMITS.passwordMax)
    return `Password must be ${LIMITS.passwordMax} characters or fewer.`;
  return "";
}

export function validateConfirmPassword(password: string, confirm: string): string {
  if (!confirm) return "Confirm your password.";
  if (confirm !== password) return "Passwords do not match.";
  return "";
}

export function validateOtp(value: string): string {
  const code = value.trim();
  if (!code) return "Enter the verification code.";
  if (!new RegExp(`^\\d{${LIMITS.otpLength}}$`).test(code))
    return `Enter the ${LIMITS.otpLength}-digit verification code.`;
  return "";
}