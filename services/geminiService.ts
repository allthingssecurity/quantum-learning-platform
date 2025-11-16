
import { GoogleGenAI } from '@google/genai';

// Assume process.env.API_KEY is available
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // For this context, we'll proceed, but API calls will fail.
  console.warn("API_KEY environment variable not set for Gemini.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const explainConcept = async (concept: string, title: string): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve("Gemini API key not configured. Cannot fetch explanation.");
  }
  
  try {
    const prompt = `Explain the quantum computing concept of "${title}: ${concept}" in simple, easy-to-understand terms for a beginner. Use analogies if possible. Structure the explanation with a title and short paragraphs. Do not use markdown for the title.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error('Error fetching explanation from Gemini:', error);
    return 'An error occurred while trying to get an explanation. Please check your API key and network connection.';
  }
};
