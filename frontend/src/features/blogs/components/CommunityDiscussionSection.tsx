import { useState } from "react";
import { Star, ChevronDown, ArrowUpRight, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import SectionGlow from "@/shared/components/layout/SectionGlow";
import { discussionService } from "@/shared/api/services/discussionService";
import { useDiscussionComments } from "@/shared/hooks/useDiscussionCommnet";
import type { DiscussionComment } from "@/shared/types/discussion";

const COMMENT_MAX_LENGTH = 500;

function StarRating({
  rating,
  size = 14,
  onChange,
}: {
  rating: number;
  size?: number;
  onChange?: (val: number) => void;
}) {
  return (
    <div className="flex items-center gap-0.5" role={onChange ? "radiogroup" : undefined} aria-label="Rating">
      {Array.from({ length: 5 }).map((_, i) => (
        <button
          key={i}
          type="button"
          disabled={!onChange}
          onClick={() => onChange?.(i + 1)}
          aria-label={`${i + 1} star${i === 0 ? "" : "s"}`}
          className={onChange ? "cursor-pointer" : "cursor-default"}
        >
          <Star
            size={size}
            className={i < rating ? "fill-[#E63946] text-[#E63946]" : "text-white/20"}
          />
        </button>
      ))}
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E63946]/15 text-sm font-bold text-[#E63946]">
      {initials || "?"}
    </div>
  );
}

function RoleBadge({ role }: { role: string }) {
  return (
    <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white/70">
      {role}
    </span>
  );
}

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diffMs / 86_400_000);
  if (days < 1) return "Today";
  if (days < 7) return `${days} Day${days > 1 ? "s" : ""} Ago`;
  if (days < 30) return `${Math.floor(days / 7)} Week${Math.floor(days / 7) > 1 ? "s" : ""} Ago`;
  if (days < 365) return `${Math.floor(days / 30)} Month${Math.floor(days / 30) > 1 ? "s" : ""} Ago`;
  return `${Math.floor(days / 365)} Year${Math.floor(days / 365) > 1 ? "s" : ""} Ago`;
}

function CommentSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-white/10" />
        <div className="space-y-2">
          <div className="h-3 w-32 rounded bg-white/10" />
          <div className="h-2 w-20 rounded bg-white/10" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-2 w-full rounded bg-white/10" />
        <div className="h-2 w-4/5 rounded bg-white/10" />
      </div>
    </div>
  );
}

