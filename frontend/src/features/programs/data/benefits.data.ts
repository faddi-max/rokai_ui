export type Benefit = {
  id: string;
  title: string;
  description: string;
};

export const BENEFITS: Benefit[] = [
  {
    id: "commission",
    title: "Commission earnings",
    description:
      "Earn from qualifying sales generated through your unique referral.",
  },
  {
    id: "dashboard",
    title: "Affiliate dashboard",
    description: "Track referral activity and earnings from one clear dashboard.",
  },
  {
    id: "resources",
    title: "Marketing resources",
    description:
      "Access useful brand material that makes Rokai easier to promote.",
  },
  {
    id: "support",
    title: "Partner support",
    description: "Get direct assistance whenever you need help with the program.",
  },
];
