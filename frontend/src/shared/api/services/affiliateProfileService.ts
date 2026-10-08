import { apiClient } from "@/shared/api/apiClient";
import { authStorage } from "@/shared/utils/authStorage";

const PROFILE_ENDPOINT = "/affiliate/profile";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export type ProfileLinkField =
  | "website_url"
  | "linkedin"
  | "youtube"
  | "instagram"
  | "facebook"
  | "tiktok";

export interface AffiliateProfile {
  id: number;
  user_id: number;
  status: string;
  commission_percentage: string | number;
  badge_tier: string;
  website_url?: string | null;
  linkedin?: string | null;
  youtube?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  tiktok?: string | null;
  order_amount?: number | string | null;
  notes?: string | null;
}

/** Body of POST /affiliate/profile (matches the Laravel validation rules). */
export interface SaveProfilePayload {
  user_id: number;
  website_url?: string | null;
  linkedin?: string | null;
  youtube?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  tiktok?: string | null;
  order_amount?: number | null;
  notes?: string | null;
  status?: string;
  commission_percentage?: number;
  badge_tier?: string;
}

/** Values the user can edit in the dashboard form. */
export interface ProfileEditableValues
  extends Partial<Record<ProfileLinkField, string>> {
  order_amount?: number | null;
  notes?: string | null;
}

/* -------------------------------------------------------------------------- */
/*  Static defaults (can differ per user type)                                */
/* -------------------------------------------------------------------------- */

interface ProfileDefaults {
  status: string;
  commission_percentage: number;
  badge_tier: string;
}

export const PROFILE_DEFAULTS: ProfileDefaults = {
  status: "Pending",
  commission_percentage: 10,
  badge_tier: "Starter",
};

/**
 * Overrides per user type / role. Keys are lower-case role names.
 * Example: ambassador: { commission_percentage: 15, badge_tier: "Pro" }
 */
const PROFILE_DEFAULTS_BY_ROLE: Record<string, Partial<ProfileDefaults>> = {};

export function getProfileDefaults(role?: string): ProfileDefaults {
  const overrides = role ? PROFILE_DEFAULTS_BY_ROLE[role.toLowerCase()] : undefined;
  return { ...PROFILE_DEFAULTS, ...overrides };
}

const LINK_FIELDS: ProfileLinkField[] = [
  "website_url",
  "linkedin",
  "youtube",
  "instagram",
  "facebook",
  "tiktok",
];

/**
 * Builds the POST body. A field present in `values` (even empty) overrides the
 * existing value, so users can clear it; empty values are sent as null.
 * Fields not in `values` keep their existing value.
 */
export function buildProfilePayload(
  userId: number,
  role: string | undefined,
  existing: Partial<AffiliateProfile> | null | undefined,
  values: ProfileEditableValues
): SaveProfilePayload {
  const defaults = getProfileDefaults(role);

  const payload: SaveProfilePayload = {
    user_id: userId,
    status: existing?.status ?? defaults.status,
    commission_percentage:
      existing?.commission_percentage != null
        ? Number(existing.commission_percentage)
        : defaults.commission_percentage,
    badge_tier: existing?.badge_tier ?? defaults.badge_tier,
  };

  for (const key of LINK_FIELDS) {
    if (key in values) payload[key] = values[key]?.trim() || null;
    else if (existing?.[key]) payload[key] = existing[key];
  }

  payload.order_amount =
    "order_amount" in values
      ? values.order_amount ?? null
      : existing?.order_amount != null
      ? Number(existing.order_amount)
      : null;

  payload.notes =
    "notes" in values ? values.notes?.trim() || null : existing?.notes ?? null;

  return payload;
}

/* -------------------------------------------------------------------------- */
/*  API                                                                       */
/* -------------------------------------------------------------------------- */

const authHeaders = (): HeadersInit => {
  const token = authStorage.getSession();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// apiClient already unwraps `{ data: ... }`; also tolerate `{ profile: ... }`.
function unwrapProfile(raw: unknown): AffiliateProfile {
  const value = raw as { profile?: AffiliateProfile } | AffiliateProfile;
  return ((value as { profile?: AffiliateProfile })?.profile ?? value) as AffiliateProfile;
}

// Guards against responses like { message: "saved" } being treated as a profile.
function looksLikeProfile(value: unknown): value is AffiliateProfile {
  return (
    typeof value === "object" &&
    value !== null &&
    ("user_id" in value || "badge_tier" in value || "commission_percentage" in value)
  );
}

export const affiliateProfileService = {
  /**
   * GET /affiliate/profile/{userId}: fetches the profile for a specific user.
   * Cached in apiClient's in-memory cache (5 min TTL).
   * Pass forceRefresh to bypass and repopulate the cache.
   */
  async getProfile(userId: number, forceRefresh = false): Promise<AffiliateProfile> {
    const raw = await apiClient.get<unknown>(`${PROFILE_ENDPOINT}/${userId}`, {
      headers: authHeaders(),
      forceRefresh,
    });
    return unwrapProfile(raw);
  },

  /**
   * POST /affiliate/profile. apiClient.post() clears the whole cache on success.
   * Returns the freshest valid profile the server gives us (GET first, then the
   * POST response), or null if neither looks like a profile. The caller should
   * fall back to the payload it submitted in that case.
   */
  async saveProfile(payload: SaveProfilePayload): Promise<AffiliateProfile | null> {
    const raw = await apiClient.post<unknown, SaveProfilePayload>(
      PROFILE_ENDPOINT,
      payload,
      authHeaders()
    );

    try {
      const fresh = await affiliateProfileService.getProfile(payload.user_id, true);
      if (looksLikeProfile(fresh)) return fresh;
    } catch {
      // fall through to the POST response
    }

    const fromPost = unwrapProfile(raw);
    return looksLikeProfile(fromPost) ? fromPost : null;
  },
};