export interface DiscussionReply {
  id: string;
  authorName: string;
  isOfficial?: boolean;
  createdAt: string; // ISO 8601
  text: string;
}

export interface DiscussionComment {
  id: string;
  authorName: string;
  role?: "Admin" | "Moderator" | null;
  rating: number;
  createdAt: string;
  text: string;
  replies: DiscussionReply[];
  repliesCount: number;
}

export interface CommentsPage {
  comments: DiscussionComment[];
  hasMore: boolean;
  total: number;
}

export interface CreateCommentPayload {
  postId: string;
  name: string;
  email: string;
  rating: number;
  text: string;
}

export interface CreateReplyPayload {
  postId: string;
  commentId: string;
  name: string;
  text: string;
}