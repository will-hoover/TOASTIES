"use client";
import GradientStripe from "@/components/GradientStripe";
import StatTable from "@/components/Statsheet/StatTable";
import { getStats } from "@/utilities/toastiesActions";
import { Statsheet } from "@/utilities/types";
import {
  Container,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const StatsPage = ({ params }: { params: Promise<{ room: number }> }) => {
  const [room, setRoom] = useState<number | undefined>(-1);
  const [currentSheet, setCurrentSheet] = useState("Overall");
  const [writers, setWriters] = useState<string[]>([]);
  const [statsheets, setStatsheets] = useState<Statsheet[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getRoomNumber = async () => {
      const { room } = await params;
      setRoom(room);
    };
    getRoomNumber();
  }, [params]);

  useEffect(() => {
    const getStatsheets = async () => {
      if (room == -1) return;
      setLoading(true);
      const statsheets = await getStats(room);
      console.log(statsheets);
      setWriters(statsheets.map((s) => s.writer));
      setStatsheets(statsheets);
      setLoading(false);
    };
    getStatsheets();
  }, [room]);

  const handleSheetChange = (event: SelectChangeEvent) => {
    setCurrentSheet(event.target.value);
  };

  return (
    <Container maxWidth="xl" sx={{ mb: "3vh" }}>
      <Stack direction={"column"}>
        <GradientStripe
          text={`Tournament Stats - ${room ? `Room ${room}` : "Combined"}`}
          height={2}
          textHeading="h2"
        />
        {loading ? (
          <Skeleton variant="rectangular" height={"60vh"} />
        ) : (
          <>
            {statsheets.length === 0 ? (
              <p>
                No stats right now! Check back later when scores have been
                entered
              </p>
            ) : (
              <>
                <Stack direction="column" sx={{ my: "2vh" }}>
                  <Typography variant="body2">Packet subset</Typography>
                  <Select
                    value={currentSheet}
                    onChange={handleSheetChange}
                    sx={{ maxWidth: "30vw" }}
                  >
                    {writers.map((writer) => (
                      <MenuItem key={writer} value={writer}>
                        {writer}
                      </MenuItem>
                    ))}
                  </Select>
                </Stack>
                <StatTable
                  stats={statsheets.at(writers.indexOf(currentSheet))?.stats}
                />
              </>
            )}
          </>
        )}
      </Stack>
    </Container>
  );
};

export default StatsPage;
