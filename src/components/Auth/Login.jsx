import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
    const navigate = useNavigate();
    const { login, loading, error } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await login(formData);
        if (result.success) navigate('/');
    };

    return (
        <div className="col-xl-6 pe-xl-5">
            <form onSubmit={handleLogin}>
                <div className="border border-gray-100 rounded-16 px-24 py-40">
                    <h6 className="text-xl mb-32">Login</h6>
                    {error?.message && <div className="alert alert-danger mb-24">{error.message}</div>}
                    <div className="mb-24">
                        <label className="text-neutral-900 text-lg mb-8 fw-medium">Email address *</label>
                        <input type="text" name="email" className="common-input" onChange={handleChange} required />
                    </div>
                    <div className="mb-24">
                        <label className="text-neutral-900 text-lg mb-8 fw-medium">Password *</label>
                        <input type="password" name="password" className="common-input" onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-main py-18 px-40" disabled={loading}>
                        {loading ? 'Logging in...' : 'Log in'}
                    </button>
                </div>
            </form>
        </div>
    );
}