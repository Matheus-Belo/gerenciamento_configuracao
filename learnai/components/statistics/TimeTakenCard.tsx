import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { formatTimeDelta } from "@/lib/utils";
import { differenceInSeconds } from "date-fns";
import { LuHourglass } from "react-icons/lu";

type Props = {
  timeEnded: Date;
  timeStarted: Date;
};

const TimeTakenCard = ({ timeEnded, timeStarted }: Props) => {
  return (
    <Card className="md:col-span-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">Tempo</CardTitle>
        <LuHourglass />
      </CardHeader>
      <CardContent>
        <div className="text-sm font-medium">
          {formatTimeDelta(differenceInSeconds(timeEnded, timeStarted))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeTakenCard;