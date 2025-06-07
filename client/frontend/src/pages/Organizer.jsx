import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { postDrive, generatePost, createPost } from '../services/api';

const Organizer = () => {
  const { user } = useAuth();
  const [driveForm, setDriveForm] = useState({ name: '', lat: '', lng: '', tools: '', time: '' });
  const [postData, setPostData] = useState({ description: '', tone: '', targetAudience: '' });
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
      const res = await generatePost(postData, user.token);
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
      <input placeholder="Name" onChange={(e) => setDriveForm({ ...driveForm, name: e.target.value })} /><br />
      <input placeholder="Lat" onChange={(e) => setDriveForm({ ...driveForm, lat: e.target.value })} /><br />
      <input placeholder="Lng" onChange={(e) => setDriveForm({ ...driveForm, lng: e.target.value })} /><br />
      <input placeholder="Tools (comma separated)" onChange={(e) => setDriveForm({ ...driveForm, tools: e.target.value })} /><br />
      <input placeholder="Time" onChange={(e) => setDriveForm({ ...driveForm, time: e.target.value })} /><br />
      <button onClick={handleDrive}>Submit Drive</button>

      <hr />

      <h3>AI Post Generator</h3>
      <input placeholder="Description" onChange={(e) => setPostData({ ...postData, description: e.target.value })} /><br />
      <input placeholder="Tone" onChange={(e) => setPostData({ ...postData, tone: e.target.value })} /><br />
      <input placeholder="Target Audience" onChange={(e) => setPostData({ ...postData, targetAudience: e.target.value })} /><br />
      <button onClick={handleGenerate}>Generate</button>

      {genPost && (
        <>
          <p><b>{genPost.caption}</b></p>
          <img src={genPost.imageUrl} alt="Generated" style={{ width: '100%' }} />
          <button onClick={handlePost}>Post it</button>
        </>
      )}
    </div>
  );
};

export default Organizer;
