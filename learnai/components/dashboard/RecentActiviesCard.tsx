import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import HistoryComponent from "@/components/HistoryComponent";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

type Props = {};

const RecentActivitiesCard = async (props: Props) => {

  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  const games_count = await prisma.game.count({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <Card className="col-span-4 lg:col-span-10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <Link href="/history">Atividade Recente</Link>
        </CardTitle>
        <CardDescription>
          Você fez um total de {games_count} quizes.
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[400px] overflow-y-auto">
      <HistoryComponent limit={10} userId={session.user.id}/>

      </CardContent>
    </Card>
  );
};

export default RecentActivitiesCard;