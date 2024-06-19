import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type Props = {};

const RecentActivitiesCard = async (props: Props) => {
  return (
    <Card className="col-span-4 lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <Link href="/history">Atividade Recente</Link>
        </CardTitle>
        <CardDescription>
          Você fez um total de 10 quizes.
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[400px] overflow-y-auto">
        Histórico
      </CardContent>
    </Card>
  );
};

export default RecentActivitiesCard;