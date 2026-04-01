# Bug Fixes Summary

## Issues Fixed

### 1. Address Form Field Names (Critical)
**Problem:** AddressForm was using `first_name` and `last_name` fields, but the API only accepts a single `name` field.

**Solution:**
- Updated `AddressForm.jsx` to use `name` field instead of `first_name`/`last_name`
- Modified form state initialization and validation to match API specification
- Changed form labels and structure to accommodate single name field

**Files Modified:**
- `/src/components/Profile/AddressForm.jsx`

### 2. Forgot Password Link Visibility
**Problem:** The "Forgot Password?" link in the Login form was not visible to users.

**Solution:**
- Repositioned the link next to the password label using flexbox layout
- Improved styling with semantic Bootstrap classes (`text-primary`, `text-decoration-none`)
- Made the link inline with the password field for better UX

**Files Modified:**
- `/src/components/Auth/Login.jsx`

### 3. Forgot Password Component Styling
**Problem:** Back-to-login links had inconsistent styling.

**Solution:**
- Updated ForgotPassword component link styling to use Bootstrap utility classes
- Applied semantic classes for consistent appearance with rest of application

**Files Modified:**
- `/src/components/Auth/ForgotPassword.jsx`

### 4. Address List Response Parsing (Critical)
**Problem:** The `useAddresses` hook was trying to access `json.data`, but the API returns `json.addresses`.

**Solution:**
- Changed response parsing in `useAddresses.js` from `json.data` to `json.addresses`
- Ensured correct data structure matches API specification

**Files Modified:**
- `/src/hooks/useAddresses.js`

## Testing Recommendations

1. **Address Creation/Update:** Verify that addresses can be created and updated with the single `name` field
2. **Forgot Password Flow:** Test the forgot password link visibility and navigation on the login page
3. **Address List Display:** Confirm addresses are loaded and displayed correctly from the API
4. **Form Validation:** Test all required field validation in AddressForm

## API Specification Compliance

All changes now strictly follow the API specifications provided:

### Address API Fields
- `name` (single field, required) - Contact person name
- `email` (required)
- `address` (required) - Street address
- `phone` (required)
- `city` (required)
- `state` (optional)
- `country` (required)
- `postal_code` (required)

### Address List Response
- Returns `json.addresses` array (not `json.data`)
- Each address includes: id, address_type, address_line_1, address_line_2, city, state, country, postal_code, phone, is_default, related data (getCountry, getState, getCity)

## Commits

1. **ff61aa3** - fix: Correct address form field names and improve forgot password UX
2. **9eb5da7** - fix: Correct address list response parsing

All fixes are backward compatible and don't affect other parts of the application.
