import { useUser } from '../../hooks/useUser';

function Sidebar() {
  const { profile } = useUser();

  if (!profile) return null;

  return (
    <aside className="card profile-card">
      <div className="card-header">
        <h3 className="section-title">Mi perfil</h3>
      </div>
      <div className="card-content">
        <div style={{ textAlign: 'center' }}>
          <img src={profile.avatar} alt={profile.name} />
        </div>
        <div className="profile-meta">
          <h3>{profile.name}</h3>
          <span>
            <i className="fa fa-briefcase" /> {profile.occupation}
          </span>
          <span>
            <i className="fa fa-map-marker" /> {profile.location}
          </span>
          <span>
            <i className="fa fa-birthday-cake" /> {profile.joined}
          </span>
          <span>
            <i className="fa fa-users" /> {profile.friends} amigos
          </span>
          <span>
            <i className="fa fa-heart" /> {profile.followers} seguidores
          </span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
