const SIGNUP_TOKEN_KEY = "rokai_affiliate_signup_token";
const SIGNUP_EMAIL_KEY = "rokai_affiliate_signup_email";
const RESET_EMAIL_KEY = "rokai_affiliate_reset_email";
const SESSION_TOKEN_KEY = "rokai_affiliate_session";
const USER_KEY = "rokai_affiliate_user";

const safe = <T,>(fn: () => T, fallback: T): T => {
  try {
    return fn();
  } catch {
    return fallback; 
  }
};

export const authStorage = {
  saveSignup(token: string, email: string) {
    safe(() => {
      localStorage.setItem(SIGNUP_TOKEN_KEY, token);
      localStorage.setItem(SIGNUP_EMAIL_KEY, email);
    }, undefined);
  },
  hasSignupToken: () => safe(() => !!localStorage.getItem(SIGNUP_TOKEN_KEY), false),
  getSignupEmail: () => safe(() => localStorage.getItem(SIGNUP_EMAIL_KEY) ?? "", ""),
  saveResetEmail(email: string) {
    safe(() => localStorage.setItem(RESET_EMAIL_KEY, email), undefined);
  },
  getResetEmail: () => safe(() => localStorage.getItem(RESET_EMAIL_KEY) ?? "", ""),
  clearResetEmail() {
    safe(() => localStorage.removeItem(RESET_EMAIL_KEY), undefined);
  },

  saveUser(user: any) {
  safe(() => {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }, undefined);
  },

  getUser: () =>
    safe(() => {
     const user = localStorage.getItem(USER_KEY);
      return user ? JSON.parse(user) : null;
  }, null),

  clearUser() {
    safe(() => {
      localStorage.removeItem(USER_KEY);
    }, undefined);
  },

  saveSession(token: string) {
    safe(() => localStorage.setItem(SESSION_TOKEN_KEY, token), undefined);
  },
  getSession: () => safe(() => localStorage.getItem(SESSION_TOKEN_KEY), null),
  clearAll() {
    // Remove all stored affiliate related data
    safe(() => {
      localStorage.removeItem(SIGNUP_TOKEN_KEY);
      localStorage.removeItem(SIGNUP_EMAIL_KEY);
      localStorage.removeItem(RESET_EMAIL_KEY);
      localStorage.removeItem(SESSION_TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }, undefined);
  },
};