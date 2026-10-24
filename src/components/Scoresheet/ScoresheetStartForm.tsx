"use client";
import { PlayerContext } from "@/context/PlayerContext";
import { getRoster } from "@/utilities/toastiesActions";
import {
  Chip,
  Stack,
  Button,
  Container,
  Skeleton,
  Typography,
} from "@mui/material";
import { Field, FieldArray, Form, Formik } from "formik";
import { KeyboardEvent, use, useEffect, useRef, useState } from "react";
import PlayerSelect from "../PlayerSelect";

interface ScoresheetFormProps {
  room: number | null;
  setScoresheetValues: (roster: ScoresheetValues) => void;
}

export interface ScoresheetValues {
  writer: string;
  reader: string | null;
  roster: string[];
}

interface FormikPassedProps {
  label: string;
}

const ScoresheetStartForm = ({
  room,
  setScoresheetValues,
}: ScoresheetFormProps) => {
  const [roster, setRoster] = useState<string[] | null>(null);
  const { playerMap, getFullName } = use(PlayerContext);
  const [writer, setWriter] = useState<string | null>(null);
  const [reader, setReader] = useState<string | null>(null);
  const [rosterSelected, setRosterSelected] = useState<string | null>(null);

  const handleNameSubmit = (push: (playerId: string) => void) => {
    if (rosterSelected) {
      push(rosterSelected);
      setRosterSelected(null);
    }
  };

  const handleKeyPress = (
    e: KeyboardEvent,
    push: (playerId: string) => void,
  ) => {
    if (e.key === "Enter") {
      handleNameSubmit(push);
    }
  };

  useEffect(() => {
    const prevRoster = async () => {
      if (room != null) {
        const roster = await getRoster(room);
        setRoster(roster);
      }
    };
    prevRoster();
  }, [room]);

  const WriterSelect = (props: FormikPassedProps) => (
    <PlayerSelect
      playerIds={playerMap.keys().toArray()}
      playerId={writer}
      setPlayerId={setWriter}
      {...props}
    />
  );

  const ReaderSelect = (props: FormikPassedProps) => (
    <PlayerSelect
      playerIds={playerMap.keys().toArray()}
      playerId={reader}
      setPlayerId={setReader}
      {...props}
    />
  );

  return (
    <Container maxWidth="xs" sx={{ marginTop: "5vh" }}>
      {room && roster ? (
        <Formik<ScoresheetValues>
          initialValues={{
            writer: "",
            reader: null,
            roster: roster,
          }}
          onSubmit={(values) => {
            if (!values.writer && writer) values.writer = writer; // TODO: remove these two lines by properly connecting the PlayerSelect autocompletes with the formik fields
            if (!values.reader) values.reader = reader;
            setScoresheetValues(values);
          }}
        >
          {({ values }) => (
            <Form
              onKeyDown={(e: KeyboardEvent) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            >
              <Stack spacing={"1.5vh"}>
                <Typography variant="h4">Start New Scoresheet</Typography>
                <Field
                  as={WriterSelect}
                  name="writer"
                  label="Enter writer name"
                  type="text"
                  required
                />
                <Field
                  as={ReaderSelect}
                  name="reader"
                  label="Enter reader name (leave blank for no reader)"
                  type="text"
                />
                <FieldArray name="roster">
                  {({ remove, push }) => (
                    <div>
                      <Stack direction={"row"} spacing={1}>
                        <PlayerSelect
                          playerIds={playerMap
                            .keys()
                            .toArray()
                            .filter((id) => !values.roster.includes(id))}
                          playerId={rosterSelected}
                          setPlayerId={setRosterSelected}
                          onKeyDown={(e: KeyboardEvent) =>
                            handleKeyPress(e, push)
                          }
                          label="Enter player names"
                          autoFocus
                        />
                        <Button onClick={() => handleNameSubmit(push)}>
                          Add
                        </Button>
                      </Stack>
                      {values.roster.map((playerId, index) => (
                        <Chip
                          key={playerId}
                          label={getFullName(playerId)}
                          onDelete={() => remove(index)}
                        />
                      ))}
                    </div>
                  )}
                </FieldArray>
                <Button type="submit" color="secondary" variant="contained">
                  Start scoresheet
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      ) : (
        <Skeleton></Skeleton>
      )}
    </Container>
  );
};

export default ScoresheetStartForm;
