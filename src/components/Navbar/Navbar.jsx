import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="brand">
        <div className="logo">
          <i className="fa fa-facebook"></i>
        </div>
        <span>RedSocial</span>
      </div>

      <nav>
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
          Inicio
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
          Perfil
        </NavLink>
      </nav>

      <div className="nav-right">
        {isAuthenticated && user ? (
          <>
            <div className="user-chip">
              <img src={user.avatar} alt={user.name} />
              <span>{user.name}</span>
            </div>
            <button className="small-button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Iniciar sesión</NavLink>
            <NavLink to="/register">Registrarse</NavLink>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
