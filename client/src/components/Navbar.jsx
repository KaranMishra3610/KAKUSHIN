import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav style={{ backgroundColor: "#2e7d32", color: "white", padding: "15px", display: "flex", justifyContent: "space-between" }}>
      <h2>Beach Warriors</h2>
      <div>
        <Link to="/">Home</Link> | <Link to="/social">Social</Link> | <Link to="/profile">Profile</Link>
        {user?.user?.isOrganizer && <> | <Link to="/organizer">Organizer</Link></>}
        {user ? (
          <button style={{ marginLeft: '10px' }} onClick={logout}>Logout</button>
        ) : (
          <>
            {" | "}
            <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
