import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = login(username, password);
    if (!result.success) {
      setError(result.message);
      return;
    }
    navigate('/');
  };

  return (
    <section className="login-page">
      <div className="login-card card">
        <div className="card-header">
          <h2>Iniciar sesión</h2>
        </div>
        <div className="card-content">
          <p className="helper">Usa cualquier usuario y contraseña para entrar.</p>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className="alert">{error}</div>}
          <button type="button" onClick={handleSubmit}>
            Entrar
          </button>
        </div>
      </div>
    </section>
  );
}

export default Login;
