

export type AcademyFormValues = Record<string, string>;
export type FieldErrors = Record<string, string>;

export interface ScoreMeta { name: string; label: string; hint: string }

export const SCORE_META: ScoreMeta[] = [
  { name: "brandIdentity", label: "Brand Identity", hint: "Logo, colors and visual consistency" },
  { name: "teamIdentity", label: "Team Identity", hint: "Uniform and team pride" },
  { name: "communityIdentity", label: "Community Identity", hint: "Member loyalty and retention" },
  { name: "contentIdentity", label: "Content Identity", hint: "Posts, videos and reach" },
  { name: "socialIdentity", label: "Social Identity", hint: "Following and engagement" },
  { name: "experienceIdentity", label: "Experience Identity", hint: "Onboarding and day-to-day service" },
  { name: "merchIdentity", label: "Merch Identity", hint: "Apparel ordering and sales" },
  { name: "leadershipIdentity", label: "Leadership Identity", hint: "Coaching and values" },
];

export const SCORE_NAMES = SCORE_META.map((s) => s.name);

export const FIELD_MAX_LENGTH: Record<string, number> = {
  academyName: 80, ownerName: 60, email: 120, website: 200, instagram: 31,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const URL_RE = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/\S*)?$/i;
const IG_RE = /^@?[a-z0-9._]{1,30}$/i;

export const validateField = (name: string, raw: string): string => {
  const v = (raw ?? "").trim();
  switch (name) {
    case "academyName":
      if (!v) return "Academy name is required.";
      if (v.length < 2) return "Academy name must be at least 2 characters.";
      if (v.length > FIELD_MAX_LENGTH.academyName) return `Max ${FIELD_MAX_LENGTH.academyName} characters.`;
      return "";
    case "ownerName":
      if (!v) return "Owner name is required.";
      if (v.length < 2) return "Owner name must be at least 2 characters.";
      if (!/^[\p{L}][\p{L}\s.'-]*$/u.test(v)) return "Use letters only.";
      return "";
    case "email":
      if (!v) return "Email address is required.";
      return EMAIL_RE.test(v) ? "" : "Enter a valid email address.";
    case "website":
      return !v || URL_RE.test(v) ? "" : "Enter a valid website URL.";
    case "instagram":
      return !v || IG_RE.test(v) ? "" : "Enter a valid Instagram handle.";
    case "studentCount":
      if (!v) return "";
      return /^\d+$/.test(v) && +v <= 100000 ? "" : "Enter a whole number (0 – 100000).";
    case "academyAge":
      if (!v) return "";
      return /^\d+$/.test(v) && +v <= 100 ? "" : "Enter a whole number of years (0 – 100).";
    default:
      if (SCORE_NAMES.includes(name)) {
        if (v === "") return "Enter a score.";
        const n = Number(v);
        return Number.isInteger(n) && n >= 0 && n <= 100 ? "" : "Score must be between 0 and 100.";
      }
      return "";
  }
};

export const FIELD_ORDER = [
  "academyName", "ownerName", "email", "website", "instagram", "studentCount", "academyAge", ...SCORE_NAMES,
];

export const validateAll = (values: AcademyFormValues): FieldErrors => {
  const errors: FieldErrors = {};
  FIELD_ORDER.forEach((n) => {
    const msg = validateField(n, values[n] ?? "");
    if (msg) errors[n] = msg;
  });
  return errors;
};

/** Thrown by `onGenerate` to surface server-side field errors. */
export class FormSubmitError extends Error {
  fieldErrors: FieldErrors;
  constructor(message: string, fieldErrors: FieldErrors = {}) {
    super(message);
    this.fieldErrors = fieldErrors;
  }
}

export interface AcademyPayload {
  academyName: string; ownerName: string; email: string; website?: string; instagram?: string;
  studentCount?: number; academyAge?: number; scores: Record<string, number>;
}

export const toPayload = (v: AcademyFormValues): AcademyPayload => ({
  academyName: v.academyName.trim(),
  ownerName: v.ownerName.trim(),
  email: v.email.trim().toLowerCase(),
  website: v.website?.trim() || undefined,
  instagram: v.instagram?.trim() ? `@${v.instagram.trim().replace(/^@/, "")}` : undefined,
  studentCount: v.studentCount?.trim() ? Number(v.studentCount) : undefined,
  academyAge: v.academyAge?.trim() ? Number(v.academyAge) : undefined,
  scores: Object.fromEntries(SCORE_NAMES.map((n) => [n, Number(v[n])])),
});

/* ------------------------------ Report ------------------------------------ */

export interface AcademyReport {
  academyName: string;
  overallScore: number;
  level: string;
  levelNote: string;
  tier: string;
  validity: string;
  visibilityScore: number;
  opportunityIndex: number;
  categories: { name: string; label: string; score: number }[];
  weakest: string;
  actionPlan: string;
}

const LEVELS = [
  { min: 80, label: "Elite Academy" },
  { min: 60, label: "Established Academy" },
  { min: 30, label: "Growth Academy" },
  { min: 0, label: "Emerging Academy" },
];
const TIERS = [
  { min: 90, label: "Platinum Academy" },
  { min: 75, label: "Gold Academy" },
  { min: 60, label: "Silver Academy" },
  { min: 40, label: "Bronze Academy" },
  { min: 0, label: "Starter Academy" },
];

export const buildReport = (p: AcademyPayload): AcademyReport => {
  const categories = SCORE_META.map((m) => ({ name: m.name, label: m.label, score: p.scores[m.name] }));
  const overall = Math.round(categories.reduce((a, c) => a + c.score, 0) / categories.length);
  const weakest = categories.reduce((a, c) => (c.score < a.score ? c : a), categories[0]);
  const pick = (list: { min: number; label: string }[]) => list.find((l) => overall >= l.min)!.label;
  const byName = (n: string) => p.scores[n];

  return {
    academyName: p.academyName,
    overallScore: overall,
    level: pick(LEVELS),
    levelNote: "Academy identity strength",
    tier: pick(TIERS),
    validity: "Valid for 12 Months",
    // Placeholder formulas — confirm with product/backend.
    visibilityScore: Math.round((byName("socialIdentity") + byName("contentIdentity") + byName("brandIdentity")) / 3),
    opportunityIndex: Math.round(100 - (weakest.score + overall) / 2) || 0,
    categories,
    weakest: weakest.label,
    actionPlan: `Your framework is ready. Your biggest immediate opportunity is ${weakest.label}. Focus your next 90 days on improving this area while maintaining consistency across your academy identity.`,
  };
};
