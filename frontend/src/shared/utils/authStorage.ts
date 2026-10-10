const SIGNUP_TOKEN_KEY = "rokai_affiliate_signup_token";
const SIGNUP_EMAIL_KEY = "rokai_affiliate_signup_email";
const RESET_EMAIL_KEY = "rokai_affiliate_reset_email";
const SESSION_TOKEN_KEY = "rokai_affiliate_session";
const USER_KEY = "rokai_affiliate_user";
const PROFILE_KEY = "rokai_affiliate_profile";
const PROFILE_DONE_KEY = "rokai_affiliate_profile_done";


const safe = <T,>(fn: () => T, fallback: T): T => {
  try {
    return fn();
  } catch {
    return fallback;
  }
};

export const authStorage = {
  /* ---------------------------- Signup ---------------------------- */
  saveSignup(token: string, email: string) {
    safe(() => {
      localStorage.setItem(SIGNUP_TOKEN_KEY, token);
      localStorage.setItem(SIGNUP_EMAIL_KEY, email);
    }, undefined);
  },
  hasSignupToken: () =>
    safe(() => !!localStorage.getItem(SIGNUP_TOKEN_KEY), false),
  getSignupEmail: () =>
    safe(() => localStorage.getItem(SIGNUP_EMAIL_KEY) ?? "", ""),
  clearSignup() {
    safe(() => {
      localStorage.removeItem(SIGNUP_TOKEN_KEY);
      localStorage.removeItem(SIGNUP_EMAIL_KEY);
    }, undefined);
  },

markProfileCompleted(userId: number) {
  safe(() => localStorage.setItem(`${PROFILE_DONE_KEY}_${userId}`, "1"), undefined);
},
isProfileCompleted: (userId?: number) =>
  safe(
    () => (userId ? localStorage.getItem(`${PROFILE_DONE_KEY}_${userId}`) === "1" : false),
    false
  ),
clearProfileCompleted(userId?: number) {
  safe(() => {
    if (userId) localStorage.removeItem(`${PROFILE_DONE_KEY}_${userId}`);
  }, undefined);
},
  /* ------------------------ Password reset ------------------------ */
  saveResetEmail(email: string) {
    safe(() => localStorage.setItem(RESET_EMAIL_KEY, email), undefined);
  },
  getResetEmail: () =>
    safe(() => localStorage.getItem(RESET_EMAIL_KEY) ?? "", ""),
  clearResetEmail() {
    safe(() => localStorage.removeItem(RESET_EMAIL_KEY), undefined);
  },

  /* ------------------------------ User ----------------------------- */
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

  /* ---------------------------- Profile ---------------------------- */
  saveProfile(profile: any) {
    safe(() => {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    }, undefined);
  },
  getProfile: () =>
    safe(() => {
      const profile = localStorage.getItem(PROFILE_KEY);
      return profile ? JSON.parse(profile) : null;
    }, null),
  clearProfile() {
    safe(() => {
      localStorage.removeItem(PROFILE_KEY);
    }, undefined);
  },

  /* ---------------------------- Session ---------------------------- */
  saveSession(token: string) {
    safe(() => localStorage.setItem(SESSION_TOKEN_KEY, token), undefined);
  },
  getSession: () => safe(() => localStorage.getItem(SESSION_TOKEN_KEY), null),
  clearSession() {
    safe(() => localStorage.removeItem(SESSION_TOKEN_KEY), undefined);
  },

  /* ------------------------ Logout / reset all ---------------------- */
  clearAll() {
    safe(() => {
      localStorage.removeItem(SIGNUP_TOKEN_KEY);
      localStorage.removeItem(SIGNUP_EMAIL_KEY);
      localStorage.removeItem(RESET_EMAIL_KEY);
      localStorage.removeItem(SESSION_TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem(PROFILE_KEY);
    }, undefined);
  },
};
