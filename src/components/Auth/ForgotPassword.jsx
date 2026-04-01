import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useProfile from '../../hooks/useProfile';
import { toast } from 'react-toastify';

export default function ForgotPassword() {
  const { loading, forgotPassword } = useProfile();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    const result = await forgotPassword(email);
    if (result.success) {
      setSubmitted(true);
      toast.success('Password reset instructions sent to your email!');
    } else {
      const errorMsg = result.error?.message || 'Failed to send reset instructions';
      setError(errorMsg);
      toast.error(errorMsg);
    }
  };

  if (submitted) {
    return (
      <div className="col-xl-6 pe-xl-5">
        <div className="border border-gray-100 rounded-16 px-24 py-40">
          <h6 className="text-xl mb-32">Check Your Email</h6>
          <div className="alert alert-success mb-24">
            <p>
              We have sent password reset instructions to <strong>{email}</strong>. Please check your email and follow
              the link to reset your password.
            </p>
          </div>
          <p className="text-neutral-600 mb-24">
            Did not receive an email? Check your spam folder or try{' '}
            <button
              type="button"
              className="btn btn-link p-0"
              onClick={() => {
                setSubmitted(false);
                setEmail('');
              }}
            >
              submitting again
            </button>
            .
          </p>
          <Link to="/login" className="btn btn-outline-primary py-18 px-40">
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="col-xl-6 pe-xl-5">
      <form onSubmit={handleSubmit}>
        <div className="border border-gray-100 rounded-16 px-24 py-40">
          <h6 className="text-xl mb-32">Reset Your Password</h6>
          {error && <div className="alert alert-danger mb-24">{error}</div>}
          <p className="text-neutral-600 mb-24">
            Enter your email address and we will send you a link to reset your password.
          </p>
          <div className="mb-24">
            <label className="text-neutral-900 text-lg mb-8 fw-medium">Email address *</label>
            <input
              type="email"
              className="common-input"
              value={email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>
          <button type="submit" className="btn btn-main py-18 px-40 w-100 mb-24" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
          <p className="text-center">
            <Link to="/login" className="text-primary text-decoration-none">
              Back to Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
