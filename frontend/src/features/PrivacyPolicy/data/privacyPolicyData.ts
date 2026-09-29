import { LegalSection } from "@/shared/components/sections/LegalPageLayout";


export const privacyPolicySections: LegalSection[] = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: [
      {
        type: "paragraph",
        text: "We collect information you provide directly, information generated through your use of our services, and information from third parties involved in fulfilling your order.",
      },
    ],
  },
  {
    id: "personal-information",
    title: "Personal Information",
    content: [
      {
        type: "list",
        items: ["Name", "Email address", "Phone number", "Shipping address", "Company / brand name"],
      },
    ],
  },
  {
    id: "non-personal-information",
    title: "Non-Personal Information",
    content: [
      {
        type: "list",
        items: ["Browser type", "Device information", "IP address", "Pages visited and time spent on site"],
      },
    ],
  },
  {
    id: "how-we-use-your-information",
    title: "How We Use Your Information",
    content: [
      {
        type: "list",
        items: [
          "To process and fulfil orders",
          "To communicate about your account or project",
          "To improve our products and services",
          "To send relevant updates, where permitted",
        ],
      },
    ],
  },
  {
    id: "custom-design-information",
    title: "Custom Design Information",
    content: [
      {
        type: "paragraph",
        text: "Artwork, logos and specifications submitted for custom manufacturing are used solely to produce your order and are not shared with third parties beyond what is required for production.",
      },
    ],
  },
  {
    id: "payment-security",
    title: "Payment Security",
    content: [
      {
        type: "paragraph",
        text: "Payments are processed through secure, PCI-compliant payment providers. ROKAI does not store full payment card details on its own servers.",
      },
    ],
  },
  {
    id: "cookies-and-tracking-technologies",
    title: "Cookies and Tracking Technologies",
    content: [
      {
        type: "paragraph",
        text: "We use cookies and similar technologies to keep the site functional, remember preferences and understand how the site is used. You can control cookies through your browser settings.",
      },
    ],
  },
  {
    id: "sharing-of-information",
    title: "Sharing of Information",
    content: [
      {
        type: "list",
        items: [
          "Shipping and logistics partners",
          "Payment processors",
          "Service providers who support our operations",
          "When required by law",
        ],
      },
    ],
  },
  {
    id: "data-retention",
    title: "Data Retention",
    content: [
      {
        type: "paragraph",
        text: "We retain personal information for as long as necessary to fulfil the purposes described in this policy, unless a longer retention period is required by law.",
      },
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights",
    content: [
      {
        type: "list",
        items: [
          "Request access to your personal information",
          "Request correction of inaccurate information",
          "Request deletion of your information",
          "Opt out of marketing communications",
        ],
      },
    ],
  },
  {
    id: "third-party-links",
    title: "Third Party Links",
    content: [
      {
        type: "paragraph",
        text: "Our site may contain links to third-party websites. We are not responsible for the privacy practices of those sites.",
      },
    ],
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    content: [
      {
        type: "paragraph",
        text: "Our services are not directed at children, and we do not knowingly collect personal information from children.",
      },
    ],
  },
  {
    id: "data-security",
    title: "Data Security",
    content: [
      {
        type: "paragraph",
        text: "We take reasonable technical and organizational measures to protect your information against unauthorized access, alteration or disclosure.",
      },
    ],
  },
  {
    id: "changes-to-this-privacy-policy",
    title: "Changes to This Privacy Policy",
    content: [
      {
        type: "paragraph",
        text: "We may update this policy from time to time. Changes will be posted on this page with an updated revision date.",
      },
    ],
  },
];