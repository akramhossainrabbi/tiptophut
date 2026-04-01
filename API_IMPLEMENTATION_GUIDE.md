# API Implementation Guide - Profile & Authentication APIs

## Overview

This document describes the implementation of 8 profile-related APIs for the TipTopHut e-commerce application. The implementation follows the project's existing patterns using custom React hooks, context API, and localStorage caching.

## Implemented APIs

### 1. Profile Management
- **Update Profile Information** - `POST /profile/update-information`
- **Change Password** - `POST /change-password`
- **Forgot Password** - `POST /forgot-password`

### 2. Address Management
- **Get Address List** - `GET /profile/address-list`
- **Create Address** - `POST /profile/address-store`
- **Update Address** - `POST /profile/address-update/{id}`
- **Delete Address** - `POST /profile/address-delete`
- **Set Default Shipping Address** - `POST /profile/default-shipping-address`
- **Set Default Billing Address** - `POST /profile/default-billing-address`

## Architecture & Patterns

### Custom Hooks (State Management)
The implementation uses custom React hooks instead of context API for feature-specific state management, following the project's existing pattern:

#### `useProfile.js` Hook
Handles profile-related API operations:
- `updateProfile(data)` - Updates user profile information
- `changePassword(data)` - Changes user password with validation
- `forgotPassword(email)` - Initiates password reset process

Returns: `{ loading, error, updateProfile, changePassword, forgotPassword }`

#### `useAddresses.js` Hook
Handles address management with localStorage caching:
- `fetchAddresses()` - Auto-fetches addresses on component mount
- `createAddress(data)` - Creates new address
- `updateAddress(id, data)` - Updates existing address
- `deleteAddress(id)` - Deletes address
- `setDefaultShippingAddress(id)` - Sets default shipping address
- `setDefaultBillingAddress(id)` - Sets default billing address

Returns: `{ addresses, loading, error, setAddresses, createAddress, updateAddress, deleteAddress, setDefaultShipping, setDefaultBilling }`

**Cache Configuration:**
- Cache Key: `addresses-cache-v1`
- Cache Expiry: 5 minutes (addresses change frequently)
- Auto-invalidation on mutations

### Context Updates
Updated `AuthContext` with `updateUser(userData)` method to sync profile changes:
```javascript
const { user, updateUser } = useAuth();
updateUser({ ...user, ...newData }); // Updates both state and localStorage
```

### Components

#### Profile Page (`/profile`)
Tabbed interface for authenticated users:
- **My Profile** - Update profile information (UpdateProfile component)
- **Addresses** - Manage addresses (AddressManagement component)
- **Change Password** - Change password (ChangePassword component)

#### UpdateProfile Component
- Form for: first_name, last_name, email, phone, date_of_birth, description
- Real-time form state management
- Toast notifications for success/error
- Updates AuthContext on success

#### ChangePassword Component
- Validates password length (minimum 8 characters)
- Validates password confirmation match
- Clears form after successful submission
- Client-side and server-side error handling

#### AddressManagement Component
- Displays list of user addresses with default badges
- Add/Edit/Delete functionality
- Quick actions to set default shipping/billing addresses
- Form modal/dedicated view for create/update operations

#### AddressForm Component (Reusable)
- Create and update form for addresses
- Fields: first_name, last_name, email, address, phone, city, state, country, postal_code
- Checkboxes for default shipping/billing
- Client-side validation
- Error display per field

#### ForgotPassword Component
- Simple email input form
- Works as standalone page or modal
- Sends reset link to user email
- Success confirmation message
- Link back to login

### Routes

**New Routes Added:**
- `/profile` - Profile management page (protected route)
- `/forgot-password` - Password reset page (public route)

**Updated Routes:**
- `/login` - Added "Forgot Password?" link

### Styling & UX

- Uses existing Bootstrap classes (common-input, btn btn-main, etc.)
- Consistent with project's existing design system
- Responsive layout (mobile-friendly)
- Toast notifications for user feedback
- Loading states on buttons during API calls
- Form validation with error messages
- Confirmation dialogs for destructive actions

