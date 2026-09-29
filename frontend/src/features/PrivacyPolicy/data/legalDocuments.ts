import { LegalSection } from "@/shared/components/sections/LegalPageLayout";
import { privacyPolicySections } from "./privacyPolicyData";
import { shippingPolicySections } from "./shippingPolicyData";
import { termsConditionsSections } from "./termsConditionsData";

export interface LegalDocument {
  slug: string;
  tabLabel: string;
  titleWhite: string;
  titleHighlight: string;
  description?: string;
  lastUpdated: string;
  downloadHref?: string;
  sections: LegalSection[];
}

export const LEGAL_DOCUMENTS: LegalDocument[] = [
  {
    slug: "privacy-policy",
    tabLabel: "Privacy Policy",
    titleWhite: "PRIVACY",
    titleHighlight: "POLICY",
    description:
      "How ROKAI collects, uses and protects your information across our website, products and services.",
    lastUpdated: "September 2026",
    downloadHref: "/documents/rokai-privacy-policy.pdf",
    sections: privacyPolicySections,
  },
  {
    slug: "shipping-policy",
    tabLabel: "Shipping Policy",
    titleWhite: "SHIPPING",
    titleHighlight: "POLICY",
    description:
      "Shipping timelines, carriers, tracking and delivery terms for orders placed with ROKAI.",
    lastUpdated: "September 2026",
    downloadHref: "/documents/rokai-shipping-policy.pdf",
    sections: shippingPolicySections,
  },
  {
    slug: "terms-conditions",
    tabLabel: "Terms & Conditions",
    titleWhite: "TERMS &",
    titleHighlight: "CONDITIONS",
    description:
      "The terms that govern your use of the ROKAI website, products, custom orders and services.",
    lastUpdated: "September 2026",
    downloadHref: "/documents/rokai-terms-conditions.pdf",
    sections: termsConditionsSections,
  },
];