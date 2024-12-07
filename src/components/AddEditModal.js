import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const AddEditModal = ({ post, setPosts, closeModal }) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
    } else {
      setTitle('');
    }
  }, [post]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (post) {
        const updatedPost = { ...post, title };
        await axios.put(`https://jsonplaceholder.typicode.com/posts/${post.id}`, updatedPost);
        setPosts(prev => prev.map(p => (p.id === post.id ? updatedPost : p)));
      } else {
        const newPost = { title, body: 'Sample body' }; // Make sure to include a body field
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
        setPosts(prev => [...prev, { ...newPost, id: response.data.id }]);
      }
      closeModal();
    } catch (error) {
      console.error('Error occurred while saving post:', error);
      alert('An error occurred while saving the post. Please try again.');
    }
  };
  

  return (
    <Modal show onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{post ? 'Edit Post' : 'Add Post'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input 
              type="text" 
              className="form-control" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </div>
          <Button type="submit" variant="primary">{post ? 'Update' : 'Add'}</Button>
          <Button variant="secondary" onClick={closeModal} className="ms-2">Cancel</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddEditModal;
