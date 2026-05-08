import { groq } from "./groq";

export async function askCareerCoach(
  message: string
) {
  const response =
    await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",

      messages: [
        {
          role: "system",
          content: `
You are InterviewOS AI Career Coach.

You help software engineers with:
- resumes
- interviews
- career growth
- salary negotiation
- roadmap planning
- AI engineering careers
- backend engineering
- system design

Keep answers:
- concise
- practical
- professional
- motivating
          `,
        },

        {
          role: "user",
          content: message,
        },
      ],
    });

  return response.choices[0].message.content;
}