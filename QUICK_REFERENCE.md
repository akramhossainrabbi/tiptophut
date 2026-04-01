# Quick Reference - Profile & Address APIs

## Routes

| Route | Component | Auth Required | Purpose |
|-------|-----------|---|---------|
| `/profile` | ProfilePage | Yes | User profile management (tabbed interface) |
| `/forgot-password` | ForgotPassword | No | Password reset request |
| `/login` | Account | No | Login (updated with forgot password link) |

## Hooks

### useProfile Hook
```javascript
import useProfile from '../hooks/useProfile';

const MyComponent = () => {
  const { loading, error, updateProfile, changePassword, forgotPassword } = useProfile();
  
  // Update profile
  const result = await updateProfile({ first_name: 'John', ... });
  
  // Change password
  const result = await changePassword({ old_password, password, password_confirmation });
  
  // Forgot password
  const result = await forgotPassword('user@example.com');
};
```

### useAddresses Hook
```javascript
import useAddresses from '../hooks/useAddresses';

const MyComponent = () => {
  const { 
    addresses, loading, error,
    createAddress, updateAddress, deleteAddress,
    setDefaultShippingAddress, setDefaultBillingAddress
  } = useAddresses();
  
  // All CRUD operations
  const result = await createAddress(formData);
  const result = await updateAddress(id, formData);
  const result = await deleteAddress(id);
  const result = await setDefaultShippingAddress(id);
};
```

## Components

### UpdateProfile
- **File:** `src/components/Profile/UpdateProfile.jsx`
- **Props:** None (uses hooks internally)
- **Outputs:** Toast notifications, updates AuthContext on success

### ChangePassword
- **File:** `src/components/Profile/ChangePassword.jsx`
- **Props:** None
- **Validations:** Password length (8+), confirmation match

### AddressManagement
- **File:** `src/components/Profile/AddressManagement.jsx`
- **Props:** None
- **Features:** List, add, edit, delete, set defaults

### AddressForm
- **File:** `src/components/Profile/AddressForm.jsx`
- **Props:** `address`, `onSubmit`, `onCancel`, `loading`
- **Validations:** Required fields, email format

### ForgotPassword
- **File:** `src/components/Auth/ForgotPassword.jsx`
- **Props:** None (standalone component)
- **Flow:** Email → API call → Success confirmation

## API Endpoints

### Profile APIs
```
POST   /profile/update-information    Update user profile
POST   /change-password               Change password
POST   /forgot-password               Request password reset
```

### Address APIs
```
GET    /profile/address-list                    Get all addresses
POST   /profile/address-store                   Create address
POST   /profile/address-update/{id}             Update address
POST   /profile/address-delete                  Delete address
POST   /profile/default-shipping-address        Set default shipping
POST   /profile/default-billing-address         Set default billing
```

## Error Handling Pattern

```javascript
// All API calls return this pattern
{
  success: boolean,
  data?: object,           // On success
  error?: {                // On failure
    message: string,
    errors?: {             // Validation errors
      field_name: [string]
    }
  }
}

// Usage
const result = await updateProfile(data);
if (result.success) {
  toast.success('Success!');
  updateUser(result.data);
} else {
  toast.error(result.error.message);
  // Handle field errors if present
}
```

## Cache Keys

```javascript
// From constants.js
CACHE_KEYS.ADDRESSES = 'addresses-cache-v1'
CACHE_EXPIRY.ADDRESSES = 5 * 60 * 1000  // 5 minutes

// Auto-invalidated on:
// - createAddress()
// - updateAddress()
// - deleteAddress()
// - setDefaultShippingAddress()
// - setDefaultBillingAddress()
```

## AuthContext Updates

```javascript
const { user, updateUser } = useAuth();

// After profile update
updateUser({
  ...user,
  first_name: 'New First Name',
  email: 'newemail@example.com'
  // Updates both state and localStorage
});
```

## Form Field Validation

### UpdateProfile
- `first_name` *required
- `last_name` *required
- `email` *required, must be valid email
- `phone` optional
- `date_of_birth` optional (date format)
- `description` optional

