import { useAuth } from '../hooks/useAuth';
import { usePost } from '../hooks/usePost';

function Profile() {
  const { user } = useAuth();
  const { posts } = usePost();

  const myPosts = posts.filter((post) => post.author === user?.name);

  return (
    <div className="home-grid">
      <aside className="card profile-card">
        <div className="card-header">
          <h3 className="section-title">Mi perfil</h3>
        </div>
        <div className="card-content">
          <div style={{ textAlign: 'center' }}>
            <img src={user?.avatar} alt={user?.name} />
          </div>
          <div className="profile-meta">
            <h2>{user?.name}</h2>
            <p>{user?.bio}</p>
            <span>
              <i className="fa fa-envelope" /> {user?.email}
            </span>
            <span>
              <i className="fa fa-map-marker" /> {user?.location}
            </span>
          </div>
        </div>
      </aside>

      <main>
        <section className="card">
          <div className="card-header">
            <h3 className="section-title">Publicaciones recientes</h3>
          </div>
          <div className="card-content">
            <p>
              Has creado <strong>{myPosts.length}</strong> publicaciones.
            </p>
          </div>
        </section>

        {myPosts.map((post) => (
          <div className="card post-item" key={post.id}>
            <div className="post-header">
              <img className="post-avatar" src={post.avatar} alt={post.author} />
              <div className="post-author">
                <strong>{post.author}</strong>
                <small>{post.createdAt}</small>
              </div>
            </div>
            <div className="post-body">
              <p>{post.content}</p>
              {post.image && <img src={post.image} alt="publicación" />}
            </div>
          </div>
        ))}
      </main>

      <aside className="card">
        <div className="card-header">
          <h3 className="section-title">Datos rápidos</h3>
        </div>
        <div className="card-content">
          <p>
            <strong>Amigos:</strong> 128
          </p>
          <p>
            <strong>Seguidores:</strong> 345
          </p>
          <p>
            <strong>Publicaciones:</strong> {myPosts.length}
          </p>
        </div>
      </aside>
    </div>
  );
}

export default Profile;
