import { useState } from 'react';

function PostForm({ onCreate }) {
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!content.trim()) {
      setError('Escribe algo para publicar.');
      return;
    }
    onCreate(content.trim(), image.trim());
    setContent('');
    setImage('');
    setError('');
  };

  return (
    <article className="card post-form">
      <div className="card-header">
        <h3 className="section-title">Crear publicación</h3>
      </div>
      <div className="card-content">
        <textarea
          placeholder="¿Qué estás pensando?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div className="post-actions">
          <input
            type="url"
            placeholder="URL de imagen (opcional)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <button className="btn-primary" onClick={handleSubmit} type="button">
            Publicar
          </button>
        </div>
        {error && <div className="alert">{error}</div>}
      </div>
    </article>
  );
}

export default PostForm;
