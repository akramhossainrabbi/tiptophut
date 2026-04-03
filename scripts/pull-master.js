import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

try {
  console.log('Fetching origin master...');
  execSync('git fetch origin master', { cwd: projectRoot, stdio: 'inherit' });
  
  console.log('Merging origin/master...');
  execSync('git merge origin/master', { cwd: projectRoot, stdio: 'inherit' });
  
  console.log('Master branch pulled successfully');
} catch (error) {
  console.error('Error pulling master:', error.message);
  process.exit(1);
}
