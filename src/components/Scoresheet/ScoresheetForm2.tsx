"use client";
import { Buzz, Scoresheet } from "@/utilities/types";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useState, KeyboardEvent, use } from "react";
import QuestionEntry from "./QuestionEntry";
import { submitPacket } from "@/utilities/toastiesActions";
import { ToastContext } from "@/context/ToastContext";
import SuccessAlert from "../Feedback/SuccessAlert";
import NavigationGuard from "../Feedback/NavigationGuard";

type ScoresheetProps = {
  room: number;
  writer: string;
  reader: string;
  roster: string[];
};

const ScoresheetForm = (props: ScoresheetProps) => {
  const [results, setResults] = useState<Buzz[][]>([]);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const { toast } = use(ToastContext);
  const [noToastOnSubmit, setNoToastOnSubmit] = useState(false);
  const [successOpen, setSuccessOpen] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  const confirmExitMessage = "Leave this page? Unsubmitted scores will not be saved."

  const handleAddQuestion = () => {
    setResults([...results, []]);
    setIsDirty(true);
  };

  const handleDeleteQuestion = (index: number) => {
    const newResults = results.toSpliced(index, 1);
    setResults(newResults);
  };

  const handleKeyboardAddQuestion = (e: KeyboardEvent) => {
    if (e.key === "Enter" && e.shiftKey) {
      handleAddQuestion();
    }
  };

  const questionEntryProps = (question: Buzz[], index: number) => ({
    number: index + 1,
    buzzes: question,
    handleDelete: () => handleDeleteQuestion(index),
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
    const success = await submitPacket(scoresheet);
    setSubmitLoading(false);
    if (success) {
      setSuccessOpen(true);
      setIsDirty(false);
    }
  };

  return (
    <Container onKeyDown={handleKeyboardAddQuestion}>
      <NavigationGuard isDirty={isDirty} message={confirmExitMessage}/>
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
              key={index} // TODO: Fix this to handle deletes properly
              {...questionEntryProps(question, index)}
            />
          ))}
        </Stack>
        <Button variant="outlined" onClick={handleAddQuestion}>
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
      <SuccessAlert open={successOpen} setOpen={setSuccessOpen}>
        Packet successfully submitted
      </SuccessAlert>
    </Container>
  );
};

export default ScoresheetForm;
