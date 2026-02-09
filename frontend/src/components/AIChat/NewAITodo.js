import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiCpu, FiUser } from 'react-icons/fi';
import { Layout } from '../Layout';
import { Heading, Text, Caption } from '../Typography';
import { Input, Button } from '../Input';
import { useToast } from '../../context/ToastContext';

const NewAITodo = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = message;
    setMessage('');
    setIsLoading(true);

    // Add user message to chat
    setChatHistory(prev => [...prev, { type: 'user', content: userMessage }]);

    try {
      const response = await fetch('http://localhost:5001/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMessage }),
      });

      const data = await response.json();
      setChatHistory(prev => [...prev, { type: 'assistant', content: data }]);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to get response from AI assistant');
      setChatHistory(prev => [...prev, { 
        type: 'assistant', 
        content: { message: 'Sorry, I encountered an error. Please try again.' }
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatResponse = (content) => {
    if (Array.isArray(content)) {
      return (
        <div style={styles.taskList}>
          {content.map((task) => (
            <div key={task._id} style={styles.taskItem}>
              <div style={styles.taskHeader}>
                <span style={styles.taskStatus}>
                  {task.isCompleted ? '✓' : '○'}
                </span>
                <Text weight="semibold" style={{ color: 'inherit' }}>
                  {task.title}
                </Text>
              </div>
              <Text size="sm" color="secondary" style={{ color: 'inherit', opacity: 0.8 }}>
                {task.description}
              </Text>
              <Caption style={{ color: 'inherit', opacity: 0.6 }}>
                {new Date(task.createdAt).toLocaleDateString()}
              </Caption>
            </div>
          ))}
        </div>
      );
    }

    if (content._id) {
      return (
        <div style={styles.taskItem}>
          <div style={styles.taskHeader}>
            <span style={styles.taskStatus}>
              {content.isCompleted ? '✓' : '○'}
            </span>
            <Text weight="semibold" style={{ color: 'inherit' }}>
              {content.title}
            </Text>
          </div>
          <Text size="sm" style={{ color: 'inherit', opacity: 0.8 }}>
            {content.description}
          </Text>
        </div>
      );
    }

    if (content.message) {
      return <Text style={{ color: 'inherit' }}>{content.message}</Text>;
    }

    return <Text style={{ color: 'inherit' }}>{String(content)}</Text>;
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 80px - 4rem)',
      maxHeight: '800px',
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem',
    },
    chatContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'var(--bg-secondary)',
      borderRadius: '16px',
      border: '1px solid var(--border-light)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-md)',
    },
    messagesContainer: {
      flex: 1,
      overflowY: 'auto',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    message: {
      maxWidth: '70%',
      padding: '1rem 1.25rem',
      borderRadius: '16px',
      wordBreak: 'break-word',
    },
    userMessage: {
      alignSelf: 'flex-end',
      backgroundColor: 'var(--interactive-primary)',
      color: 'white',
      borderBottomRightRadius: '4px',
    },
    assistantMessage: {
      alignSelf: 'flex-start',
      backgroundColor: 'var(--bg-tertiary)',
      color: 'var(--text-primary)',
      borderBottomLeftRadius: '4px',
    },
    messageHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '0.5rem',
    },
    inputContainer: {
      padding: '1.5rem',
      borderTop: '1px solid var(--border-light)',
      backgroundColor: 'var(--bg-primary)',
    },
    form: {
      display: 'flex',
      gap: '0.75rem',
      alignItems: 'flex-end',
    },
    input: {
      flex: 1,
    },
    taskList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      marginTop: '0.5rem',
    },
    taskItem: {
      padding: '0.75rem',
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem',
    },
    taskHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
    },
    taskStatus: {
      fontSize: '1.2em',
    },
    loadingDots: {
      display: 'flex',
      gap: '0.25rem',
      padding: '1rem',
    },
    dot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: 'var(--text-tertiary)',
    },
    examplesSection: {
      marginTop: '2rem',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1rem',
    },
    exampleCard: {
      padding: '1rem',
      backgroundColor: 'var(--bg-secondary)',
      borderRadius: '12px',
      border: '1px solid var(--border-light)',
      cursor: 'pointer',
      transition: 'all 200ms ease',
    },
  };

  const examples = [
    { title: 'Create', query: 'Create a todo to buy groceries' },
    { title: 'List', query: 'Show me all my todos' },
    { title: 'Update', query: 'Mark my first todo as complete' },
    { title: 'Delete', query: 'Delete completed todos' },
  ];

  return (
    <Layout maxWidth="900px">
      <div style={styles.header}>
        <Heading level={1} animate>
          AI Todo Assistant
        </Heading>
        <Text color="secondary">
          Chat with AI to manage your todos naturally
        </Text>
      </div>

      <div style={styles.container}>
        <div style={styles.chatContainer}>
          <div style={styles.messagesContainer}>
            {chatHistory.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', padding: '2rem' }}
              >
                <FiCpu size={48} style={{ color: 'var(--interactive-primary)', marginBottom: '1rem' }} />
                <Heading level={3}>How can I help you today?</Heading>
                <Text color="secondary">
                  Ask me to create, update, or manage your todos
                </Text>
              </motion.div>
            )}

            <AnimatePresence>
              {chatHistory.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    ...styles.message,
                    ...(msg.type === 'user' ? styles.userMessage : styles.assistantMessage),
                  }}
                >
                  <div style={styles.messageHeader}>
                    {msg.type === 'user' ? <FiUser size={16} /> : <FiCpu size={16} />}
                    <Caption style={{ color: 'inherit', fontWeight: 600 }}>
                      {msg.type === 'user' ? 'You' : 'AI Assistant'}
                    </Caption>
                  </div>
                  {msg.type === 'user' ? (
                    <Text style={{ color: 'inherit' }}>{msg.content}</Text>
                  ) : (
                    formatResponse(msg.content)
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  ...styles.message,
                  ...styles.assistantMessage,
                }}
              >
                <div style={styles.messageHeader}>
                  <FiCpu size={16} />
                  <Caption style={{ color: 'inherit', fontWeight: 600 }}>
                    AI Assistant
                  </Caption>
                </div>
                <div style={styles.loadingDots}>
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      style={styles.dot}
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <div style={styles.inputContainer}>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.input}>
                <Input
                  label="Type your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g., Create a todo to buy milk"
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                icon={<FiSend size={18} />}
                disabled={!message.trim() || isLoading}
                loading={isLoading}
              >
                Send
              </Button>
            </form>
          </div>
        </div>

        {chatHistory.length === 0 && (
          <div style={styles.examplesSection}>
            {examples.map((ex, idx) => (
              <motion.div
                key={idx}
                style={styles.exampleCard}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: 'var(--shadow-md)',
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setMessage(ex.query)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Text weight="semibold" style={{ marginBottom: '0.5rem' }}>
                  {ex.title}
                </Text>
                <Caption>{ex.query}</Caption>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default NewAITodo;
