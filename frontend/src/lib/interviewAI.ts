import { groq } from "./groq";

export async function askInterviewQuestion(role: string) {
  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",

    messages: [
      {
        role: "system",
        content: `
            You are an expert FAANG interviewer.

            Generate ONE realistic interview question for the role provided.

            Keep it concise and professional.
        `,
      },

      {
        role: "user",
        content: `Generate interview question for ${role}`,
      },
    ],
  });

  return response.choices[0].message.content;
}