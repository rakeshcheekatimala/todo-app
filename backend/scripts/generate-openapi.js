const fs = require('fs');
const path = require('path');

// Generates OpenAPI 3.0 JSON from swagger-jsdoc config in src/swagger.js
const spec = require('../src/swagger');

const outputPath =
  process.env.OPENAPI_OUTPUT ||
  // Default: write to repo root so other tools can pick it up easily
  path.resolve(__dirname, '../../openapi.json');

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(spec, null, 2), 'utf8');

console.log(`OpenAPI spec written to: ${outputPath}`);
