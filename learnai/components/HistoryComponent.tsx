import { prisma } from "@/lib/db";

import Link from "next/link";
import React from "react";
import { LuCopyCheck } from "react-icons/lu";
import { TbEdit } from "react-icons/tb";
import { ClockIcon } from "@radix-ui/react-icons";

type Props = {
  limit: number;
  userId: string;
};

const HistoryComponent = async ({ limit, userId }: Props) => {
  const games = await prisma.game.findMany({
    take: limit,
    where: {
      userId,
    },
    orderBy: {
      timeStarted: "desc",
    },
  });
  return (
    <div className="space-y-8">
      {games.map((game) => {
        return (
          <div className="flex items-center justify-between" key={game.id}>
            <div className="flex items-center">
              {game.gameType === "closed" ? (
                <LuCopyCheck className="mr-3" />
              ) : (
                <TbEdit className="mr-3" />
              )}
              <div className="ml-4 space-y-1">
                <Link
                  className="text-base font-medium leading-none underline"
                  href={`/statistics/${game.id}`}
                >
                  {game.topic}
                </Link>
                <p className="flex items-center px-2 py-1 text-xs text-white rounded-lg w-fit bg-slate-800">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  {new Date(game.timeEnded ?? 0).toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground">
                  {game.gameType === "closed" ? "Multipla escolha" : "Completar lacunas"}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HistoryComponent;