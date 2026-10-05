

export const PROFILE_KEYS = [
  "academyName",
  "ownerName",
  "email",
  "website",
  "instagram",
  "studentCount",
  "academyAge",
] as const;

/** Score labels were inferred from a low-res screenshot — verify against Figma. */
export const SCORE_META = [
  { key: "brandIdentity", label: "Brand Identity", hint: "Logo, colors and visual consistency" },
  { key: "teamIdentity", label: "Team Identity", hint: "Uniform and team pride" },
  { key: "communityStrength", label: "Community Strength", hint: "Member loyalty and retention" },
  { key: "contentMarketing", label: "Content Marketing", hint: "Posts, videos and reach" },
  { key: "socialPresence", label: "Social Media Presence", hint: "Following and engagement" },
  { key: "memberExperience", label: "Member Experience", hint: "Onboarding and day-to-day service" },
  { key: "merchSystem", label: "Merchandise System", hint: "Apparel ordering and sales" },
  { key: "leadershipCulture", label: "Leadership Culture", hint: "Coaching and values" },
] as const;

export type ProfileKey = (typeof PROFILE_KEYS)[number];
export type ScoreKey = (typeof SCORE_META)[number]["key"];
export type FieldName = ProfileKey | ScoreKey;

export const FIELD_ORDER: FieldName[] = [...PROFILE_KEYS, ...SCORE_META.map((s) => s.key)];

export type AcademyFormValues = Record<FieldName, string>;
export type FieldErrors = Partial<Record<FieldName, string>>;

/** Clean, typed shape to send to the API. */
export interface AcademyAssessmentPayload {
  academyName: string;
  ownerName: string;
  email: string;
  website: string | null;
  instagram: string | null;
  studentCount: number | null;
  academyAge: number | null;
  scores: Record<ScoreKey, number>;
}

/** Throw this from `onGenerate` to surface server-side field errors on the form. */
export class FormSubmitError extends Error {
  fieldErrors?: FieldErrors;
  constructor(message: string, fieldErrors?: FieldErrors) {
    super(message);
    this.name = "FormSubmitError";
    this.fieldErrors = fieldErrors;
  }
}

export const DEFAULT_SCORE = "50";

export const buildInitialValues = (): AcademyFormValues =>
  Object.fromEntries(
    FIELD_ORDER.map((k) => [k, (SCORE_META as readonly { key: string }[]).some((s) => s.key === k) ? DEFAULT_SCORE : ""])
  ) as AcademyFormValues;

