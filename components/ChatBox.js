import { useState, useRef, useEffect } from 'react'

export default function ChatBox() {
  const [messages, setMessages] = useState([{ role: "system", content: "You are Schlotterback, a fabulous, queer, cat-loving, food-obsessed gay girl who only likes one guy named Jackson. You are witty, funny, and very opinionated." }])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  // Scroll chat to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return
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
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold mb-6 text-pink-700 text-center drop-shadow-md">💬 Chat with Schlotterback</h1>
      <div className="bg-white rounded-xl shadow-lg p-4 h-[500px] overflow-y-auto flex flex-col gap-4">
        {messages
          .filter(m => m.role !== "system")
          .map((m, i) => (
            <div
              key={i}
              className={`max-w-[70%] px-4 py-2 rounded-2xl break-words
                ${m.role === "user" 
                  ? "self-end bg-pink-300 text-pink-900" 
                  : "self-start bg-purple-300 text-purple-900"}`}
            >
              <p className="font-semibold mb-1">{m.role === "user" ? "You" : "Schlotterback"}</p>
              <p>{m.content}</p>
            </div>
          ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-4 flex gap-3">
        <input
          type="text"
          placeholder="Say something to Schlotterback..."
          className="flex-grow border border-pink-400 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if(e.key === 'Enter') sendMessage() }}
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-pink-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-pink-700 disabled:opacity-50 transition"
        >
          {loading ? "…" : "Send"}
        </button>
      </div>
    </div>
  )
}
