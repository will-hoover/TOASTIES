import axios from "axios";
import { Scoresheet, Statsheet, Toast, ToastDetails } from "./types";

const base_url = "http://localhost:8000"; // Default host for API

export async function startToast(toast: ToastDetails) {
  const response = await axios
    .post(`${base_url}/start`, toast)
    .catch((reason) => {
      console.log(`an error occured: ${reason}`);
      return;
    });
  if (response?.status !== 201) {
    return { message: response?.data["message"], id: "null" };
  }
  return response?.data as { number: number; id: string; message: string };
}

export async function getLiveToast() {
  const response = await axios.get(`${base_url}/toast`).catch((reason) => {
    console.log(`an error occured: ${reason}`);
    return;
  });
  if (response?.status === 404) {
    return null;
  }
  return response?.data as Toast;
}

export async function endToast() {
  const response = await axios.post(`${base_url}/end`).catch((reason) => {
    console.log(`an error occured: ${reason}`);
    return;
  });
  return response?.status === 204;
}

export async function rooms(toast?: string) {
  const url = toast ? `${base_url}/rooms?toast=${toast}` : `${base_url}/rooms`;
  const response = await axios.get(url);
  return response.data["rooms"];
}

export async function addRoom() {
  const response = await axios.post(`${base_url}/addroom`);
  if (response.status === 200) {
    return response.data["rooms"];
  } else {
    return response.data["message"];
  }
}

export async function getStats(room?: number) {
  const url = room ? `${base_url}/stats/${room}` : `${base_url}/stats`;
  const response = await axios.get(url).catch((reason) => {
    console.log(`an error occured: ${reason}`);
    return;
  });
  if (response?.status !== 200) {
    return [] as Statsheet[];
  }
  return response?.data as Statsheet[];
}

export async function submitPacket(scoresheet: Scoresheet) {
  const response = await axios
    .post(`${base_url}/scoresheet`, scoresheet)
    .catch((reason) => {
      console.log(`an error occured: ${reason}`);
      return;
    });
  return response?.status === 201;
}

export async function getRoster(room: number) {
  const response = await axios
    .get(`${base_url}/roster/${room}`)
    .catch((reason) => {
      console.log(`an error occured: ${reason}`);
      return;
    });
  return response?.data;
}
