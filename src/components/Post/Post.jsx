import { useState } from 'react';
import Comments from '../Comments/Comments';
import { useAuth } from '../../hooks/useAuth';

function Post({ post, onLike, onShare, onComment, onReply }) {
  const { user } = useAuth();
  const [commentText, setCommentText] = useState('');

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    onComment(post.id, user, commentText.trim());
    setCommentText('');
  };

  return (
    <article className="card post-item">
      <div className="post-header">
        <img className="post-avatar" src={post.avatar} alt={post.author} />
        <div className="post-author">
          <strong>{post.author}</strong>
          <small>{post.createdAt}</small>
        </div>
      </div>

      <div className="post-body">
        <p>{post.content}</p>
        {post.image && <img src={post.image} alt="Publicación" />}
      </div>

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
        <button onClick={handleAddComment}>
          <i className="fa fa-comment" /> Comentar
        </button>
        <button onClick={() => onShare(post.id)}>
          <i className="fa fa-share" /> Compartir
        </button>
      </div>

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
    </article>
  );
}

export default Post;