### ChangePassword
- `old_password` *required
- `password` *required, minimum 8 characters
- `password_confirmation` *required, must match password

### AddressForm
- `first_name` *required
- `last_name` *required
- `email` *required, valid email format
- `address` *required
- `phone` *required
- `city` *required
- `state` optional
- `country` *required
- `postal_code` *required
- `is_default_shipping` boolean (optional)
- `is_default_billing` boolean (optional)

## Common Patterns

### Using in a Component
```javascript
import { useAuth } from '../context/AuthContext';
import useProfile from '../hooks/useProfile';
import { toast } from 'react-toastify';

export default function MyComponent() {
  const { user, updateUser } = useAuth();
  const { loading, updateProfile } = useProfile();
  const [formData, setFormData] = useState({...});
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateProfile(formData);
    if (result.success) {
      updateUser({ ...user, ...formData });
      toast.success('Updated!');
    } else {
      toast.error('Failed to update');
    }
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Protected Route Check
```javascript
// In ProfilePage or any protected component
const { user } = useAuth();
const navigate = useNavigate();

if (!user) {
  navigate('/login');
  return null;
}
```

## Debugging

### Check API Responses
1. Open DevTools → Network tab
2. Filter by endpoint (e.g., "profile", "address")
3. Check response body for errors

### Check Cache
1. Open DevTools → Application tab → LocalStorage
2. Find key `addresses-cache-v1`
3. Check timestamp and data

### Check State
1. Install React DevTools
2. Select component using the hook
3. Expand hook state to see current values

## Loading States

All components show loading states:
```javascript
<button disabled={loading}>
  {loading ? 'Processing...' : 'Submit'}
</button>
```

## Toast Notifications

Used from `react-toastify`:
```javascript
import { toast } from 'react-toastify';

toast.success('Action successful!');
toast.error('Something went wrong');
toast.info('Information message');
toast.warning('Warning message');
```

## CSS Classes Used

- `common-input` - Standard input styling
- `btn btn-main` - Primary button
- `btn btn-outline-secondary` - Secondary button
- `btn btn-link` - Link button
- `text-danger` - Error text color
- `alert alert-danger` - Error alert
- `badge bg-success` - Success badge
- `badge bg-info` - Info badge

## Response Status Codes

| Code | Meaning | Handled By |
|------|---------|-----------|
| 200-299 | Success | Hook returns `{success: true}` |
| 401 | Unauthorized (token expired) | Check and redirect to login |
| 404 | Not found | Error message displayed |
| 409 | Conflict (e.g., invalid credentials) | Validation error in response |
| 422 | Validation error | Field errors in response |
| 5xx | Server error | Generic error message |

## Tips & Tricks

1. **Clear password fields after success:**
   ```javascript
   if (result.success) {
     setFormData({ old_password: '', password: '', password_confirmation: '' });
   }
   ```

2. **Prevent duplicate form submissions:**
   - Button is disabled during `loading` state
   - Form validation runs before API call

3. **Cache invalidation:**
   - Automatic after mutations
   - Can manually invalidate if needed

4. **Scroll to error:**
   - Use `scrollIntoView()` on error field
   - Or show toast notification

5. **Form prefill from user data:**
   ```javascript
   useEffect(() => {
     if (user) {
       setFormData({
         first_name: user.first_name,
         // ...
       });
     }
   }, [user]);
   ```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| API returns 401 | Token expired, user needs to login again |
| Addresses not updating | Check localStorage cache, verify network request |
| Form validation not showing | Ensure server returns validation in response |
| Button stays disabled | Check loading state, clear cache and retry |
| Password change fails | Verify current password is correct |

## Branch & PR Information

- **Repository:** akramhossainrabbi/tiptophut
- **Branch:** api-endpoint-development
- **Commit:** a216319
- **PR:** https://github.com/akramhossainrabbi/tiptophut/pull/new/v0/ahrabbi121-7460-78f7ed3c
