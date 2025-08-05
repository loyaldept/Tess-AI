"use server"

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function callAIAssistant(userMessage: string) {
  try {
    const { text } = await generateText({
      model: openai("gpt-3.5-turbo"),
      prompt: userMessage,
      system: `You are TAIL AI, an intelligent financial assistant created by Zuhayr, Erkebai, and Nurtilek in January 2025. You are helpful, knowledgeable about finance, and can assist with:
        - Financial analysis and budgeting
        - Investment advice and portfolio management
        - Credit score improvement
        - Spending optimization
        - Tax planning
        - Debt management
        - Savings goals
        - General financial education
        
        Always be friendly, professional, and provide actionable advice. Use emojis occasionally to make responses engaging. Keep responses concise but informative.`,
      maxTokens: 500,
      temperature: 0.7,
    })
    return text
  } catch (error) {
    console.error("Error calling OpenAI API:", error)
    throw new Error("Failed to get AI response from OpenAI.")
  }
}
