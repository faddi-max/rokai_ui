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
  status?: string;
  commission_percentage?: number;
  badge_tier?: string;
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
 * Builds the POST body. Existing server values (status, commission, tier, links)
 * are kept so a re-save never resets e.g. "Approved" back to "Pending";
 * the static defaults are only used when the profile has no value yet.
 */
export function buildProfilePayload(
  userId: number,
  role: string | undefined,
  existing: Partial<AffiliateProfile> | null | undefined,
  newLinks: Partial<Record<ProfileLinkField, string>>
): SaveProfilePayload {
  const defaults = getProfileDefaults(role);

  const links: Partial<Record<ProfileLinkField, string>> = {};
  for (const key of LINK_FIELDS) {
    const value = newLinks[key] ?? existing?.[key];
    if (value) links[key] = value;
  }

  return {
    user_id: userId,
    ...links,
    status: existing?.status ?? defaults.status,
    commission_percentage:
      existing?.commission_percentage != null
        ? Number(existing.commission_percentage)
        : defaults.commission_percentage,
    badge_tier: existing?.badge_tier ?? defaults.badge_tier,
  };
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

export const affiliateProfileService = {
  /**
   * GET /affiliate/profile/{userId} — fetches the profile for a specific user.
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
   * POST /affiliate/profile. apiClient.post() clears the whole cache on success,
   * then re-fetches GET /affiliate/profile/{userId} to repopulate it.
   */
  async saveProfile(payload: SaveProfilePayload): Promise<AffiliateProfile> {
    const raw = await apiClient.post<unknown, SaveProfilePayload>(
      PROFILE_ENDPOINT,
      payload,
      authHeaders()
    );

    try {
      return await affiliateProfileService.getProfile(payload.user_id, true);
    } catch {
      return unwrapProfile(raw);
    }
  },
};
