"use server";

import { venice } from "@/utils/venice.utils";
import axios, { AxiosError } from "axios";

export async function getModels() {
  if (!venice.apiKey) {
    throw new Error("API key not configured");
  }

  try {
    const res = await axios.get(`${venice.baseUrl}/models`, {
      headers: {
        Authorization: `Bearer ${venice.apiKey}`,
      },
    });

    if (res.status === 200) {
      return res.data.data;
    }
  } catch (err) {
    const error = err as AxiosError;

    //@ts-expect-error Expected error
    throw new Error(error.response?.data.error.message);
  }
}
