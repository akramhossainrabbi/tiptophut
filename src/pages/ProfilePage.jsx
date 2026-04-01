import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UpdateProfile from '../components/Profile/UpdateProfile';
import ChangePassword from '../components/Profile/ChangePassword';
import AddressManagement from '../components/Profile/AddressManagement';

export default function ProfilePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  // Redirect if not authenticated
  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="py-80">
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="profile-sidebar">
              <div className="border border-gray-100 rounded-16 p-24 mb-24">
                <h6 className="mb-24">Account Settings</h6>
                <ul className="list-unstyled">
                  <li className="mb-16">
                    <button
                      type="button"
                      className={`btn btn-link p-0 text-start w-100 ${
                        activeTab === 'profile' ? 'text-main fw-bold' : 'text-neutral-600'
                      }`}
                      onClick={() => setActiveTab('profile')}
                    >
                      My Profile
                    </button>
                  </li>
                  <li className="mb-16">
                    <button
                      type="button"
                      className={`btn btn-link p-0 text-start w-100 ${
                        activeTab === 'addresses' ? 'text-main fw-bold' : 'text-neutral-600'
                      }`}
                      onClick={() => setActiveTab('addresses')}
                    >
                      Addresses
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className={`btn btn-link p-0 text-start w-100 ${
                        activeTab === 'password' ? 'text-main fw-bold' : 'text-neutral-600'
                      }`}
                      onClick={() => setActiveTab('password')}
                    >
                      Change Password
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-9">
            <div className="border border-gray-100 rounded-16 p-24">
              {activeTab === 'profile' && <UpdateProfile />}
              {activeTab === 'addresses' && <AddressManagement />}
              {activeTab === 'password' && <ChangePassword />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
