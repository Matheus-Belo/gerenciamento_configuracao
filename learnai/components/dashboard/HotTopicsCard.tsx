import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CustomWordCloud from "../CustomWordCloud";

type Props = {};

const HotTopicsCard = async (props: Props) => {

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Em Alta</CardTitle>
        <CardDescription>
          Clique em um tópico para iniciar um quiz
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        {/* <CustomWordCloud/>  */}

      </CardContent>
    </Card>
  );
};

export default HotTopicsCard;