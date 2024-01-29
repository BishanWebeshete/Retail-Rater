import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUpOrIn } from '../lib';

export default function AuthForm({ action, onSignIn }) {
  const navigate = useNavigate();
  const [error, setError] = useState();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { username, password } = Object.fromEntries(formData.entries());
    try {
      const result = await signUpOrIn(action, username, password);
      if (action === 'sign-up') {
        navigate('/sign-in');
      } else if (result.user && result.token) {
        onSignIn(result);
      }
    } catch (err) {
      setError(err.message);
    }
  }

  const alternateActionTo = action === 'sign-up'
    ? '/sign-in'
    : '/sign-up';
  const alternateActionText = action === 'sign-up'
    ? 'Sign in'
    : 'Register now';
  const submitButtonText = action === 'sign-up'
    ? 'Register'
    : 'Log In';
  return (
    <form className="w-100" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username:
          <input
            required
            autoFocus
            type="text"
            name="username"
            className="form-control bg-light" />
        </label>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password:
          <input
            required
            type="password"
            name="password"
            className="form-control bg-light" />
        </label>
      </div>
      <div className="d-flex flex-column align-items-center">
        <button type="submit" className="btn btn-primary register-or-login">
          {submitButtonText}
        </button>
        <small className="mt-1">
          <Link className="text-muted" to={alternateActionTo}>
            {action === 'sign-up' ? `Already have an account? ${alternateActionText}` : `Don't have an account? ${alternateActionText}`}
          </Link>
        </small>
      </div>
      {error && <div style={{ color: 'red' }}>{error && error}</div>}
    </form>
  );
}
