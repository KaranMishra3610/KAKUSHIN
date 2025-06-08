import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div style={{ padding: '20px' }}>
      <h2>{user?.user?.name}'s Profile</h2>
      <p>Email: {user?.user?.email}</p>
      <p>Impact Score: {user?.user?.impactScore}</p>
      <h3>Badges</h3>
      <ul>
        {(user?.user?.badges || []).map((b, i) => (
          <li key={i}>🏅 {b}</li>
        ))}
      </ul>
      <h3>Friends</h3>
      <ul>
        {(user?.user?.friends || []).map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
