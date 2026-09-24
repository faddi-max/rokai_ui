import type { DiscussionComment } from "@/shared/types/discussion";

// In-memory mock store — mutated during a session so replies/new comments
// persist while the API isn't live yet. Remove this file once the real
// `/blog-comments` endpoint is deployed.
export const mockComments: DiscussionComment[] = [
  {
    id: "1",
    authorName: "Tom Krbin",
    role: "Admin",
    rating: 5,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 210).toISOString(),
    text:
      "The wash guide was easy to follow and the explanation about cold water was especially useful. I use the same process for lightweight sweat-worn Gis and season training kits.",
    repliesCount: 2,
    replies: [
      {
        id: "1-1",
        authorName: "Bikki Ryom",
        isOfficial: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 205).toISOString(),
        text:
          "Glad it helped! For heavier sweat-soaked Gis, air dry them flat instead of hanging or wringing them out to keep the fabric from stretching.",
      },
      {
        id: "1-2",
        authorName: "Marcus Allen",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 204).toISOString(),
        text:
          "I use the same method on my training Gi and it's kept it fresh and free from lingering smell after every session.",
      },
    ],
  },
  {
    id: "2",
    authorName: "Daniel Lee",
    role: "Moderator",
    rating: 4,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21).toISOString(),
    text:
      "Even without unnecessary steps, the article outlines fabric durability along my older Gi's seams and joints reasonably well.",
    repliesCount: 0,
    replies: [],
  },
  {
    id: "3",
    authorName: "Sofia Ramirez",
    rating: 5,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    text:
      "Would be helpful to include a quick note about washing with guards on the fit. I usually separate them, but I'm still not sure it's necessary.",
    repliesCount: 0,
    replies: [],
  },
];