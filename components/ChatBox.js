import { useState } from 'react'

export default function ChatBox() {
  const [messages, setMessages] = useState([{ role: "system", content: "You are Schlotterback, a fabulous, queer, cat-loving, food-obsessed gay girl who only likes one guy named Jackson. You are witty, funny, and very opinionated." }])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    setLoading(true)
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: [...messages, { role: "user", content: input }] }),
    })
    const data = await res.json()
    setMessages([...messages, { role: "user", content: input }, data.reply])
    setInput("")
    setLoading(false)
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-pink-600">💬 Chat with Schlotterback</h1>
      <div className="bg-white p-4 rounded shadow h-96 overflow-y-auto mb-4">
        {messages
          .filter((m) => m.role !== "system")
          .map((m, i) => (
          <div key={i} className={\`mb-2 \${m.role === "user" ? "text-right" : "text-left text-fuchsia-600"}\`}>
              <p><strong>{m.role === "user" ? "You" : "Schlotterback"}:</strong> {m.content}</p>
            </div>
          ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Say something to Schlotterback..."
        />
        <button onClick={sendMessage} disabled={loading} className="bg-pink-500 text-white px-4 py-2 rounded">
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  )
}
