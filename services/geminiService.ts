import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

let chatSession: Chat | null = null;

const getClient = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("API Key missing");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const initChat = async (): Promise<Chat | null> => {
  const ai = getClient();
  if (!ai) return null;

  try {
    chatSession = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return chatSession;
  } catch (error) {
    console.error("Failed to init chat", error);
    return null;
  }
};

export const sendMessageStream = async function* (message: string) {
  if (!chatSession) {
    await initChat();
  }

  if (!chatSession) {
    yield "SYSTEM_ERROR: CONNECTION_LOST. Please configure API_KEY.";
    return;
  }

  try {
    const resultStream = await chatSession.sendMessageStream({ message });
    
    for await (const chunk of resultStream) {
       yield chunk.text;
    }
  } catch (error) {
    console.error("Error sending message:", error);
    yield "SYSTEM_ERROR: TRANSMISSION_FAILED.";
  }
};