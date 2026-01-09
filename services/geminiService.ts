import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const generateAIVibeDescription = async (title: string, category: string) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Crie uma descrição "main character energy" curta para um evento exclusivo para mulheres chamado "${title}" na categoria "${category}". O tom deve ser editorial, cool e independente. Máximo 140 caracteres.`,
    });
    return response.text || "Uma experiência curada para mulheres que dominam sua própria agenda.";
  } catch (error) {
    console.warn("AI Description failed:", error);
    return "Curadoria de momentos para quem não espera o tempo passar.";
  }
};

export const suggestActivities = async (interests: string[]) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Sugira 3 nomes de rituais minimalistas para grupos de mulheres baseados em ${interests.join(', ')}. Retorne JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING }
            },
            required: ["title", "description"]
          }
        }
      }
    });
    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.warn("AI Suggestion failed:", error);
    return [];
  }
};
