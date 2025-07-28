import { OpenAI } from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default async function handler(req, res) {
  const { messages } = req.body
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages,
  })
  res.status(200).json({ reply: completion.choices[0].message })
}