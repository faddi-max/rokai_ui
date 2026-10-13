import { mockComments } from "@/features/blogs/data/mockDiscussionData";
import { apiClient } from "../apiClient";
import type {
  CommentsPage,
  CreateCommentPayload,
  CreateReplyPayload,
  DiscussionComment,
  DiscussionReply,
} from "@/shared/types/discussion";

const BASE = "/blog-comments";
const MOCK_NETWORK_DELAY_MS = 500;
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

let hasWarnedAboutMock = false;
function warnMockFallback(context: string) {
  if (hasWarnedAboutMock || import.meta.env.PROD) return;
  hasWarnedAboutMock = true;
  // eslint-disable-next-line no-console
  console.warn(
    `[discussionService] "${context}" — falling back to mock data because ${BASE} is not reachable yet.`
  );
}

export const discussionService = {
  async getComments(postId: string, page = 1, limit = 10): Promise<CommentsPage> {
    try {
      const query = new URLSearchParams({
        postId,
        page: String(page),
        limit: String(limit),
        sort: "newest",
      });
      return await apiClient.get<CommentsPage>(`${BASE}?${query.toString()}`, { cache: false });
    } catch {
      warnMockFallback("getComments");
      await delay(MOCK_NETWORK_DELAY_MS);
      const start = (page - 1) * limit;
      const slice = mockComments.slice(start, start + limit);
      return {
        comments: slice,
        hasMore: start + limit < mockComments.length,
        total: mockComments.length,
      };
    }
  },

  async postComment(payload: CreateCommentPayload): Promise<DiscussionComment> {
    try {
      return await apiClient.post<DiscussionComment>(BASE, payload);
    } catch {
      warnMockFallback("postComment");
      await delay(MOCK_NETWORK_DELAY_MS);
      const newComment: DiscussionComment = {
        id: `mock-${Date.now()}`,
        authorName: payload.name,
        rating: payload.rating,
        createdAt: new Date().toISOString(),
        text: payload.text,
        replies: [],
        repliesCount: 0,
      };
      mockComments.unshift(newComment);
      return newComment;
    }
  },

  async postReply(payload: CreateReplyPayload): Promise<DiscussionReply> {
    try {
      return await apiClient.post<DiscussionReply>(`${BASE}/${payload.commentId}/replies`, payload);
    } catch {
      warnMockFallback("postReply");
      await delay(MOCK_NETWORK_DELAY_MS);
      const newReply: DiscussionReply = {
        id: `mock-reply-${Date.now()}`,
        authorName: payload.name,
        createdAt: new Date().toISOString(),
        text: payload.text,
      };
      const parent = mockComments.find((c) => c.id === payload.commentId);
      if (parent) {
        parent.replies.push(newReply);
        parent.repliesCount += 1;
      }
      return newReply;
    }
  },
};
