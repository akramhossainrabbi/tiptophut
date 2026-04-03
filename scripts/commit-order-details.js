const { execSync } = require('child_process');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
process.chdir(projectRoot);

try {
  console.log('[v0] Adding files to git...');
  execSync('git add -A', { stdio: 'inherit' });

  console.log('[v0] Committing changes...');
  execSync('git commit -m "feat: Add order details modal with product list\n\n- Create OrderDetailsModal component to display products with qty and prices\n- Fix OrderList component field mappings (order_status, grand_total, number_of_item)\n- Add order status label mapping (0=Pending, 1=Processing, 2=Completed, 3=Cancelled)\n- Implement modal popup with product thumbnails and order summary\n- Fix items count display to show actual number_of_item from API\n- Add OrderDetailsModal to Profile components index"', { stdio: 'inherit' });

  console.log('[v0] Pushing changes...');
  execSync('git push origin HEAD', { stdio: 'inherit' });

  console.log('[v0] Commit successful!');
} catch (error) {
  console.error('[v0] Error:', error.message);
  process.exit(1);
}
