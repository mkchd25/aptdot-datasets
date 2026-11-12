// Validates every dataset in data/v1 against its JSON Schema (Draft 2020-12).
// Run: npm test
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const dir = join(dirname(fileURLToPath(import.meta.url)), '..', 'data', 'v1');
const files = readdirSync(dir).filter((f) => f.endsWith('.json')).sort();
const schemas = files.filter((f) => f.endsWith('.schema.json'));
let failed = 0;

const read = (f) => JSON.parse(readFileSync(join(dir, f), 'utf8'));

for (const schemaFile of schemas) {
  const dataFile = schemaFile.replace('.schema.json', '.json');
  if (!files.includes(dataFile)) {
    console.log(`FAIL ${dataFile}: file is missing`);
    failed++;
    continue;
  }
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  addFormats(ajv);
  const validate = ajv.compile(read(schemaFile));
  const data = read(dataFile);
  if (validate(data)) {
    console.log(`ok   ${dataFile}`);
  } else {
    failed++;
    console.log(`FAIL ${dataFile}`);
    for (const e of validate.errors.slice(0, 10)) console.log(`     ${e.instancePath || '/'} ${e.message}`);
  }
}

// Files without a schema must still be valid JSON.
for (const f of files.filter((f) => !f.endsWith('.schema.json') && !schemas.includes(f.replace('.json', '.schema.json')))) {
  try { read(f); console.log(`ok   ${f} (valid JSON)`); } catch (e) { failed++; console.log(`FAIL ${f}: ${e.message}`); }
}

console.log(failed ? `\n${failed} file(s) failed` : `\nAll ${files.length} files passed`);
process.exit(failed ? 1 : 0);
