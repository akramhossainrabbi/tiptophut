import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
    const navigate = useNavigate();
    const { register, loading, error } = useAuth();
    const [formData, setFormData] = useState({ first_name: '', email: '', password: '', password_confirmation: '' });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleRegister = async (e) => {
        e.preventDefault();
        const result = await register(formData);
        if (result.success) navigate('/');
    };

    return (
        <div className="col-xl-6">
            <form onSubmit={handleRegister}>
                <div className="border border-gray-100 rounded-16 px-24 py-40">
                    <h6 className="text-xl mb-32">Register</h6>
                    {error?.message && !error.errors && <div className="alert alert-danger mb-24">{error.message}</div>}
                    <div className="mb-24">
                        <label className="text-neutral-900 text-lg mb-8 fw-medium">First Name *</label>
                        <input type="text" name="first_name" className="common-input" onChange={handleChange} required />
                        {error?.errors?.first_name && <span className="text-danger text-sm">{error.errors.first_name[0]}</span>}
                    </div>
                    <div className="mb-24">
                        <label className="text-neutral-900 text-lg mb-8 fw-medium">Email address *</label>
                        <input type="email" name="email" className="common-input" onChange={handleChange} required />
                        {error?.errors?.email && <span className="text-danger text-sm">{error.errors.email[0]}</span>}
                    </div>
                    <div className="mb-24">
                        <label className="text-neutral-900 text-lg mb-8 fw-medium">Password *</label>
                        <input type="password" name="password" className="common-input" onChange={handleChange} required />
                    </div>
                    <div className="mb-24">
                        <label className="text-neutral-900 text-lg mb-8 fw-medium">Confirm Password *</label>
                        <input type="password" name="password_confirmation" className="common-input" onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-main py-18 px-40" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </div>
            </form>
        </div>
    );
}