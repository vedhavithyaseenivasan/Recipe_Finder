// import React, { useState } from 'react';
// import axios from 'axios';
// import styles from './RecipeChatbot.module.css'; // Importing the new creative styles

// const RecipeChatbot = () => {
//   const [input, setInput] = useState('');
//   const [chatLog, setChatLog] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const cohereApiKey = 'xTlR3FdNSiqjNylPgWRKH2D087FHJQKvoxKzAziu'; // Replace with your Cohere API key

//   const handleInputChange = (e) => {
//     setInput(e.target.value);
//   };

//   const handleSend = async () => {
//     if (!input) return;

//     const newChatLog = [...chatLog, { user: 'user', message: input }];
//     setChatLog(newChatLog);
//     setLoading(true);

//     try {
//       const response = await axios.post(
//         'https://api.cohere.ai/v1/generate', // Cohere's generation endpoint
//         {
//           model: 'command-xlarge-nightly', // Cohere’s conversational model
//           prompt: `User: ${input}\nBot:`, // Corrected the prompt formatting
//           max_tokens: 500, // Adjust token limit as needed
//           temperature: 0.7,
//         },
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${cohereApiKey}`, // Corrected header formatting
//           },
//         }
//       );
//       const botMessage = response.data.generations[0].text.trim();
//       setChatLog([...newChatLog, { user: 'bot', message: botMessage }]);
//     } catch (error) {
//       console.error('Error:', error.response ? error.response.data : error.message);
//       setChatLog([...newChatLog, { user: 'bot', message: 'Server is busy, please try again later.' }]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={styles.chatbotContainer}>
//       <div className={styles.chatLog}>
//         {chatLog.map((entry, index) => (
//           <div
//             key={index}
//             className={`${styles.message} ${entry.user === 'bot' ? styles.botMessage : styles.userMessage}`}
//           >
//             <strong>{entry.user === 'bot' ? 'Bot' : 'You'}: </strong>{entry.message}
//           </div>
//         ))}
//       </div>
//       <div className={styles.inputContainer}>
//         <input
//           type="text"
//           value={input}
//           onChange={handleInputChange}
//           placeholder="Ask me a recipe question..."
//           className={styles.chatInput}
//         />
//         <button
//           onClick={handleSend}
//           disabled={loading}
//           className={styles.sendButton}
//         >
//           {loading ? 'Loading...' : 'Send'}
//         </button>
//       </div>

//       {/* Floating action button */}
//       <div className={styles.floatingButton} onClick={() => alert('You clicked the floating button!')}>
//         💬
//       </div>
//     </div>
//   );
// };

// export default RecipeChatbot;














"use client"

import { useState, useRef, useEffect } from "react"
import axios from "axios"
import styles from "./RecipeChatbot.module.css"

const RecipeChatbot = () => {
  const [input, setInput] = useState("")
  const [chatLog, setChatLog] = useState([
    {
      id: 1,
      type: "bot",
      content:
        "Hello! I'm your Recipe AI assistant. I can help you find recipes, suggest ingredients, and answer cooking questions. What would you like to cook today?",
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

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

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
          max_tokens: 500,
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

  const handleQuickAction = (text) => {
    setInput(text)
  }

  return (
    <div className={styles.chatbotPage}>
      <div className={styles.chatbotContainer}>
        {/* Header */}
        <div className={styles.chatbotHeader}>
          <div className={styles.chatbotLogo}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </div>
          <h1 className={styles.chatbotTitle}>Recipe AI Assistant</h1>
          <p className={styles.chatbotSubtitle}>Your personal cooking companion powered by AI</p>
        </div>

        {/* Chat Container */}
        <div className={styles.chatContainer}>
          <div className={styles.chatLog}>
            {chatLog.map((message) => (
              <div
                key={message.id}
                className={`${styles.message} ${message.type === "user" ? styles.messageReverse : ""}`}
              >
                <div
                  className={`${styles.messageAvatar} ${message.type === "bot" ? styles.botAvatar : styles.userAvatar}`}
                >
                  {message.type === "bot" ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  )}
                </div>
                <div className={`${styles.messageContent} ${message.type === "user" ? styles.userMessage : ""}`}>
                  <div className={styles.messageText}>{message.content}</div>
                  <div className={styles.messageTime}>
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className={styles.typingIndicator}>
                <div className={`${styles.messageAvatar} ${styles.botAvatar}`}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div className={styles.typingContent}>
                  <div className={styles.typingDot}></div>
                  <div className={styles.typingDot}></div>
                  <div className={styles.typingDot}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Container */}
        <div className={styles.inputContainer}>
          <div className={styles.inputForm}>
            <div className={styles.inputWrapper}>
              <textarea
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about recipes, ingredients, cooking tips..."
                className={styles.chatInput}
                rows={1}
              />
            </div>
            <button onClick={handleSend} disabled={!input.trim() || loading} className={styles.sendButton}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22,2 15,22 11,13 2,9 22,2" />
              </svg>
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={styles.quickActions}>
          <button className={styles.quickAction} onClick={() => handleQuickAction("Suggest a quick dinner recipe")}>
            Quick Dinner Ideas
          </button>
          <button
            className={styles.quickAction}
            onClick={() => handleQuickAction("What can I make with chicken and rice?")}
          >
            Ingredient Suggestions
          </button>
          <button className={styles.quickAction} onClick={() => handleQuickAction("How do I make pasta from scratch?")}>
            Cooking Tips
          </button>
          <button className={styles.quickAction} onClick={() => handleQuickAction("Healthy breakfast recipes")}>
            Healthy Options
          </button>
        </div>
      </div>
    </div>
  )
}

export default RecipeChatbot
