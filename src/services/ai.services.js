import { GoogleGenAI } from "@google/genai";

let ai;

export const generateAiResponse = async (contents) => {
    if (!ai) {
        if (!process.env.GOOGLE_GEMINI_API_KEY) {
            throw new Error("GOOGLE_GEMINI_API_KEY environment variable is not set");
        }
        ai = new GoogleGenAI({
            apiKey: process.env.GOOGLE_GEMINI_API_KEY,
        });
    }

    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: contents,
    });
    return response;
};