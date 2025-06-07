import { useEffect, useState } from 'react';
import { getPosts } from '../services/api';

const Social = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then(res => setPosts(res.data));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Social Feed</h2>
      {posts.map((p) => (
        <div key={p._id} style={{ marginBottom: '20px' }}>
          <img src={p.imageUrl} alt="post" style={{ width: '100%', maxHeight: '300px' }} />
          <p>{p.caption}</p>
          <small>Posted by: {p.createdBy?.name}</small>
        </div>
      ))}
    </div>
  );
};

export default Social;
