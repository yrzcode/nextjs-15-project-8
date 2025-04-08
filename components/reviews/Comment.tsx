"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Comment({ comment }: { comment: string }) {
	const [isExpanded, setIsExpanded] = useState(false);
	const toggleExpanded = () => {
		setIsExpanded((prev) => !prev);
	};
	const isLongComment = comment.length > 130;
	const displayComment =
		isLongComment && !isExpanded ? `${comment.slice(0, 130)}...` : comment;
	return (
		<div>
			<p className="text-sm">{displayComment}</p>
			{isLongComment && (
				<Button
					variant="link"
					className="pl-0 text-muted-foreground"
					onClick={toggleExpanded}
				>
					{isExpanded ? "Show Less" : "Show More"}
				</Button>
			)}
		</div>
	);
}