## Error Handling

All API calls implement standardized error handling:
- HTTP status checks (401, 404, 409, 422, etc.)
- Parsed error messages from API responses
- Field-level validation errors display
- User-friendly toast notifications
- Loading states prevent duplicate submissions

## Security Features

- Bearer token authentication in all protected API calls
- Token retrieved from localStorage (set by AuthContext)
- Sensitive data (passwords) cleared after use
- CSRF protection through API tokens
- Input validation on client and server

## Cache Management

**Addresses Caching:**
- Cached in localStorage with timestamp
- 5-minute expiry (configurable via CACHE_EXPIRY)
- Auto-invalidation after mutations
- Manual invalidation available via `invalidateCache()`

**Constants:**
Updated `src/utils/constants.js` with:
```javascript
CACHE_KEYS.ADDRESSES = 'addresses-cache-v1'
CACHE_EXPIRY.ADDRESSES = 5 * 60 * 1000 // 5 minutes
```

## File Structure

```
src/
├── hooks/
│   ├── useProfile.js (NEW) - Profile API operations
│   └── useAddresses.js (NEW) - Address API operations & caching
├── pages/
│   └── ProfilePage.jsx (NEW) - Main profile management page
├── components/
│   ├── Profile/ (NEW)
│   │   ├── UpdateProfile.jsx - Profile update form
│   │   ├── ChangePassword.jsx - Password change form
│   │   ├── AddressManagement.jsx - Address list & management
│   │   ├── AddressForm.jsx - Reusable address form
│   │   └── index.jsx - Component exports
│   └── Auth/
│       ├── ForgotPassword.jsx (NEW) - Password reset form
│       └── Login.jsx (UPDATED) - Added forgot password link
├── context/
│   └── AuthContext.jsx (UPDATED) - Added updateUser method
├── utils/
│   └── constants.js (UPDATED) - Added address cache keys/expiry
└── App.js (UPDATED) - Added profile & forgot-password routes
```

## Usage Examples

### Using useProfile Hook
```javascript
import useProfile from '../hooks/useProfile';

export default function MyComponent() {
  const { loading, error, updateProfile, changePassword } = useProfile();
  
  const handleUpdate = async (formData) => {
    const result = await updateProfile(formData);
    if (result.success) {
      console.log('Profile updated:', result.data);
    } else {
      console.log('Error:', result.error);
    }
  };
}
```

### Using useAddresses Hook
```javascript
import useAddresses from '../hooks/useAddresses';

export default function AddressList() {
  const { addresses, loading, createAddress, setDefaultShippingAddress } = useAddresses();
  
  const handleAdd = async (formData) => {
    const result = await createAddress(formData);
    if (result.success) {
      // Addresses list automatically updated
    }
  };
}
```

### Updating User Profile in AuthContext
```javascript
const { user, updateUser } = useAuth();

// After API call
updateUser({
  ...user,
  first_name: 'John',
  last_name: 'Doe',
  email: 'john@example.com'
});
```

## Testing Checklist

- [ ] Login as a user
- [ ] Navigate to `/profile` route
- [ ] Test updating profile information
- [ ] Test changing password
- [ ] Test adding new address
- [ ] Test editing existing address
- [ ] Test deleting address
- [ ] Test setting default shipping address
- [ ] Test setting default billing address
- [ ] Test forgot password flow
- [ ] Verify cache invalidation on mutations
- [ ] Test error scenarios (validation, 409, 422, etc.)
- [ ] Verify responsive design on mobile

## Future Enhancements

- Add address form modal instead of separate page
- Implement bulk address operations
- Add address type (home, office, etc.)
- Implement two-factor authentication for password changes
- Add profile picture/avatar upload
- Implement address auto-complete
- Add activity log for profile changes

## Notes

- All APIs require Bearer token authentication (protected routes)
- ForgotPassword API is public (no authentication required)
- Addresses cache expires after 5 minutes of inactivity
- Toast notifications use react-toastify (already in project)
- All components use Bootstrap styling from the project
