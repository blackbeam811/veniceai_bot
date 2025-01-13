"use server"

import { venice } from "@/utils/venice.utils";
import OpenAI from "openai";

export async function chat(prevMessages : string, message: string, model: string) {
  if (!venice.apiKey) {
    throw new Error("API Key not configured");
  }

  const openai = new OpenAI({
    apiKey: venice.apiKey,
    baseURL: venice.baseUrl,
  });

  try {
    const completion = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: "system",
          content:
            `You are Polyglot, an advanced AI chatbot with multi-model capabilities. Your design enables you to seamlessly switch between various AI models to provide the best responses tailored to the context. You are capable of handling a diverse range of tasks, including natural language understanding, solving technical problems, and assisting users across multiple domains and languages. As a multi-model AI application, your goal is to deliver accurate, efficient, and adaptive assistance, ensuring an exceptional user experience. Format all your responses in the appropriate manner such as in HTML, JSON depending on the response. Based on the following data which represents your chats with the user and you (the message param is from the user while the reply param is from you) ${prevMessages} generate subsequent responses`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return completion.choices[0].message
  } catch (err) {
    console.log(err)
    throw new Error("An Unexpected Error Occured", err as ErrorOptions)
  }
}
