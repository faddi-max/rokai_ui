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
  if (hasWarnedAboutMock || process.env.NODE_ENV === "production") return;
  hasWarnedAboutMock = true;
  // eslint-disable-next-line no-console
  console.warn(
    `[discussionService] "${context}" — falling back to mock data because ${BASE} is not reachable yet.`
  );
}

export const discussionService = {
  async getComments(postId: string, page = 1, limit = 10): Promise<CommentsPage> {
    try {
      const { data } = await apiClient.get<CommentsPage>(BASE, {
        params: { postId, page, limit, sort: "newest" },
      });
      return data;
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
      const { data } = await apiClient.post<DiscussionComment>(BASE, payload);
      return data;
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
      const { data } = await apiClient.post<DiscussionReply>(
        `${BASE}/${payload.commentId}/replies`,
        payload
      );
      return data;
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