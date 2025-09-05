import { createContext, use, useState } from "react";

function genID() {
	return crypto.randomUUID();
}

type CommentType = {
	id: string;
	comment: string;
	votes: number;
	replies?: CommentType[];
};

const rawComments: CommentType[] = [
	{
		id: genID(),
		comment: "Hello world",
		votes: Math.round(Math.random() * 100),
		replies: [
			{
				id: genID(),
				comment: "Lorem",
				votes: Math.round(Math.random() * 100),
			},
			{
				id: genID(),
				comment: "Lorem 123",
				votes: Math.round(Math.random() * 100),
				replies: [
					{
						id: genID(),
						comment: "dnjkf ea f",
						votes: Math.round(Math.random() * 100),
					},
				],
			},
			{
				id: genID(),
				comment: "abcd 1234",
				votes: Math.round(Math.random() * 100),
			},
		],
	},
	{
		id: genID(),
		comment: "Hello world",
		votes: Math.round(Math.random() * 100),
	},
	{
		id: genID(),
		comment: "Hello world",
		votes: Math.round(Math.random() * 100),
		replies: [
			{
				id: genID(),
				votes: Math.round(Math.random() * 100),
				comment: "Lorem",
			},
			{
				id: genID(),
				votes: Math.round(Math.random() * 100),
				comment: "Lorem 123",
			},
			{
				id: genID(),
				comment: "abcd 1234",
				votes: Math.round(Math.random() * 100),
			},
		],
	},
];

const commentsContext = createContext<{
	reply(comment: string): void;
	upvote(comment: string): void;
	downvote(comment: string): void;
}>({} as any);

function useCommentContext() {
	return use(commentsContext);
}

function findComment(
	commentId: string,
	comments: CommentType[]
): CommentType | null {
	for (let c of comments) {
		if (c.id === commentId) return c;
		if (c.replies) {
			const foundComment = findComment(commentId, c.replies);
			if (foundComment) return foundComment;
		}
	}
	return null;
}

const NestedComments = () => {
	const [comments, setComments] = useState(rawComments);

	function reply(parent: string) {
		const msg = prompt("Enter the message")?.trim();
		if (!msg || msg?.length == 0) return;
		const newComments = [...comments];
		if (!parent.trim()) {
			newComments.push({
				id: genID(),
				comment: msg,
				votes: 0,
			});
			setComments(newComments);
			return;
		}
		const foundComment = findComment(parent, newComments);
		if (!foundComment) return;
		const replies = foundComment.replies || [];
		replies.push({
			id: genID(),
			comment: msg,
			votes: 0,
		});
		foundComment.replies = replies;
		setComments(newComments);
	}
	function upvote(parent: string, incrementor = 1) {
		const newComments = [...comments];
		const foundComment = findComment(parent, newComments);
		if (!foundComment) return;
		foundComment.votes += incrementor;
		setComments(newComments);
	}
	function downvote(parent: string) {
		upvote(parent, -1);
	}

	return (
		<div className="">
			<button className="border px-2 m-2" onClick={() => reply("")}>
				Comment
			</button>
			<commentsContext.Provider
				value={{
					reply,
					downvote,
					upvote,
				}}
			>
				{comments.map((comment) => (
					<Comment comment={comment} key={comment.id} />
				))}
			</commentsContext.Provider>
		</div>
	);
};

function Comment({ comment }: { comment: CommentType }) {
	const [showReplies, setShowReplies] = useState(false);

	function toggleReplies() {
		setShowReplies((p) => !p);
	}

	return (
		<div>
			<div className="flex flex-row items-center gap-2">
				{comment.replies ? (
					<p
						className="border rounded-full size-6 text-center flex justify-center items-center cursor-pointer hover:bg-gray-200 text-lg"
						onClick={toggleReplies}
					>
						<span className="mb-1">{showReplies ? "-" : "+"}</span>
					</p>
				) : (
					<div className="size-6" />
				)}
				<p className="p-1">{comment.comment}</p>
			</div>
			<CommentToolbar comment={comment} />
			{(comment.replies?.length || 0) > 0 && showReplies && (
				<div className="ml-4 border-l pl-1">
					{comment.replies?.map((c) => (
						<Comment comment={c} key={c.id} />
					))}
				</div>
			)}
		</div>
	);
}

type CommentToolbarProps = {
	comment: CommentType;
};

function CommentToolbar({ comment }: CommentToolbarProps) {
	const { reply, downvote, upvote } = useCommentContext();
	const { id: commentId, votes } = comment;

	function onAction(actionType: number) {
		// 1 - reply, 2 - upvote, 3 - downvote
		if (actionType == 1) {
			reply(commentId);
		} else if (actionType == 2) {
			upvote(commentId);
		} else if (actionType == 3) {
			downvote(commentId);
		}
	}

	return (
		<div className="w-fit px-1 ml-6 flex flex-row gap-2 text-sm">
			<button
				onClick={() => onAction(1)}
				className="rounded-md border border-blue-700 hover:bg-blue-100 cursor-pointer px-2 focus:outline-2 focus:outline-blue-300"
			>
				Reply
			</button>
			<button
				onClick={() => onAction(2)}
				className="rounded-md border border-blue-700 hover:bg-blue-100 cursor-pointer px-2 focus:outline-2 focus:outline-blue-300"
			>
				{votes} | Upvote
			</button>
			<button
				onClick={() => onAction(3)}
				className="rounded-md border border-blue-700 hover:bg-blue-100 cursor-pointer px-2 focus:outline-2 focus:outline-blue-300"
			>
				Downvote
			</button>
		</div>
	);
}

export default NestedComments;
