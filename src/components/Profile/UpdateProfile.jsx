import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import useProfile from '../../hooks/useProfile';
import { toast } from 'react-toastify';

export default function UpdateProfile() {
  const { user, updateUser } = useAuth();
  const { loading, updateProfile } = useProfile();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    description: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        phone: user.phone || '',
        date_of_birth: user.date_of_birth || '',
        description: user.description || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await updateProfile(formData);
    if (result.success) {
      updateUser({ ...user, ...formData });
      toast.success('Profile updated successfully!');
    } else {
      const errorMsg = result.error?.message || 'Failed to update profile';
      toast.error(errorMsg);
    }
  };

  return (
    <div>
      <h5 className="mb-32">Update Profile Information</h5>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-24">
            <label className="text-neutral-900 text-lg mb-8 fw-medium">First Name *</label>
            <input
              type="text"
              name="first_name"
              className="common-input"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-24">
            <label className="text-neutral-900 text-lg mb-8 fw-medium">Last Name *</label>
            <input
              type="text"
              name="last_name"
              className="common-input"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-24">
            <label className="text-neutral-900 text-lg mb-8 fw-medium">Email Address *</label>
            <input
              type="email"
              name="email"
              className="common-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-24">
            <label className="text-neutral-900 text-lg mb-8 fw-medium">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className="common-input"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-24">
            <label className="text-neutral-900 text-lg mb-8 fw-medium">Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              className="common-input"
              value={formData.date_of_birth}
              onChange={handleChange}
            />
          </div>
          <div className="col-12 mb-24">
            <label className="text-neutral-900 text-lg mb-8 fw-medium">Description</label>
            <textarea
              name="description"
              className="common-input"
              rows="4"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-main py-18 px-40" disabled={loading}>
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
