import { useEffect, useState } from 'react';
import Comments from '../Comments/Comments';
import { useAuth } from '../../hooks/useAuth';

function Post({ post, onLike, onShare, onComment, onReply, onEdit, onDelete }) {
  const { user } = useAuth();
  const [commentText, setCommentText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [editImage, setEditImage] = useState(post.image || '');
  const [error, setError] = useState('');

  useEffect(() => {
    setEditContent(post.content);
    setEditImage(post.image || '');
  }, [post.content, post.image]);

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    onComment(post.id, user, commentText.trim());
    setCommentText('');
  };

  const handleSaveEdit = () => {
    if (!editContent.trim()) {
      setError('El contenido no puede quedar vacío.');
      return;
    }
    onEdit(post.id, editContent.trim(), editImage.trim());
    setError('');
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('¿Eliminar esta publicación?')) {
      onDelete(post.id);
    }
  };

  const canEdit = user?.name === post.author;

  return (
    <article className="card post-item">
      <div className="post-header">
        <img className="post-avatar" src={post.avatar} alt={post.author} />
        <div className="post-author">
          <strong>{post.author}</strong>
          <small>{post.createdAt}</small>
        </div>
      </div>

      {isEditing ? (
        <div className="post-edit">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <input
            type="url"
            placeholder="URL de imagen (opcional)"
            value={editImage}
            onChange={(e) => setEditImage(e.target.value)}
          />
          {error && <div className="alert">{error}</div>}
          <div className="post-actions">
            <button className="btn-primary" type="button" onClick={handleSaveEdit}>
              Guardar
            </button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="post-body">
          <p>{post.content}</p>
          {post.image && <img src={post.image} alt="Publicación" />}
        </div>
      )}

      <div className="post-stats">
        <span>
          <i className="fa fa-thumbs-up" /> {post.likes} Me gusta
        </span>
        <span>
          <i className="fa fa-comment" /> {post.comments.length} Comentarios
        </span>
        <span>
          <i className="fa fa-share" /> {post.shares} Compartidos
        </span>
      </div>

      <div className="post-actions">
        <button onClick={() => onLike(post.id)}>
          <i className="fa fa-thumbs-up" /> {post.liked ? 'Ya no me gusta' : 'Me gusta'}
        </button>
        {!isEditing && (
          <button onClick={handleAddComment}>
            <i className="fa fa-comment" /> Comentar
          </button>
        )}
        <button onClick={() => onShare(post.id)}>
          <i className="fa fa-share" /> Compartir
        </button>
        {canEdit && !isEditing && (
          <button type="button" onClick={() => setIsEditing(true)}>
            <i className="fa fa-edit" /> Editar
          </button>
        )}
        {canEdit && (
          <button type="button" onClick={handleDelete}>
            <i className="fa fa-trash" /> Eliminar
          </button>
        )}
      </div>

      {!isEditing && (
        <>
          <div className="comment-box">
            <textarea
              placeholder="Escribe un comentario..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button className="btn-primary" type="button" onClick={handleAddComment}>
              Agregar comentario
            </button>
          </div>

          <Comments
            comments={post.comments}
            onReply={(commentId, text) => onReply(post.id, commentId, user, text)}
          />
        </>
      )}
    </article>
  );
}

export default Post;
