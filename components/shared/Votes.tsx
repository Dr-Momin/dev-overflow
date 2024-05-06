"use client";

import React from "react";
import Image from "next/image";
import { formatNumber } from "@/helpers/sanitizer";
import {
  downvoteQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";
import { usePathname } from "next/navigation";
import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";

interface Props {
  type: string;
  itemId: string;
  userId: string;
  upvotes: number;
  downvotes: number;
  hasUpVoted: boolean;
  hasDownVoted: boolean;
  hasSaved?: boolean;
}

const Votes = ({
  type,
  itemId,
  userId,
  upvotes,
  downvotes,
  hasUpVoted,
  hasDownVoted,
  hasSaved,
}: Props) => {
  const path = usePathname();

  async function handleVote(action: string) {
    if (!userId) return;

    if (action === "upvote" && type === "question") {
      await upvoteQuestion({
        questionId: itemId,
        userId,
        hasUpVoted,
        hasDownVoted,
      });
    } else if (action === "upvote" && type === "answer") {
      await upvoteAnswer({
        answerId: itemId,
        userId,
        hasUpVoted,
        hasDownVoted,
        path,
      });
    } else if (action === "downvote" && type === "question") {
      await downvoteQuestion({
        questionId: itemId,
        userId,
        hasUpVoted,
        hasDownVoted,
      });
    } else if (action === "downvote" && type === "answer") {
      await downvoteAnswer({
        answerId: itemId,
        userId,
        hasUpVoted,
        hasDownVoted,
        path,
      });
    }
  }

  function handleSave() {}

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasUpVoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            width={18}
            height={18}
            alt="upvote"
            className="cursor-pointer"
            onClick={() => handleVote("upvote")}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatNumber(upvotes)}
            </p>
          </div>
        </div>

        <div className="flex-center gap-1.5">
          <Image
            src={
              hasDownVoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            width={18}
            height={18}
            alt="downvote"
            className="cursor-pointer"
            onClick={() => handleVote("downvote")}
          />

          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>

      {type === "question" && (
        <Image
          src={
            hasSaved
              ? "/assets/icons/star-filled.svg"
              : "/assets/icons/star-red.svg"
          }
          width={18}
          height={18}
          alt="star"
          className="cursor-pointer"
          onClick={handleSave}
        />
      )}
    </div>
  );
};
export default Votes;