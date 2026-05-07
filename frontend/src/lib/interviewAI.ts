import { groq } from "./groq";

export async function askInterviewQuestion(role: string) {
  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",

    messages: [
      {
        role: "system",
        content: `
You are a senior technical interviewer.

Ask one realistic interview question for the given role.

Rules:
- Ask only ONE question
- Keep it concise
- Mix technical + behavioral
- Sound like real FAANG interviewer
        `,
      },

      {
        role: "user",
        content: role,
      },
    ],
  });

  return response.choices[0].message.content;
}