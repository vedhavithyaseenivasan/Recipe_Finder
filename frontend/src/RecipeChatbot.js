import React, { useState } from 'react';
import axios from 'axios';
import styles from './RecipeChatbot.module.css'; // Importing the new creative styles

const RecipeChatbot = () => {
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);

  const cohereApiKey = 'xTlR3FdNSiqjNylPgWRKH2D087FHJQKvoxKzAziu'; // Replace with your Cohere API key

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = async () => {
    if (!input) return;

    const newChatLog = [...chatLog, { user: 'user', message: input }];
    setChatLog(newChatLog);
    setLoading(true);

    try {
      const response = await axios.post(
        'https://api.cohere.ai/v1/generate', // Cohere's generation endpoint
        {
          model: 'command-xlarge-nightly', // Cohere’s conversational model
          prompt: `User: ${input}\nBot:`, // Corrected the prompt formatting
          max_tokens: 500, // Adjust token limit as needed
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cohereApiKey}`, // Corrected header formatting
          },
        }
      );
      const botMessage = response.data.generations[0].text.trim();
      setChatLog([...newChatLog, { user: 'bot', message: botMessage }]);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setChatLog([...newChatLog, { user: 'bot', message: 'Server is busy, please try again later.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.chatbotContainer}>
      <div className={styles.chatLog}>
        {chatLog.map((entry, index) => (
          <div
            key={index}
            className={`${styles.message} ${entry.user === 'bot' ? styles.botMessage : styles.userMessage}`}
          >
            <strong>{entry.user === 'bot' ? 'Bot' : 'You'}: </strong>{entry.message}
          </div>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask me a recipe question..."
          className={styles.chatInput}
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className={styles.sendButton}
        >
          {loading ? 'Loading...' : 'Send'}
        </button>
      </div>

      {/* Floating action button */}
      <div className={styles.floatingButton} onClick={() => alert('You clicked the floating button!')}>
        💬
      </div>
    </div>
  );
};

export default RecipeChatbot;
