import { useState } from 'react';

function Comments({ comments, onReply }) {
  const [replyText, setReplyText] = useState({});
  const [activeReply, setActiveReply] = useState(null);

  return (
    <div className="comments-list">
      {comments.map((comment) => (
        <div className="comment-card" key={comment.id}>
          <div>
            <strong>{comment.author}</strong>{' '}
            <small>{comment.createdAt}</small>
          </div>
          <p>{comment.text}</p>

          <div className="reply-actions">
            <button
              type="button"
              onClick={() => setActiveReply(activeReply === comment.id ? null : comment.id)}
            >
              Responder
            </button>
          </div>

          {activeReply === comment.id && (
            <div className="comment-box">
              <textarea
                placeholder="Escribe tu respuesta..."
                value={replyText[comment.id] || ''}
                onChange={(e) =>
                  setReplyText((prev) => ({ ...prev, [comment.id]: e.target.value }))
                }
              />
              <button
                className="btn-primary"
                type="button"
                onClick={() => {
                  onReply(comment.id, replyText[comment.id] || '');
                  setReplyText((prev) => ({ ...prev, [comment.id]: '' }));
                  setActiveReply(null);
                }}
              >
                Publicar respuesta
              </button>
            </div>
          )}

          {comment.replies.length > 0 && (
            <div className="replies">
              {comment.replies.map((reply) => (
                <div className="reply-card" key={reply.id}>
                  <strong>{reply.author}</strong>{' '}
                  <small>{reply.createdAt}</small>
                  <p>{reply.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Comments;
