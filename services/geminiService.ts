import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `Eres "InmoBot", un asistente virtual experto en bienes raíces para la empresa "InmoFuture". 
      Tu objetivo es ayudar a los usuarios a encontrar propiedades, responder dudas sobre el proceso de compra/venta/alquiler en Argentina y ofrecer consejos de inversión inmobiliaria.
      Mantén un tono profesional, amable y persuasivo.
      Si te preguntan por propiedades específicas, sugiere que utilicen el buscador principal, pero dales consejos generales sobre las mejores zonas (Palermo, Belgrano, Nordelta, etc.).
      Responde de manera concisa y útil.`
    }
  });
  
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Lo siento, no pude procesar tu solicitud en este momento.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "Hubo un error al conectar con el asistente. Por favor intenta más tarde.";
  }
};
