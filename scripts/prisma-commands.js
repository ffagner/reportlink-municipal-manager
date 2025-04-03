
const { exec } = require('child_process');
const path = require('path');

const commands = {
  generate: 'npx prisma generate',
  migrate: 'npx prisma migrate dev --name init',
  seed: 'npx prisma db seed',
  studio: 'npx prisma studio',
};

const command = process.argv[2];

if (!command || !commands[command]) {
  console.error('Please provide a valid command: generate, migrate, seed, or studio');
  process.exit(1);
}

console.log(`Running: ${commands[command]}`);

exec(commands[command], (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
