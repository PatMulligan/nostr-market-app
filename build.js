const fs = require('fs');
const { execSync } = require('child_process');

// Function to parse the .env file
function parseEnvFile(filePath) {
  const env = {};
  if (fs.existsSync(filePath)) {
    const envFileContent = fs.readFileSync(filePath, 'utf-8');

    envFileContent.split('\n').forEach((line) => {
      // Remove comments and whitespace
      line = line.trim();
      if (line && !line.startsWith('#')) {
        const [key, ...rest] = line.split('=');
        if (key && rest.length > 0) {
          const value = rest.join('=').trim();
          env[key.trim()] = value;
        }
      }
    });
  }
  return env;
}

// Load environment variables from .env file
const envVars = parseEnvFile('src/.env');

// Set the environment variables for the current process
Object.assign(process.env, envVars);

console.log(envVars)
// Now run the Quasar build command
try {
  execSync('quasar build', { stdio: 'inherit' });
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
