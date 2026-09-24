import { useCallback, useState } from "react";
import { discussionService } from "@/shared/api/services/discussionService";
import type { DiscussionComment, DiscussionReply } from "@/shared/types/discussion";

const PAGE_SIZE = 10;

export function useDiscussionComments(postId: string) {
  const [comments, setComments] = useState<DiscussionComment[]>([]);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoadingInitial, setIsLoadingInitial] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFirstPage = useCallback(async () => {
    setIsLoadingInitial(true);
    setError(null);
    try {
      const result = await discussionService.getComments(postId, 1, PAGE_SIZE);
      setComments(result.comments);
      setHasMore(result.hasMore);
      setPage(1);
      setHasLoadedOnce(true);
    } catch {
      setError("We couldn't load comments right now.");
    } finally {
      setIsLoadingInitial(false);
    }
  }, [postId]);

  const fetchNextPage = useCallback(async () => {
    setIsLoadingMore(true);
    setError(null);
    try {
      const nextPage = page + 1;
      const result = await discussionService.getComments(postId, nextPage, PAGE_SIZE);
      setComments((prev) => [...prev, ...result.comments]);
      setHasMore(result.hasMore);
      setPage(nextPage);
    } catch {
      setError("We couldn't load more comments.");
    } finally {
      setIsLoadingMore(false);
    }
  }, [postId, page]);

  const appendReply = useCallback((commentId: string, reply: DiscussionReply) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? { ...c, replies: [...c.replies, reply], repliesCount: c.repliesCount + 1 }
          : c
      )
    );
  }, []);

  return {
    comments,
    hasLoadedOnce,
    hasMore,
    isLoadingInitial,
    isLoadingMore,
    error,
    fetchFirstPage,
    fetchNextPage,
    appendReply,
  };
}