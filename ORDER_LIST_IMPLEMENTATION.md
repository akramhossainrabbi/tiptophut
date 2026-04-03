# Order List API Implementation

## Overview
Implemented the Order List API functionality (`GET /version3/order-list`) to allow users to view and manage their orders in their profile.

## API Endpoint
- **Endpoint**: `GET /version3/order-list`
- **Authentication**: Required (Bearer Token)
- **Query Parameters**:
  - `page` (optional, default: 1): Page number for pagination
  - `status` (optional): Filter orders by status (pending, processing, completed, cancelled, etc.)

## Files Created

### 1. `src/hooks/useOrders.js`
Custom hook for managing order fetching, caching, and pagination.

**Features**:
- Fetches orders from the API with pagination support
- Caches orders in localStorage with 10-minute expiry
- Supports filtering by order status
- Handles loading and error states
- Provides pagination metadata (current_page, last_page, total)

**Usage**:
```javascript
const { orders, loading, error, pagination, fetchOrders } = useOrders();

// Fetch orders
fetchOrders(pageNumber, statusFilter);
```

### 2. `src/components/Profile/OrderList.jsx`
Component for displaying user's orders in a table format with filtering and pagination.

**Features**:
- Displays orders in a responsive table
- Status filtering (All, Pending, Processing, Completed, Cancelled)
- Pagination controls
- Order details: ID, Date, Status, Total, Payment Method, Tracking
- Status badges with color coding
- Loading and empty state handling
- Toast notifications for errors

**Status Colors**:
- Pending: Yellow (warning)
- Processing: Blue (info)
- Completed: Green (success)
- Cancelled: Red (danger)

## Files Modified

### 1. `src/utils/constants.js`
Added cache configuration for orders:
- `CACHE_KEYS.ORDERS: 'orders-cache-v1'`
- `CACHE_EXPIRY.ORDERS: 10 * 60 * 1000` (10 minutes)

### 2. `src/pages/ProfilePage.jsx`
- Imported `OrderList` component
- Added "My Orders" tab to the profile sidebar
- Added order list rendering when "orders" tab is active

### 3. `src/components/Profile/index.jsx`
- Exported `OrderList` component for easier imports

## Features

### Order Display
- Order ID with product count indicator
- Order date formatted as "MMM DD, YYYY"
- Status badge with semantic color coding
- Total amount with currency formatting
- Payment method display
- Tracking/reference information

### Filtering
- Filter orders by status (All, Pending, Processing, Completed, Cancelled)
- Active filter persists during pagination

### Pagination
- Previous/Next page buttons
- Current page indicator (e.g., "Page 1 of 5")
- Navigate to specific pages

### Error Handling
- Displays error toast on API failures
- Shows empty state when no orders exist
- Loading spinner while fetching orders

## API Response Format

Expected JSON response structure:
```json
{
  "orders": [
    {
      "id": 123,
      "order_number": "ORD-2024-001",
      "order_date": "2024-01-15",
      "status": "completed",
      "total": 299.99,
      "currency": "USD",
      "payment_method": "credit_card",
      "tracking_number": "TRACK123456",
      "items_count": 3
    }
  ],
  "pagination": {
    "current_page": 1,
    "per_page": 10,
    "total": 45,
    "last_page": 5
  }
}
```

## Integration with Profile Page

The Order List is now integrated as a new tab in the user profile page:
- Navigate to `/profile`
- Click on "My Orders" tab in the sidebar
- View, filter, and navigate through orders

## Caching Strategy

- Orders are cached in localStorage with a 10-minute expiry
- Cache keys include page number and status filter for granular caching
- Cache is automatically invalidated after expiry
- API call made if cache is not found or expired

## Error States

- **API Error**: Toast notification displays error message
- **No Orders**: Displays "No orders found" message
- **Loading**: Shows loading spinner while fetching

## Future Enhancements

Possible improvements:
- Order details view with line items and shipping info
- Order cancellation functionality
- Return/Exchange requests
- Download invoice as PDF
- Track shipment in real-time
- Re-order functionality

## Testing

To test the order list functionality:
1. Log in to your account
2. Navigate to Profile page (`/profile`)
3. Click on "My Orders" tab
4. Try filtering by different statuses
5. Navigate between pages
6. Verify order details display correctly

## Browser Console Debugging

Add these debug logs to check order data:
```javascript
console.log('[v0] Orders data:', orders);
console.log('[v0] Pagination:', pagination);
console.log('[v0] API Response:', response);
```
