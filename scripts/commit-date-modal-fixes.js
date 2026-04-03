const { execSync } = require('child_process');

try {
  console.log('Staging changes...');
  execSync('git add -A', { cwd: '/vercel/share/v0-project', stdio: 'inherit' });

  console.log('Committing changes...');
  execSync(`git commit -m "fix: Correct date format and modal close functionality

- Change date format from locale to DD/MM/YYYY in OrderList and OrderDetailsModal
- Fix modal backdrop click to properly close the modal
- Add proper event handling for modal close button and backdrop
- Improve modal accessibility with proper role and tabIndex attributes"`, { cwd: '/vercel/share/v0-project', stdio: 'inherit' });

  console.log('Pushing changes...');
  execSync('git push origin HEAD', { cwd: '/vercel/share/v0-project', stdio: 'inherit' });

  console.log('Success! Changes committed and pushed.');
} catch (error) {
  console.error('Error during commit:', error.message);
  process.exit(1);
}
