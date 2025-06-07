import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { getDrives, rsvpDrive } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const [drives, setDrives] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getDrives().then(res => setDrives(res.data));
  }, []);

  const handleRSVP = async (id) => {
    try {
      await rsvpDrive(id, user?.token);
      alert('RSVP successful!');
    } catch {
      alert('RSVP failed!');
    }
  };

  return (
    <div style={{ height: '90vh' }}>
      <MapContainer center={[19.109, 72.825]} zoom={12} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {drives.map((d) => (
          <Marker key={d._id} position={[d.lat, d.lng]}>
            <Popup>
              <strong>{d.name}</strong><br />
              🧰 Tools: {d.tools.join(', ')}<br />
              👥 {d.participants.length} volunteers<br />
              🕓 {d.time}<br />
              {user && <button onClick={() => handleRSVP(d._id)}>RSVP</button>}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Home;
