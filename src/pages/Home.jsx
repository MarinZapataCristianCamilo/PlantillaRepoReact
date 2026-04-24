import Sidebar from '../components/Sidebar/Sidebar';
import RightSidebar from '../components/RightSidebar/RightSidebar';
import PostForm from '../components/Post/PostForm';
import Post from '../components/Post/Post';
import { usePost } from '../hooks/usePost';
import { useAuth } from '../hooks/useAuth';

function Home() {
  const { user } = useAuth();
  const { posts, addPost, toggleLike, addComment, addReply, sharePost } = usePost();

  return (
    <div className="home-grid">
      <Sidebar />

      <main>
        <section className="card status-card">
          <div className="card-header">
            <h3 className="section-title">Bienvenido {user?.name}</h3>
          </div>
          <div className="card-content">
            <p>Comparte lo que estás haciendo hoy con tus amigos.</p>
          </div>
        </section>

        <PostForm onCreate={(content, image) => addPost(user, content, image)} />

        {posts.length === 0 ? (
          <div className="card card-content">
            <p>No hay publicaciones aún. Crea la primera publicación.</p>
          </div>
        ) : (
          posts.map((post) => (
            <Post
              key={post.id}
              post={post}
              onLike={toggleLike}
              onShare={sharePost}
              onComment={addComment}
              onReply={addReply}
            />
          ))
        )}
      </main>

      <RightSidebar />
    </div>
  );
}

export default Home;
