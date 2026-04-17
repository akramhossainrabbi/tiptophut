import React, { useState } from 'react';
import useAddresses from '../../hooks/useAddresses';
import AddressForm from './AddressForm';
import { toast } from 'react-toastify';

export default function AddressManagement() {
  const {
    addresses,
    loading,
    createAddress,
    updateAddress,
    deleteAddress,
    setDefaultShippingAddress,
    setDefaultBillingAddress,
  } = useAddresses();

  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const handleAddAddress = () => {
    setEditingAddress(null);
    setShowForm(true);
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData) => {
    setFormLoading(true);
    let result;
    
    if (editingAddress) {
      result = await updateAddress(editingAddress.id, formData);
    } else {
      result = await createAddress(formData);
    }

    setFormLoading(false);
    if (result.success) {
      toast.success(editingAddress ? 'Address updated successfully!' : 'Address added successfully!');
      setShowForm(false);
      setEditingAddress(null);
    } else {
      const errorMsg = result.error?.message || 'Failed to save address';
      toast.error(errorMsg);
    }
  };

  const handleDeleteAddress = async (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      const result = await deleteAddress(id);
      if (result.success) {
        toast.success('Address deleted successfully!');
      } else {
        const errorMsg = result.error?.message || 'Failed to delete address';
        toast.error(errorMsg);
      }
    }
  };

  const handleSetDefaultShipping = async (id) => {
    const result = await setDefaultShippingAddress(id);
    if (result.success) {
      toast.success('Default shipping address set successfully!');
    } else {
      const errorMsg = result.error?.message || 'Failed to set default shipping address';
      toast.error(errorMsg);
    }
  };

  const handleSetDefaultBilling = async (id) => {
    const result = await setDefaultBillingAddress(id);
    if (result.success) {
      toast.success('Default billing address set successfully!');
    } else {
      const errorMsg = result.error?.message || 'Failed to set default billing address';
      toast.error(errorMsg);
    }
  };

  if (showForm) {
    return (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-32">
          <h5>
            {editingAddress ? 'Edit Address' : 'Add New Address'}
          </h5>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => setShowForm(false)}
          >
            ← Back
          </button>
        </div>
        <AddressForm
          address={editingAddress}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
          loading={formLoading}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-32">
        <h5>My Addresses</h5>
        <button
          type="button"
          className="btn btn-main py-18 px-40"
          onClick={handleAddAddress}
        >
          Add New Address
        </button>
      </div>

      {loading ? (
        <p>Loading addresses...</p>
      ) : addresses.length === 0 ? (
        <p className="text-neutral-600">No addresses found. Add your first address.</p>
      ) : (
        <div className="row">
          {addresses.map((address) => (
            <div key={address.id} className="col-md-6 mb-32">
              <div className="border border-gray-100 rounded-16 p-24">
                <div className="d-flex justify-content-between align-items-start mb-16">
                  <div>
                    <h6 className="mb-8">
                      {address.first_name} {address.last_name}
                    </h6>
                    <p className="text-neutral-600 text-sm mb-2">{address.email}</p>
                    <p className="text-neutral-600 text-sm mb-2">{address.phone}</p>
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-sm btn-secondary"
                      onClick={() => handleEditAddress(address)}
                      disabled={formLoading}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDeleteAddress(address.id)}
                      disabled={formLoading}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="mb-16">
                  <p className="text-neutral-900 mb-2">
                    {address.address}, {address.city}
                  </p>
                  {address.state && (
                    <p className="text-neutral-900 mb-2">{address.state}</p>
                  )}
                  <p className="text-neutral-900 mb-2">
                    {address.country} {address.postal_code}
                  </p>
                </div>

                <div className="d-flex flex-wrap gap-2">
                  {address.is_default_shipping && (
                    <span className="badge bg-success">Default Shipping</span>
                  )}
                  {address.is_default_billing && (
                    <span className="badge bg-info">Default Billing</span>
                  )}
                  {!address.is_default_shipping && (
                    <button
                      type="button"
                      className="btn btn-sm btn-link p-0"
                      onClick={() => handleSetDefaultShipping(address.id)}
                      disabled={formLoading}
                    >
                      Set as default shipping
                    </button>
                  )}
                  {!address.is_default_billing && (
                    <button
                      type="button"
                      className="btn btn-sm btn-link p-0"
                      onClick={() => handleSetDefaultBilling(address.id)}
                      disabled={formLoading}
                    >
                      Set as default billing
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
