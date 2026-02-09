#!/usr/bin/env node

/**
 * Quick test script for get_all_todos tool
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SERVER_PATH = join(__dirname, 'dist', 'index.js');

// Check if server is built
try {
  readFileSync(SERVER_PATH);
} catch (error) {
  console.error('❌ Error: Server not built. Run "npm run build" first.');
  process.exit(1);
}

// Start server
const server = spawn('node', [SERVER_PATH], {
  cwd: __dirname,
  stdio: ['pipe', 'pipe', 'pipe'],
  env: {
    ...process.env,
    TODO_API_URL: process.env.TODO_API_URL || 'http://localhost:4300',
  },
});

// Log server messages
server.stderr.on('data', (data) => {
  process.stderr.write(data);
});

let responseData = '';

server.stdout.on('data', (data) => {
  responseData += data.toString();
  const lines = responseData.split('\n').filter((line) => line.trim());
  
  for (const line of lines) {
    try {
      const response = JSON.parse(line);
      if (response.id === 1) {
        console.log('\n✅ Response from get_all_todos:\n');
        if (response.result && response.result.content) {
          const todos = JSON.parse(response.result.content[0].text);
          console.log(`Found ${todos.length} todos:\n`);
          todos.forEach((todo, index) => {
            console.log(`${index + 1}. [${todo.isCompleted ? '✓' : '○'}] ${todo.title}`);
            console.log(`   ID: ${todo._id}`);
            console.log(`   Description: ${todo.description}`);
            console.log(`   Created: ${new Date(todo.createdAt).toLocaleString()}`);
            console.log('');
          });
        } else if (response.error) {
          console.error('❌ Error:', response.error);
        }
        server.kill();
        process.exit(0);
      }
    } catch (e) {
      // Not JSON yet, continue
    }
  }
});

// Wait for server to initialize
setTimeout(() => {
  // Send initialize request
  const initRequest = {
    jsonrpc: '2.0',
    id: 0,
    method: 'initialize',
    params: {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: {
        name: 'test-client',
        version: '1.0.0',
      },
    },
  };
  
  server.stdin.write(JSON.stringify(initRequest) + '\n');
  
  // Send initialized notification
  setTimeout(() => {
    const initialized = {
      jsonrpc: '2.0',
      method: 'notifications/initialized',
    };
    server.stdin.write(JSON.stringify(initialized) + '\n');
    
    // Now send get_all_todos request
    setTimeout(() => {
      const request = {
        jsonrpc: '2.0',
        id: 1,
        method: 'tools/call',
        params: {
          name: 'get_all_todos',
          arguments: {},
        },
      };
      
      server.stdin.write(JSON.stringify(request) + '\n');
    }, 100);
  }, 100);
}, 500);

// Timeout
setTimeout(() => {
  console.error('❌ Request timeout');
  server.kill();
  process.exit(1);
}, 10000);