/* -------------------------------------------------------------------------- */
/*  Validation                                                                */
/* -------------------------------------------------------------------------- */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const NAME_RE = /^[\p{L}][\p{L}\p{M}\s.'’-]*$/u;
const INSTAGRAM_RE = /^@?[A-Za-z0-9._]{1,30}$/;
const DIGITS_RE = /^\d+$/;

export const NUMERIC_FIELDS: FieldName[] = ["studentCount", "academyAge", ...SCORE_META.map((s) => s.key)];

export const FIELD_MAX_LENGTH: Partial<Record<FieldName, number>> = {
  academyName: 80,
  ownerName: 60,
  email: 254,
  website: 200,
  instagram: 31,
  studentCount: 6,
  academyAge: 3,
  ...Object.fromEntries(SCORE_META.map((s) => [s.key, 3])),
};

export function normalizeWebsite(raw: string): string {
  const v = raw.trim();
  return /^https?:\/\//i.test(v) ? v : `https://${v}`;
}

export function validateField(name: FieldName, raw: string): string | undefined {
  const v = raw.trim();

  switch (name) {
    case "academyName":
      if (!v) return "Academy name is required.";
      if (v.length < 2) return "Academy name must be at least 2 characters.";
      if (v.length > 80) return "Academy name must be 80 characters or fewer.";
      return;

    case "ownerName":
      if (!v) return "Owner name is required.";
      if (v.length < 2) return "Owner name must be at least 2 characters.";
      if (v.length > 60) return "Owner name must be 60 characters or fewer.";
      if (!NAME_RE.test(v)) return "Use letters only (spaces, . ' - allowed).";
      return;

    case "email":
      if (!v) return "Email address is required.";
      if (v.length > 254 || !EMAIL_RE.test(v)) return "Enter a valid email address.";
      return;

    case "website": {
      if (!v) return;
      try {
        const url = new URL(normalizeWebsite(v));
        const ok = /^https?:$/.test(url.protocol) && url.hostname.includes(".") && !/\s/.test(v);
        return ok ? undefined : "Enter a valid website URL.";
      } catch {
        return "Enter a valid website URL.";
      }
    }

    case "instagram":
      if (!v) return;
      return INSTAGRAM_RE.test(v)
        ? undefined
        : "Use letters, numbers, dots or underscores (max 30 characters).";

    case "studentCount":
      if (!v) return;
      if (!DIGITS_RE.test(v)) return "Enter whole numbers only.";
      if (Number(v) < 1 || Number(v) > 100000) return "Enter a number between 1 and 100,000.";
      return;

    case "academyAge":
      if (!v) return;
      if (!DIGITS_RE.test(v)) return "Enter whole years only.";
      if (Number(v) > 150) return "Enter a number between 0 and 150.";
      return;

    default: // score fields
      if (!v) return "Enter a score from 0 to 100.";
      if (!DIGITS_RE.test(v)) return "Enter whole numbers only.";
      if (Number(v) > 100) return "Score cannot be higher than 100.";
      return;
  }
}

export function validateAll(values: AcademyFormValues): FieldErrors {
  const errors: FieldErrors = {};
  for (const name of FIELD_ORDER) {
    const message = validateField(name, values[name]);
    if (message) errors[name] = message;
  }
  return errors;
}

export function toPayload(values: AcademyFormValues): AcademyAssessmentPayload {
  const t = (k: FieldName) => values[k].trim();
  const optional = (k: FieldName) => t(k) || null;
  const optionalNumber = (k: FieldName) => (t(k) ? Number(t(k)) : null);

  return {
    academyName: t("academyName"),
    ownerName: t("ownerName"),
    email: t("email").toLowerCase(),
    website: t("website") ? normalizeWebsite(t("website")) : null,
    instagram: optional("instagram") ? `@${t("instagram").replace(/^@/, "")}` : null,
    studentCount: optionalNumber("studentCount"),
    academyAge: optionalNumber("academyAge"),
    scores: Object.fromEntries(SCORE_META.map((s) => [s.key, Number(t(s.key))])) as Record<ScoreKey, number>,
  };
}

/* -------------------------------------------------------------------------- */
/*  Report                                                                    */
/*  Level / tier thresholds are PLACEHOLDERS — confirm with the content team. */
/* -------------------------------------------------------------------------- */

const LEVELS = [
  { min: 80, label: "Elite Academy" },
  { min: 60, label: "Established Academy" },
  { min: 40, label: "Growth Academy" },
  { min: 0, label: "Emerging Academy" },
];

const TIERS = [
  { min: 90, name: "Platinum" },
  { min: 80, name: "Gold" },
  { min: 60, name: "Silver" },
  { min: 0, name: "Bronze" },
];

export interface CategoryScore {
  key: ScoreKey;
  label: string;
  score: number;
}

export interface AcademyReport {
  generatedAt: string;
  academyName: string;
  overallScore: number;
  levelLabel: string;
  levelDescription: string;
  certification: { name: string; note: string };
  strongest: CategoryScore;
  weakest: CategoryScore;
  categories: CategoryScore[];
  actionPlan: { title: string; body: string };
}

export function buildReport(payload: AcademyAssessmentPayload): AcademyReport {
  const categories: CategoryScore[] = SCORE_META.map((s) => ({
    key: s.key,
    label: s.label,
    score: payload.scores[s.key],
  }));

  const total = categories.reduce((sum, c) => sum + c.score, 0);
  const overallScore = Math.round(total / categories.length);

  const strongest = categories.reduce((a, b) => (b.score > a.score ? b : a));
  const weakest = categories.reduce((a, b) => (b.score < a.score ? b : a));
  const balanced = strongest.score === weakest.score;

  const level = LEVELS.find((l) => overallScore >= l.min)!;
  const tier = TIERS.find((t) => overallScore >= t.min)!;
  const nextTier = [...TIERS].reverse().find((t) => t.min > overallScore);

  return {
    generatedAt: new Date().toISOString(),
    academyName: payload.academyName,
    overallScore,
    levelLabel: level.label,
    levelDescription: "The average of your eight category scores.",
    certification: {
      name: `${tier.name} Academy™`,
      note: nextTier
        ? `Reach ${nextTier.min}/100 overall to unlock ${nextTier.name}.`
        : "Top certification tier reached.",
    },
    strongest,
    weakest,
    categories,
    actionPlan: {
      title: "Your Academy Action Plan",
      body: balanced
        ? "Your scores are evenly balanced. Choose one category to lead with and focus the next 90 days on lifting it."
        : `Your foundation is ready. Your biggest immediate opportunity is ${weakest.label}. Focus the next 90 days on improving this area while maintaining your current strengths.`,
    },
  };
}
