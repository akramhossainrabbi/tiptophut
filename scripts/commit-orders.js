const { execSync } = require('child_process');
const path = require('path');

try {
  const projectPath = path.resolve(__dirname, '..');
  process.chdir(projectPath);

  console.log('Staging changes...');
  execSync('git add -A', { stdio: 'inherit' });

  console.log('Committing changes...');
  execSync(`git commit -m "feat: Add order list functionality with pagination and filtering

- Create useOrders hook for fetching order list with caching (10-minute cache)
- Implement OrderList component with status filtering (pending, processing, completed, cancelled)
- Add pagination support with page navigation
- Display order details in responsive table format with status badges
- Add ORDERS cache key and expiry configuration to constants
- Integrate OrderList tab into ProfilePage
- Include View button for future order details feature

Implements GET /version3/order-list API endpoint"`, { stdio: 'inherit' });

  console.log('\nChanges committed successfully!');
} catch (error) {
  console.error('Error during commit:', error.message);
  process.exit(1);
}
