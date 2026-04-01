import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function AddressForm({ address = null, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    phone: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    is_default_shipping: false,
    is_default_billing: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (address) {
      setFormData({
        first_name: address.first_name || '',
        last_name: address.last_name || '',
        email: address.email || '',
        address: address.address || '',
        phone: address.phone || '',
        city: address.city || '',
        state: address.state || '',
        country: address.country || '',
        postal_code: address.postal_code || '',
        is_default_shipping: address.is_default_shipping || false,
        is_default_billing: address.is_default_billing || false,
      });
    }
  }, [address]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['first_name', 'last_name', 'email', 'address', 'phone', 'city', 'country', 'postal_code'];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-6 mb-24">
          <label className="text-neutral-900 text-lg mb-8 fw-medium">First Name *</label>
          <input
            type="text"
            name="first_name"
            className={`common-input ${errors.first_name ? 'is-invalid' : ''}`}
            value={formData.first_name}
            onChange={handleChange}
          />
          {errors.first_name && <small className="text-danger">{errors.first_name}</small>}
        </div>
        <div className="col-md-6 mb-24">
          <label className="text-neutral-900 text-lg mb-8 fw-medium">Last Name *</label>
          <input
            type="text"
            name="last_name"
            className={`common-input ${errors.last_name ? 'is-invalid' : ''}`}
            value={formData.last_name}
            onChange={handleChange}
          />
          {errors.last_name && <small className="text-danger">{errors.last_name}</small>}
        </div>
        <div className="col-md-6 mb-24">
          <label className="text-neutral-900 text-lg mb-8 fw-medium">Email Address *</label>
          <input
            type="email"
            name="email"
            className={`common-input ${errors.email ? 'is-invalid' : ''}`}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <small className="text-danger">{errors.email}</small>}
        </div>
        <div className="col-md-6 mb-24">
          <label className="text-neutral-900 text-lg mb-8 fw-medium">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            className={`common-input ${errors.phone ? 'is-invalid' : ''}`}
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <small className="text-danger">{errors.phone}</small>}
        </div>
        <div className="col-12 mb-24">
          <label className="text-neutral-900 text-lg mb-8 fw-medium">Address *</label>
          <input
            type="text"
            name="address"
            className={`common-input ${errors.address ? 'is-invalid' : ''}`}
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && <small className="text-danger">{errors.address}</small>}
        </div>
        <div className="col-md-6 mb-24">
          <label className="text-neutral-900 text-lg mb-8 fw-medium">City *</label>
          <input
            type="text"
            name="city"
            className={`common-input ${errors.city ? 'is-invalid' : ''}`}
            value={formData.city}
            onChange={handleChange}
          />
          {errors.city && <small className="text-danger">{errors.city}</small>}
        </div>
        <div className="col-md-6 mb-24">
          <label className="text-neutral-900 text-lg mb-8 fw-medium">State</label>
          <input
            type="text"
            name="state"
            className="common-input"
            value={formData.state}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6 mb-24">
          <label className="text-neutral-900 text-lg mb-8 fw-medium">Country *</label>
          <input
            type="text"
            name="country"
            className={`common-input ${errors.country ? 'is-invalid' : ''}`}
            value={formData.country}
            onChange={handleChange}
          />
          {errors.country && <small className="text-danger">{errors.country}</small>}
        </div>
        <div className="col-md-6 mb-24">
          <label className="text-neutral-900 text-lg mb-8 fw-medium">Postal Code *</label>
          <input
            type="text"
            name="postal_code"
            className={`common-input ${errors.postal_code ? 'is-invalid' : ''}`}
            value={formData.postal_code}
            onChange={handleChange}
          />
          {errors.postal_code && <small className="text-danger">{errors.postal_code}</small>}
        </div>
        <div className="col-12 mb-24">
          <div className="form-check">
            <input
              type="checkbox"
              id="shipping_check"
              className="form-check-input"
              name="is_default_shipping"
              checked={formData.is_default_shipping}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="shipping_check">
              Set as default shipping address
            </label>
          </div>
        </div>
        <div className="col-12 mb-24">
          <div className="form-check">
            <input
              type="checkbox"
              id="billing_check"
              className="form-check-input"
              name="is_default_billing"
              checked={formData.is_default_billing}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="billing_check">
              Set as default billing address
            </label>
          </div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-main py-18 px-40" disabled={loading}>
            {loading ? 'Saving...' : 'Save Address'}
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary py-18 px-40 ms-2"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
