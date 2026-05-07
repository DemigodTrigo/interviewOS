import { groq } from "./groq";

export async function evaluateAnswer(
  question: string,
  answer: string
) {
  const response =
    await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",

      messages: [
        {
          role: "system",
          content: `
You are a senior FAANG interviewer.

Evaluate the candidate answer.

Return:
- score out of 10
- strengths
- weaknesses
- improved answer
- communication feedback

Keep response concise and professional.
          `,
        },

        {
          role: "user",
          content: `
Interview Question:
${question}

Candidate Answer:
${answer}
          `,
        },
      ],
    });

  return response.choices[0].message.content;
}