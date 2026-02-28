import { GoogleGenAI } from "@google/genai";

/**
 * Astrai Neural Link Service
 * Handles secure access to the Gemini API using platform-native key management.
 */
export const getGeminiClient = async () => {
  // 1. Try to get the key from the environment (injected by platform)
  // @ts-ignore
  let apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  
  // 2. If missing, trigger the platform's secure key selection dialog
  // @ts-ignore
  if (!apiKey && window.aistudio) {
    try {
      // @ts-ignore
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        // @ts-ignore
        await window.aistudio.openSelectKey();
      }
      // @ts-ignore
      apiKey = process.env.API_KEY;
    } catch (e) {
      console.error("[ASTRAI_SECURITY] Key selection failed.");
      throw new Error("AUTH_REQUIRED");
    }
  }

  if (!apiKey) {
    throw new Error("NEURAL_LINK_SEVERED");
  }

  // 3. Return a fresh instance. We don't store the key in a global variable.
  return new GoogleGenAI({ apiKey });
};

/**
 * Sanitizes error messages to prevent leaking sensitive system info
 */
export const handleAiError = (error: any) => {
  console.error("[ASTRAI_CORE] Signal Interrupted.");
  // Check for specific RPC or Auth errors but don't log the full error object to console
  const msg = error?.message || "";
  if (msg.includes("API_KEY") || msg.includes("auth")) return "AUTH_REQUIRED";
  if (msg.includes("xhr") || msg.includes("Rpc")) return "SIGNAL_TURBULENCE";
  return "CORE_HALT";
};
