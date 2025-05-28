import React, { useState } from 'react';
import './AITodo.css';

const AITodo = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5001/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      setChatHistory([...chatHistory, 
        { type: 'user', content: message },
        { type: 'assistant', content: data.response }
      ]);
      setMessage('');
    } catch (error) {
      console.error('Error:', error);
      setChatHistory([...chatHistory, 
        { type: 'user', content: message },
        { type: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }
      ]);
    }
    setIsLoading(false);
  };

  return (
    <div className="ai-todo-container">
      <div className="ai-header">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/2103/2103633.png" 
          alt="AI Logo" 
          className="ai-logo"
        />
        <h1>AI Todo Assistant</h1>
      </div>

      <div className="chat-container">
        <div className="chat-history">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.type}`}>
              {msg.content}
            </div>
          ))}
          {isLoading && <div className="loading">AI is thinking...</div>}
        </div>

        <form onSubmit={handleSubmit} className="chat-input-form">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask me to create, update, or delete a todo..."
            className="chat-input"
          />
          <button type="submit" className="send-button">
            Send
          </button>
        </form>
      </div>

      <div className="examples-section">
        <h2>Example Commands</h2>
        <div className="examples-grid">
          <div className="example-card">
            <h3>Create Todo</h3>
            <p>"Create a todo to buy groceries"</p>
            <p>"Add a task to call mom tomorrow"</p>
            <p>"New todo: Schedule dentist appointment"</p>
          </div>
          
          <div className="example-card">
            <h3>Update Todo</h3>
            <p>"Mark the grocery shopping as complete"</p>
            <p>"Update the dentist appointment to next week"</p>
            <p>"Change the priority of the mom call task"</p>
          </div>
          
          <div className="example-card">
            <h3>Delete Todo</h3>
            <p>"Remove the grocery shopping task"</p>
            <p>"Delete the dentist appointment"</p>
            <p>"Clear the mom call task"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AITodo; 