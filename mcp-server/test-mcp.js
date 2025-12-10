#!/usr/bin/env node

/**
 * Simple test script for the MCP server
 * This script tests the MCP server by sending JSON-RPC requests via STDIO
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SERVER_PATH = join(__dirname, 'dist', 'index.js');

// Test cases
const tests = [
  {
    name: 'List Tools',
    request: {
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/list',
      params: {},
    },
  },
  {
    name: 'Get All Todos',
    request: {
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/call',
      params: {
        name: 'get_all_todos',
        arguments: {},
      },
    },
  },
  {
    name: 'Create Todo',
    request: {
      jsonrpc: '2.0',
      id: 3,
      method: 'tools/call',
      params: {
        name: 'create_todo',
        arguments: {
          title: 'Test Todo from MCP',
          description: 'This is a test todo created via MCP server',
          isCompleted: false,
        },
      },
    },
  },
];

function sendRequest(server, request) {
  return new Promise((resolve, reject) => {
    let responseData = '';
    let errorData = '';

    const timeout = setTimeout(() => {
      server.kill();
      reject(new Error('Request timeout'));
    }, 10000);

    const onData = (data) => {
      responseData += data.toString();
      // Try to parse complete JSON-RPC response
      const lines = responseData.split('\n').filter((line) => line.trim());
      for (const line of lines) {
        try {
          const response = JSON.parse(line);
          if (response.id === request.id) {
            clearTimeout(timeout);
            server.stdout.removeListener('data', onData);
            server.stderr.removeListener('data', onError);
            resolve(response);
            return;
          }
        } catch (e) {
          // Not a complete JSON yet, continue
        }
      }
    };

    const onError = (data) => {
      errorData += data.toString();
    };

    server.stdout.on('data', onData);
    server.stderr.on('data', onError);

    // Send request
    server.stdin.write(JSON.stringify(request) + '\n');

    // Wait a bit for response
    setTimeout(() => {
      if (responseData) {
        try {
          const lines = responseData.split('\n').filter((line) => line.trim());
          for (const line of lines) {
            try {
              const response = JSON.parse(line);
              if (response.id === request.id) {
                clearTimeout(timeout);
                server.stdout.removeListener('data', onData);
                server.stderr.removeListener('data', onError);
                resolve(response);
                return;
              }
            } catch (e) {
              // Continue
            }
          }
        } catch (e) {
          // Continue
        }
      }
    }, 2000);
  });
}

async function runTests() {
  console.log('🧪 Testing MCP Server\n');
  console.log('=' .repeat(50));

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

  server.stderr.on('data', (data) => {
    // Log server logs to stderr (they're informational)
    process.stderr.write(data);
  });

  // Wait a bit for server to initialize
  await new Promise((resolve) => setTimeout(resolve, 500));

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      console.log(`\n📋 Test: ${test.name}`);
      const response = await sendRequest(server, test.request);

      if (response.error) {
        console.error(`❌ Failed: ${response.error.message || JSON.stringify(response.error)}`);
        failed++;
      } else {
        console.log(`✅ Passed`);
        console.log(`   Response:`, JSON.stringify(response.result, null, 2).substring(0, 200));
        passed++;
      }
    } catch (error) {
      console.error(`❌ Error: ${error.message}`);
      failed++;
    }
  }

  // Cleanup
  server.kill();
  await new Promise((resolve) => setTimeout(resolve, 500));

  console.log('\n' + '='.repeat(50));
  console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

// Handle errors
process.on('SIGINT', () => {
  console.log('\n\n⚠️  Tests interrupted');
  process.exit(1);
});

runTests().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
