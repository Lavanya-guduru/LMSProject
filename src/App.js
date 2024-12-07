import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import PostTable from './components/PostTable';
import axios from 'axios';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    setPosts(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>CRUD Application</h1>
      {loading ? <p>Loading...</p> : (
        <Routes>
          <Route path="/" element={<PostTable posts={posts} setPosts={setPosts} />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
