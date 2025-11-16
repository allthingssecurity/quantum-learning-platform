
import { GoogleGenAI } from '@google/genai';

const API_KEY = (import.meta as any).env.VITE_GEMINI_API_KEY as string | undefined;

if (!API_KEY) {
  console.warn("VITE_GEMINI_API_KEY environment variable not set for Gemini.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export const explainConcept = async (concept: string, title: string): Promise<string> => {
  if (!API_KEY || !ai) {
    return Promise.resolve("Gemini API key not configured. Cannot fetch explanation.");
  }

  try {
    const prompt = `Explain the quantum computing concept of "${title}: ${concept}" in simple, easy-to-understand terms for a beginner. Use analogies if possible. Structure the explanation with a title and short paragraphs. Do not use markdown for the title.`;

    const client = ai!;

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text ?? 'No explanation returned from Gemini.';
  } catch (error) {
    console.error('Error fetching explanation from Gemini:', error);
    return 'An error occurred while trying to get an explanation. Please check your API key and network connection.';
  }
};
