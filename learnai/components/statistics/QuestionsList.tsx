"use client";
import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Question } from "@prisma/client";
type Props = {
  questions: Question[];
};

const QuestionsList = ({ questions }: Props) => {
  return (
    <Table className="mt-4">
      <TableCaption>Perguntas desse teste</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[10px]">#.</TableHead>
          <TableHead>Pergunta e Resposta Correta</TableHead>
          <TableHead>Sua Resposta</TableHead>

          {questions[0].questionType === "complete" && (
            <TableHead className="w-[10px] text-right">Precisão</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        <>
          {questions.map(
            (
              { answer, question, userAnswer, percentageCorrect, isCorrect },
              index
            ) => {
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    {question} <br />
                    <br />
                    <span className="font-semibold">{answer}</span>
                  </TableCell>
                  {questions[0].questionType === "complete" ? (
                    <TableCell className={`font-semibold`}>
                      {userAnswer}
                    </TableCell>
                  ) : (
                    <TableCell
                      className={`${
                        isCorrect ? "text-green-600" : "text-red-600"
                      } font-semibold`}
                    >
                      {userAnswer}
                    </TableCell>
                  )}

                  {percentageCorrect && (
                    <TableCell className="text-right">
                      {percentageCorrect}
                    </TableCell>
                  )}
                </TableRow>
              );
            }
          )}
        </>
      </TableBody>
    </Table>
  );
};

export default QuestionsList;