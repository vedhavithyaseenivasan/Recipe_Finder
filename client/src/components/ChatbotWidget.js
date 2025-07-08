"use client"

import { useState, useRef, useEffect } from "react"
import axios from "axios"
import "./ChatbotWidget.css"

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState("")
  const [chatLog, setChatLog] = useState([
    {
      id: 1,
      type: "bot",
      content: "Hi! I'm your Recipe AI assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const cohereApiKey = "xTlR3FdNSiqjNylPgWRKH2D087FHJQKvoxKzAziu"

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chatLog])

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setChatLog((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const response = await axios.post(
        "https://api.cohere.ai/v1/generate",
        {
          model: "command-xlarge-nightly",
          prompt: `User: ${input}\nBot:`,
          max_tokens: 300,
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cohereApiKey}`,
          },
        },
      )

      const botMessage = {
        id: Date.now() + 1,
        type: "bot",
        content: response.data.generations[0].text.trim(),
        timestamp: new Date(),
      }

      setChatLog((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message)
      const errorMessage = {
        id: Date.now() + 1,
        type: "bot",
        content: "I'm experiencing some technical difficulties. Please try again later.",
        timestamp: new Date(),
      }
      setChatLog((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Chat Widget */}
      <div className={`rf-chatbot-widget ${isOpen ? "rf-open" : ""}`}>
        {isOpen && (
          <div className="rf-chatbot-container">
            {/* Header */}
            <div className="rf-chatbot-header">
              <div className="rf-chatbot-header-info">
                <div className="rf-chatbot-avatar">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="rf-chatbot-title">Recipe AI</h3>
                  <p className="rf-chatbot-status">Online</p>
                </div>
              </div>
              <button onClick={toggleChat} className="rf-chatbot-close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="rf-chatbot-messages">
              {chatLog.map((message) => (
                <div
                  key={message.id}
                  className={`rf-chatbot-message ${message.type === "user" ? "rf-user" : "rf-bot"}`}
                >
                  <div className="rf-message-content">
                    <p>{message.content}</p>
                    <span className="rf-message-time">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="rf-chatbot-message rf-bot">
                  <div className="rf-message-content">
                    <div className="rf-typing-indicator">
                      <div className="rf-typing-dot"></div>
                      <div className="rf-typing-dot"></div>
                      <div className="rf-typing-dot"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="rf-chatbot-input">
              <div className="rf-input-container">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about recipes..."
                  className="rf-chat-input"
                />
                <button onClick={handleSend} disabled={!input.trim() || loading} className="rf-send-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22,2 15,22 11,13 2,9 22,2" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toggle Button */}
        <button onClick={toggleChat} className="rf-chatbot-toggle">
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )}
        </button>
      </div>
    </>
  )
}

export default ChatbotWidget
