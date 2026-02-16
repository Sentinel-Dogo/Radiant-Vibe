
import { GoogleGenAI, Type } from "@google/genai";
import { Topic, MotivationData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMotivation = async (topic: Topic): Promise<MotivationData> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a pure, highly motivational, and positive energy boost focused on ${topic}. 
    Be inspiring, empathetic, and energetic. Format your response as a JSON object.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          quote: { type: Type.STRING, description: "A famous or original short inspiring quote." },
          author: { type: Type.STRING, description: "Author of the quote." },
          pepTalk: { type: Type.STRING, description: "A paragraph of high-energy, positive encouragement (3-4 sentences)." },
          challenge: { type: Type.STRING, description: "A small, actionable positive task for today." },
          affirmation: { type: Type.STRING, description: "A powerful 'I AM' statement for this topic." }
        },
        required: ["quote", "author", "pepTalk", "challenge", "affirmation"]
      }
    }
  });

  try {
    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("Failed to generate your daily boost.");
  }
};

export const generateSpeech = async (text: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: `Read this affirmation with maximum warmth and positive energy: ${text}` }] }],
    config: {
      responseModalities: ["AUDIO"],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Kore' },
        },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64Audio) throw new Error("No audio generated");
  return base64Audio;
};
