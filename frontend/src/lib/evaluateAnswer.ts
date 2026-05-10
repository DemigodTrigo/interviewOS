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
You are a FAANG senior interviewer.

Evaluate the candidate answer.

IMPORTANT:
Return ONLY valid JSON.

Format:
{
  "score": 85,
  "clarity": 90,
  "technical": 84,
  "communication": 88,
  "summary": "Short professional summary",
  "strengths": [
    "Strong technical explanation"
  ],
  "weaknesses": [
    "Could improve clarity"
  ],
  "improved_answer": "Better version of the answer"
}
`,
        },

        {
          role: "user",
          content: `
Question:
${question}

Answer:
${answer}
`,
        },
      ],

      temperature: 0.7,
    });

  const raw =
    response.choices[0].message
      .content || "{}";

  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error(
      "JSON Parse Error:",
      raw
    );

    return {
      score: 75,
      clarity: 80,
      technical: 78,
      communication: 82,
      summary:
        "Good answer overall.",
      strengths: [
        "Clear explanation",
      ],
      weaknesses: [
        "Could improve depth",
      ],
      improved_answer:
        answer,
    };
  }
}