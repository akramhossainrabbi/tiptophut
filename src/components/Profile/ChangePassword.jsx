import React, { useState } from 'react';
import useProfile from '../../hooks/useProfile';
import { toast } from 'react-toastify';

export default function ChangePassword() {
  const { loading, changePassword } = useProfile();
  const [formData, setFormData] = useState({
    old_password: '',
    password: '',
    password_confirmation: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.old_password) {
      newErrors.old_password = 'Old password is required';
    }

    if (!formData.password) {
      newErrors.password = 'New password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (!formData.password_confirmation) {
      newErrors.password_confirmation = 'Password confirmation is required';
    } else if (formData.password !== formData.password_confirmation) {
      newErrors.password_confirmation = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = await changePassword(formData);
    if (result.success) {
      toast.success('Password changed successfully!');
      setFormData({
        old_password: '',
        password: '',
        password_confirmation: '',
      });
    } else {
      const errorMsg = result.error?.message || 'Failed to change password';
      toast.error(errorMsg);
      if (result.error?.errors) {
        setErrors(result.error.errors);
      }
    }
  };

  return (
    <div>
      <h5 className="mb-32">Change Password</h5>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-24">
            <label className="text-neutral-900 text-lg mb-8 fw-medium">Current Password *</label>
            <input
              type="password"
              name="old_password"
              className={`common-input ${errors.old_password ? 'is-invalid' : ''}`}
              value={formData.old_password}
              onChange={handleChange}
            />
            {errors.old_password && (
              <small className="text-danger">{errors.old_password}</small>
            )}
          </div>
          <div className="col-md-6"></div>
          <div className="col-md-6 mb-24">
            <label className="text-neutral-900 text-lg mb-8 fw-medium">New Password *</label>
            <input
              type="password"
              name="password"
              className={`common-input ${errors.password ? 'is-invalid' : ''}`}
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 8 characters"
            />
            {errors.password && (
              <small className="text-danger">{errors.password}</small>
            )}
          </div>
          <div className="col-md-6 mb-24">
            <label className="text-neutral-900 text-lg mb-8 fw-medium">Confirm Password *</label>
            <input
              type="password"
              name="password_confirmation"
              className={`common-input ${errors.password_confirmation ? 'is-invalid' : ''}`}
              value={formData.password_confirmation}
              onChange={handleChange}
            />
            {errors.password_confirmation && (
              <small className="text-danger">{errors.password_confirmation}</small>
            )}
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-main py-18 px-40" disabled={loading}>
              {loading ? 'Updating...' : 'Change Password'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
