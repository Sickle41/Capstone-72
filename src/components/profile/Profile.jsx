import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [paintSchemes, setPaintSchemes] = useState([]);

  // Fetch user data from local storage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData && userData.email) {
      setUser(userData);
      fetchUserPaintSchemes(userData.id); // Fetch paint schemes for the user
    } else {
      console.error('User data not found in local storage');
    }
  }, []);

  // Fetch the paint schemes uploaded by the current user
  const fetchUserPaintSchemes = (userId) => {
    fetch(`http://localhost:8088/PaintSchemes?uploaderId=${userId}`)
      .then(response => response.json())
      .then(data => setPaintSchemes(data))
      .catch(error => console.error('Error fetching paint schemes:', error));
  };

  // Handle deleting a paint scheme
  const handleDelete = (schemeId) => {
    fetch(`http://localhost:8088/PaintSchemes/${schemeId}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Remove the deleted scheme from the state
        setPaintSchemes(paintSchemes.filter(scheme => scheme.id !== schemeId));
      })
      .catch(error => console.error('Error deleting paint scheme:', error));
  };

  return (
    <div>
      <h2>Profile</h2>
      {user ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <Link to="/add-new-scheme">
            <button>Add New Paint Scheme</button>
          </Link>
          
          <h3>Your Uploaded Paint Schemes</h3>
          {paintSchemes.length > 0 ? (
            paintSchemes.map(scheme => (
              <div key={scheme.id} className="scheme-card">
                <h4>{scheme.name}</h4>
                <img src={scheme.schemeImage} alt={scheme.name} />
                <p>{scheme.description}</p>
                <Link to={`/edit-scheme/${scheme.id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(scheme.id)}>Delete</button>
              </div>
            ))
          ) : (
            <p>No paint schemes uploaded yet.</p>
          )}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};
