import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="not-found">
      <div>
        <h1>404</h1>
        <p>La página que buscas no existe.</p>
        <Link to="/" className="btn-primary">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}

export default NotFound;
