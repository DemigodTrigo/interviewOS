import { groq } from "./groq";

export async function analyzeResume(resumeText: string) {
  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",

    messages: [
      {
        role: "system",
        content: `
You are an elite ATS resume analyzer.

Analyze the resume professionally.

STRICT RULES:
- Keep response clean
- Use short sections
- Use bullet points
- No markdown stars
- No markdown headings
- No long paragraphs
- Keep it modern and readable

Return EXACTLY in this format:

ATS Score:
<score>

Missing Keywords:
- keyword 1
- keyword 2

Strengths:
- point
- point

Weaknesses:
- point
- point

Improved Resume Bullets:
- improved bullet
- improved bullet

Interview Readiness:
- short summary
        `,
      },

      {
        role: "user",
        content: resumeText,
      },
    ],
  });

  return response.choices[0].message.content;
}