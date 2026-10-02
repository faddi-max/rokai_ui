const SIGNUP_TOKEN_KEY = "rokai_affiliate_signup_token";
const SIGNUP_EMAIL_KEY = "rokai_affiliate_signup_email";
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
  clearSession() {
    safe(() => localStorage.removeItem(SESSION_TOKEN_KEY), undefined);
  },
};