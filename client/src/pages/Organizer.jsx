import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { postDrive, generatePost, createPost } from '../services/api';

const Organizer = () => {
  const { user } = useAuth();

  const [driveForm, setDriveForm] = useState({
    name: '',
    lat: '',
    lng: '',
    tools: '',
    time: ''
  });

  const [audienceTone, setAudienceTone] = useState({
    audience: '',
    tone: ''
  });

  const [genPost, setGenPost] = useState(null);

  const handleDrive = async () => {
    try {
      const driveData = {
        ...driveForm,
        lat: parseFloat(driveForm.lat),
        lng: parseFloat(driveForm.lng),
        tools: driveForm.tools.split(',')
      };
      await postDrive(driveData, user.token);
      alert('Drive created!');
    } catch {
      alert('Error creating drive.');
    }
  };

  const handleGenerate = async () => {
    try {
      const postPayload = {
        location: driveForm.name,
        time: driveForm.time,
        tools: driveForm.tools.split(','),
        audience: audienceTone.audience,
        tone: audienceTone.tone
      };

      const res = await generatePost(postPayload, user.token);
      setGenPost(res.data);
    } catch {
      alert('AI generation failed');
    }
  };

  const handlePost = async () => {
    try {
      await createPost(genPost, user.token);
      alert('Post created!');
    } catch {
      alert('Post failed.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Organizer Dashboard</h2>

      <h3>Create Drive</h3>
      <input placeholder="Name (Beach Name / Event Title)" onChange={(e) => setDriveForm({ ...driveForm, name: e.target.value })} /><br />
      <input placeholder="Latitude" onChange={(e) => setDriveForm({ ...driveForm, lat: e.target.value })} /><br />
      <input placeholder="Longitude" onChange={(e) => setDriveForm({ ...driveForm, lng: e.target.value })} /><br />
      <input placeholder="Tools (comma separated)" onChange={(e) => setDriveForm({ ...driveForm, tools: e.target.value })} /><br />
      <input placeholder="Time (e.g. 7:00 AM, Sunday)" onChange={(e) => setDriveForm({ ...driveForm, time: e.target.value })} /><br />
      <button onClick={handleDrive}>Submit Drive</button>

      <hr />

      <h3>Generate Social Post with AI</h3>
      <input placeholder="Target Audience (e.g. College Students)" onChange={(e) => setAudienceTone({ ...audienceTone, audience: e.target.value })} /><br />
      <input placeholder="Tone (e.g. Friendly, Inspiring)" onChange={(e) => setAudienceTone({ ...audienceTone, tone: e.target.value })} /><br />
      <button onClick={handleGenerate}>Generate Post</button>

      {genPost && (
        <>
          <p><b>Generated Caption:</b></p>
          <p>{genPost.caption}</p>
          <img src={genPost.imageUrl} alt="Generated" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
          <button onClick={handlePost}>Post it</button>
        </>
      )}
    </div>
  );
};

export default Organizer;
