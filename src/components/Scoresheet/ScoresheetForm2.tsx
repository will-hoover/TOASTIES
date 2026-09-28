"use client";
import { Buzz, Scoresheet } from "@/utilities/types";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useState, KeyboardEvent, use, useEffect } from "react";
import QuestionEntry from "./QuestionEntry";
import { submitPacket } from "@/utilities/toastiesActions";
import { ToastContext } from "@/context/ToastContext";
import ConfirmAlert from "../ConfirmAlert";
import { useRouter } from "next/router";

type ScoresheetProps = {
  room: number;
  writer: string;
  reader: string;
  roster: string[];
};

const ScoresheetForm = (props: ScoresheetProps) => {
  const [results, setResults] = useState<Buzz[][]>([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { toast } = use(ToastContext);
  const [noToastOnSubmit, setNoToastOnSubmit] = useState(false);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const router = useRouter();

  let pendingUrl: string | null = null;

  useEffect(() => {
    if (submitted) return;

    const handleBeforePopState = (state: { url: string; as?: string }) => {
      pendingUrl = state.url;
      setAlertOpen(true);
      return false;
    };
    router.beforePopState(handleBeforePopState);
    return () => {
      router.beforePopState(() => true);
    };
  }, [router, submitted]);

  const handleConfirm = () => {
    setAlertOpen(false);
    if (pendingUrl) {
      router.push(pendingUrl).catch(() => {});
    } else {
      window.location.reload();
    }
  };

  const handleCancel = () => {
    setAlertOpen(false);
  };

  const addQuestion = () => {
    setResults([...results, []]);
  };

  const deleteQuestion = (index: number) => {
    const newResults = results.toSpliced(index, 1);
    setResults(newResults);
  };

  const handleKeyboardAddQuestion = (e: KeyboardEvent) => {
    if (e.key === "Enter" && e.shiftKey) {
      addQuestion();
    }
  };

  const questionEntryProps = (question: Buzz[], index: number) => ({
    number: index + 1,
    buzzes: question,
    handleDelete: () => deleteQuestion(index),
    roster: props.roster,
    current: index + 1 === results.length,
  });

  const onSubmitClick = async () => {
    if (toast == null) {
      setNoToastOnSubmit(true);
      return;
    }
    const scoresheet: Scoresheet = {
      toast: toast.id,
      room: props.room,
      writer: props.writer,
      reader: props.reader === "" ? undefined : props.reader,
      roster: props.roster,
      questions: results,
    };
    setSubmitLoading(true);
    console.log(props.room);
    console.log(props.writer);
    const success = await submitPacket(scoresheet);
    console.log(success);
    setSubmitLoading(false);
  };

  return (
    <Container onKeyDown={handleKeyboardAddQuestion}>
      <Stack spacing={3}>
        <Typography variant="h3" sx={{ fontWeight: 400 }}>
          Packet writer: {props.writer}
        </Typography>
        <Typography variant="h4">
          Packet reader: {props.reader === "" ? props.writer : props.reader}
        </Typography>
        <Stack spacing={2}>
          {results.map((question, index) => (
            <QuestionEntry
              key={index}
              {...questionEntryProps(question, index)}
            />
          ))}
        </Stack>
        <Button variant="outlined" onClick={addQuestion}>
          Add Question
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={onSubmitClick}
          loading={submitLoading}
        >
          Submit Packet
        </Button>
      </Stack>
      <ConfirmAlert
        open={alertOpen}
        message="Leave now? Unsubmitted scoresheet changes will be lost"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </Container>
  );
};

export default ScoresheetForm;
