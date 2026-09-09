const { writeFileSync, mkdirSync } = require('fs');

require('dotenv').config();

const ENVIRONMENTS_PATH = './src/environments';
const targetPath = `${ENVIRONMENTS_PATH}/environment.ts`;
const targetPathDev = `${ENVIRONMENTS_PATH}/environment.development.ts`;

const mapboxKey = process.env['MAPBOX_KEY'];

if (!mapboxKey) {
  throw new Error('MAPBOX_KEY is not set');
}

const envFileContent = `
export const environment = {
  mapboxKey: "${ mapboxKey }"
};
`;

mkdirSync(ENVIRONMENTS_PATH, { recursive: true });

writeFileSync(targetPath, envFileContent);
writeFileSync(targetPathDev, envFileContent);
