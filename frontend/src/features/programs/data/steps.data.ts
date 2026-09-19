export type Step = {
  id: string;
  title: string;
  description: string;
  /** Red accent line + arrow. Set false for the muted look (card 02 in the design). */
  accent?: boolean;
  /** Optional link — makes the whole card clickable. */
  href?: string;
};

/**
 * Static content for now. Later, fetch from your API / CMS and pass the
 * result to <StepSection steps={data} /> — no component changes needed.
 */
export const STEPS: Step[] = [
  {
    id: "join",
    title: "Join the program",
    description:
      "Submit your affiliate application and tell us about your BJJ audience or community.",
  },
  {
    id: "share",
    title: "Share Rokai",
    description:
      "Receive your unique referral link and promote Rokai products.",
    accent: false,
  },
  {
    id: "earn",
    title: "Earn commission",
    description:
      "Earn commission when qualifying customers complete purchases through your referral.",
  },
];