function CommentItem({
  comment,
  postId,
  onReplyPosted,
}: {
  comment: DiscussionComment;
  postId: string;
  onReplyPosted: (commentId: string, reply: DiscussionComment["replies"][number]) => void;
}) {
  const [showReplies, setShowReplies] = useState(comment.replies.length > 0);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyName, setReplyName] = useState("");
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReplySubmit = async () => {
    if (!replyName.trim() || !replyText.trim()) {
      setError("Name and reply are both required.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const reply = await discussionService.postReply({
        postId,
        commentId: comment.id,
        name: replyName.trim(),
        text: replyText.trim(),
      });
      onReplyPosted(comment.id, reply);
      setShowReplies(true);
      setShowReplyForm(false);
      setReplyName("");
      setReplyText("");
    } catch {
      setError("Couldn't post your reply. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <Avatar name={comment.authorName} />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-bold text-white">{comment.authorName}</span>
              {comment.role && <RoleBadge role={comment.role} />}
            </div>
            <span className="text-xs text-white/40">{timeAgo(comment.createdAt)}</span>
          </div>
        </div>
        <StarRating rating={comment.rating} />
      </div>

      <p className="mt-4 text-sm leading-relaxed text-white/70">{comment.text}</p>

      <div className="mt-4 flex items-center gap-5 text-xs font-semibold uppercase tracking-wide">
        {comment.repliesCount > 0 && (
          <button
            onClick={() => setShowReplies((v) => !v)}
            className="flex items-center gap-1 text-white/50 hover:text-white"
          >
            {comment.repliesCount} {comment.repliesCount === 1 ? "Reply" : "Replies"}
            <ChevronDown size={14} className={`transition-transform ${showReplies ? "rotate-180" : ""}`} />
          </button>
        )}
        <button onClick={() => setShowReplyForm((v) => !v)} className="text-[#E63946] hover:underline">
          Reply
        </button>
      </div>

      {showReplies && comment.replies.length > 0 && (
        <div className="mt-4 space-y-4 border-l-2 border-[#E63946]/30 pl-4 sm:pl-6">
          {comment.replies.map((reply) => (
            <div key={reply.id}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold text-white">{reply.authorName}</span>
                {reply.isOfficial && <span className="text-xs italic text-white/40">Official Reply</span>}
                <span className="text-xs text-white/40">· {timeAgo(reply.createdAt)}</span>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-white/70">{reply.text}</p>
            </div>
          ))}
        </div>
      )}

      {showReplyForm && (
        <div className="mt-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_2fr_auto]">
            <input
              value={replyName}
              onChange={(e) => setReplyName(e.target.value)}
              type="text"
              placeholder="Your Name"
              className="rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-[#E63946] focus:outline-none"
            />
            <input
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              type="text"
              placeholder="Reply To This Comment..."
              className="rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-[#E63946] focus:outline-none"
            />
            <button
              onClick={handleReplySubmit}
              disabled={submitting}
              className="flex items-center justify-center gap-1 whitespace-nowrap rounded-md bg-[#E63946] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#c92f3b] disabled:opacity-60"
            >
              {submitting ? <Loader2 size={14} className="animate-spin" /> : "Post Reply"}
              {!submitting && <ArrowUpRight size={14} />}
            </button>
          </div>
          {error && (
            <p className="mt-2 flex items-center gap-1 text-xs text-red-400">
              <AlertCircle size={12} /> {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default function CommunityDiscussionSection({ postId }: { postId: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    comments,
    hasLoadedOnce,
    hasMore,
    isLoadingInitial,
    isLoadingMore,
    error: loadError,
    fetchFirstPage,
    fetchNextPage,
    appendReply,
  } = useDiscussionComments(postId);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = "Name is required.";
    if (!email.trim()) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email.";
    if (!text.trim()) errors.text = "Comment can't be empty.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitComment = async () => {
    setSubmitError(null);
    setSubmitSuccess(false);
    if (!validate()) return;

    setSubmitting(true);
    try {
      await discussionService.postComment({
        postId,
        name: name.trim(),
        email: email.trim(),
        rating,
        text: text.trim(),
      });
      setName("");
      setEmail("");
      setRating(0);
      setText("");
      setFieldErrors({});
      setSubmitSuccess(true);
      await fetchFirstPage();
    } catch {
      setSubmitError("Couldn't post your comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SectionGlow>
      <div className="mx-5 py-10 font-space-grotesk lg:mx-50">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-white/50">
                Community Discussion
              </span>
              <span className="h-px w-10 bg-white/20" />
            </div>
            <h2 className="text-3xl font-bold uppercase leading-tight sm:text-4xl">
              <span className="text-white">Join The</span>
              <br />
              <span className="text-[#E63946]">Conversation</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/60">
            Share Your Experience, Ask A Question, Or Help Another Athlete. Every
            Comment And Reply Stays Connected, So The Complete Discussion Is Easy To
            Follow.
          </p>
        </div>

        {/* Leave a comment */}
        <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
          <h3 className="text-lg font-bold uppercase text-white">Leave A Comment</h3>
          <p className="mt-1 text-sm text-white/50">
            Share Your Thoughts, Ask A Question Or Leave A Review!
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-start">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase text-white/50">Name *</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Your name"
                aria-invalid={!!fieldErrors.name}
                className="w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-[#E63946] focus:outline-none"
              />
              {fieldErrors.name && <p className="mt-1 text-xs text-red-400">{fieldErrors.name}</p>}
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase text-white/50">Email *</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                aria-invalid={!!fieldErrors.email}
                className="w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-[#E63946] focus:outline-none"
              />
              {fieldErrors.email && <p className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>}
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase text-white/50">
                Your Rating <span className="normal-case text-white/30">(optional)</span>
              </label>
              <StarRating rating={rating} size={18} onChange={setRating} />
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label className="mb-1 block text-xs font-semibold uppercase text-white/50">Comment *</label>
              <span className="text-[10px] text-white/30">
                {text.length}/{COMMENT_MAX_LENGTH}
              </span>
            </div>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, COMMENT_MAX_LENGTH))}
              rows={3}
              placeholder="Share your thoughts or ask a question..."
              aria-invalid={!!fieldErrors.text}
              className="w-full resize-none rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-[#E63946] focus:outline-none"
            />
            {fieldErrors.text && <p className="mt-1 text-xs text-red-400">{fieldErrors.text}</p>}
          </div>

          <div className="mt-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs text-white/40">Be Respectful; Comments Are Moderated For The Community.</p>
              {submitError && (
                <p className="mt-1 flex items-center gap-1 text-xs text-red-400">
                  <AlertCircle size={12} /> {submitError}
                </p>
              )}
              {submitSuccess && (
                <p className="mt-1 flex items-center gap-1 text-xs text-emerald-400">
                  <CheckCircle2 size={12} /> Your comment has been posted.
                </p>
              )}
            </div>
            <button
              onClick={handleSubmitComment}
              disabled={submitting}
              className="flex items-center gap-1 rounded-md bg-[#E63946] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#c92f3b] disabled:opacity-60"
            >
              {submitting ? <Loader2 size={14} className="animate-spin" /> : "Post Comment"}
              {!submitting && <ArrowUpRight size={14} />}
            </button>
          </div>
        </div>

        {/* Latest discussion — only after the first successful submit */}
        {hasLoadedOnce && (
          <>
            <div className="mt-10 flex items-center justify-between">
              <h3 className="text-lg font-bold uppercase text-white">Latest Discussion</h3>
              <button className="flex items-center gap-1 rounded-md border border-white/10 px-3 py-1.5 text-xs text-white/60 hover:text-white">
                Newest First
                <ChevronDown size={14} />
              </button>
            </div>

            {isLoadingInitial && (
              <div className="mt-5 space-y-4">
                <CommentSkeleton />
                <CommentSkeleton />
              </div>
            )}

            {!isLoadingInitial && loadError && (
              <div className="mt-5 flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-8 text-center">
                <AlertCircle size={20} className="text-red-400" />
                <p className="text-sm text-white/60">{loadError}</p>
                <button
                  onClick={fetchFirstPage}
                  className="rounded-md border border-white/10 px-4 py-1.5 text-xs font-semibold uppercase text-white/70 hover:text-white"
                >
                  Retry
                </button>
              </div>
            )}

            {!isLoadingInitial && !loadError && comments.length === 0 && (
              <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] p-8 text-center">
                <p className="text-sm text-white/50">No comments yet — be the first to start the conversation.</p>
              </div>
            )}

            {!isLoadingInitial && comments.length > 0 && (
              <div className="mt-5 space-y-4">
                {comments.map((comment) => (
                  <CommentItem key={comment.id} comment={comment} postId={postId} onReplyPosted={appendReply} />
                ))}
              </div>
            )}

            {!isLoadingInitial && !loadError && hasMore && (
              <div className="mt-5 flex justify-center">
                <button
                  onClick={fetchNextPage}
                  disabled={isLoadingMore}
                  className="flex items-center gap-1 rounded-md border border-white/10 px-4 py-2 text-xs font-semibold uppercase text-white/70 hover:text-white disabled:opacity-60"
                >
                  {isLoadingMore ? <Loader2 size={14} className="animate-spin" /> : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </SectionGlow>
  );
}