import React, { useState } from 'react';
import axios from 'axios';
import AddEditModal from './AddEditModal';

const PostTable = ({ posts, setPosts }) => {
  const [search, setSearch] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDelete = async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    setPosts(posts.filter(post => post.id !== id));
  };

  const openModal = (post) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setModalOpen(false);
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <input 
        type="text" 
        className="form-control mb-3" 
        placeholder="Search by title" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />
      <button className="btn btn-primary mb-3" onClick={() => openModal(null)}>Add Post</button>
      {modalOpen && (
        <AddEditModal 
          post={selectedPost} 
          setPosts={setPosts} 
          closeModal={closeModal} 
        />
      )}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.map(post => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => openModal(post)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(post.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostTable;
