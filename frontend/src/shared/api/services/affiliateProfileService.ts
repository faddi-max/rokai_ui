import { apiClient } from "@/shared/api/apiClient";
import { authStorage } from "@/shared/utils/authStorage";

const PROFILE_ENDPOINT = "/affiliate/profile";
const UPDATE_PROFILE_ENDPOINT = "/affiliate/update";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
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

  created_at?: string;
  updated_at?: string;
}

/**
 * Payload used by the affiliate dashboard.
 *
 * `user_id`, `status`, `commission_percentage`, and `badge_tier`
 * are kept here for compatibility with the rest of the frontend,
 * but the PUT update endpoint does NOT send them to Laravel.
 */
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

export interface ProfileEditableValues
  extends Partial<Record<ProfileLinkField, string>> {
  order_amount?: number | null;
  notes?: string | null;
}

/* -------------------------------------------------------------------------- */
/* Defaults                                                                   */
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

const PROFILE_DEFAULTS_BY_ROLE: Record<
  string,
  Partial<ProfileDefaults>
> = {};

export function getProfileDefaults(
  role?: string
): ProfileDefaults {
  const overrides = role
    ? PROFILE_DEFAULTS_BY_ROLE[role.toLowerCase()]
    : undefined;

  return {
    ...PROFILE_DEFAULTS,
    ...overrides,
  };
}

const LINK_FIELDS: ProfileLinkField[] = [
  "website_url",
  "linkedin",
  "youtube",
  "instagram",
  "facebook",
  "tiktok",
];

/* -------------------------------------------------------------------------- */
/* Payload builder                                                            */
/* -------------------------------------------------------------------------- */

export function buildProfilePayload(
  userId: number,
  role: string | undefined,
  existing: Partial<AffiliateProfile> | null | undefined,
  values: ProfileEditableValues
): SaveProfilePayload {
  /*
   * Keep these values in the local payload because other frontend code may
   * use them when merging the saved account.
   *
   * IMPORTANT:
   * affiliateProfileService.updateProfile() strips all backend-controlled
   * fields before sending the actual PUT request.
   */
  const defaults = getProfileDefaults(role);

  const payload: SaveProfilePayload = {
    user_id: userId,

    status: existing?.status ?? defaults.status,

    commission_percentage:
      existing?.commission_percentage != null
        ? Number(existing.commission_percentage)
        : defaults.commission_percentage,

    badge_tier:
      existing?.badge_tier ?? defaults.badge_tier,
  };

  for (const key of LINK_FIELDS) {
    if (key in values) {
      // Empty string means the user intentionally cleared the field.
      payload[key] = values[key]?.trim() || null;
    } else if (existing?.[key] != null) {
      payload[key] = existing[key];
    }
  }

  payload.order_amount =
    "order_amount" in values
      ? values.order_amount ?? null
      : existing?.order_amount != null
        ? Number(existing.order_amount)
        : null;

  payload.notes =
    "notes" in values
      ? values.notes?.trim() || null
      : existing?.notes ?? null;

  return payload;
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const authHeaders = (): HeadersInit => {
  const token = authStorage.getSession();

  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
};

/**
 * apiClient already unwraps:
 *
 * {
 *   success: true,
 *   data: {...}
 * }
 *
 * so normally `raw` is already the AffiliateProfile.
 *
 * The extra handling keeps this service tolerant if a different apiClient
 * implementation returns the envelope.
 */
function unwrapProfile(raw: unknown): AffiliateProfile {
  if (
    raw &&
    typeof raw === "object" &&
    "data" in raw &&
    (raw as { data?: unknown }).data
  ) {
    return (raw as { data: AffiliateProfile }).data;
  }

  if (
    raw &&
    typeof raw === "object" &&
    "profile" in raw &&
    (raw as { profile?: unknown }).profile
  ) {
    return (raw as { profile: AffiliateProfile }).profile;
  }

  return raw as AffiliateProfile;
}

function looksLikeProfile(
  value: unknown
): value is AffiliateProfile {
  return (
    typeof value === "object" &&
    value !== null &&
    (
      "id" in value ||
      "user_id" in value ||
      "badge_tier" in value ||
      "commission_percentage" in value
    )
  );
}

/* -------------------------------------------------------------------------- */
/* API                                                                        */
/* -------------------------------------------------------------------------- */

export const affiliateProfileService = {
  /**
   * GET /affiliate/profile/{userId}
   *
   * Normal GETs use the apiClient cache.
   * forceRefresh=true bypasses the existing cache and then stores the
   * fresh result back into the GET cache.
   */
  async getProfile(
    userId: number,
    forceRefresh = false
  ): Promise<AffiliateProfile> {
    const raw = await apiClient.get<unknown>(
      `${PROFILE_ENDPOINT}/${userId}`,
      {
        headers: authHeaders(),
        forceRefresh,
      }
    );

    const profile = unwrapProfile(raw);

    if (!looksLikeProfile(profile)) {
      throw new Error(
        "Invalid affiliate profile returned by the server."
      );
    }

    return profile;
  },

  
  async updateProfile(
    userId: number,
    payload: SaveProfilePayload
  ): Promise<AffiliateProfile> {

    const updatePayload = {
      website_url: payload.website_url ?? null,
      linkedin: payload.linkedin ?? null,
      youtube: payload.youtube ?? null,
      instagram: payload.instagram ?? null,
      facebook: payload.facebook ?? null,
      tiktok: payload.tiktok ?? null,
      order_amount: payload.order_amount ?? null,
      notes: payload.notes ?? null,
    };

    const raw = await apiClient.put<
      unknown,
      typeof updatePayload
    >(
      `${UPDATE_PROFILE_ENDPOINT}/${userId}`,
      updatePayload,
      authHeaders()
    );

    console.log(raw)

   
    const updatedProfile = unwrapProfile(raw);

    if (!looksLikeProfile(updatedProfile)) {
      throw new Error(
        "Profile update succeeded, but the server returned an invalid profile."
      );
    }

    /*
     * apiClient.put() already clears the entire GET cache.
     *
     * Save the successful server response immediately so the UI/storage
     * has the latest data even if the refresh GET fails.
     */
    authStorage.saveProfile(updatedProfile);

    try {
      /*
       * Force a fresh GET.
       *
       * Because apiClient.get(..., { forceRefresh: true }) still writes
       * the result into its cache, this repopulates the cache with the
       * newest profile.
       */
      const freshProfile =
        await this.getProfile(userId, true);

      if (looksLikeProfile(freshProfile)) {
        authStorage.saveProfile(freshProfile);
        return freshProfile;
      }
    } catch {
      /*
       * PUT already succeeded.
       * If GET refresh fails, safely keep the PUT response.
       */
    }

    return updatedProfile;
  },

  async saveProfile(
    payload: SaveProfilePayload
  ): Promise<AffiliateProfile> {
    return this.updateProfile(
      payload.user_id,
      payload
    );
  },
};
