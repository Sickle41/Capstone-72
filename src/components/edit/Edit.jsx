import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPaintSchemeById, updatePaintScheme } from '../../services/EditServices';
import { getAllSystems } from '../../services/PaintSchemeServices';

export const EditScheme = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scheme, setScheme] = useState({
    name: '',
    schemeImage: '',
    description: '',
    uploaderId: '',  // We'll retain this field when editing
    systemId: ''
  });
  const [systems, setSystems] = useState([]);

  useEffect(() => {
    // Fetch the current paint scheme details by ID
    getPaintSchemeById(id).then((data) => {
      setScheme({
        name: data.name,
        schemeImage: data.schemeImage,
        description: data.description,
        uploaderId: data.uploaderId,  // Ensure we keep this when editing
        systemId: data.systemId
      });
    });

    // Fetch available systems for the dropdown
    getAllSystems().then((data) => setSystems(data));
  }, [id]);

  // Handle form submission for updating the paint scheme
  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure we're sending the updated object, including the uploaderId
    updatePaintScheme(id, scheme)
      .then(() => navigate('/profile'))  // Redirect to the profile after successful edit
      .catch((error) => console.error('Error updating paint scheme:', error));
  };

  return (
    <div>
      <h2>Edit Paint Scheme</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={scheme.name}
            onChange={(e) => setScheme({ ...scheme, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="schemeImage">Image URL:</label>
          <input
            type="text"
            id="schemeImage"
            value={scheme.schemeImage}
            onChange={(e) => setScheme({ ...scheme, schemeImage: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={scheme.description}
            onChange={(e) => setScheme({ ...scheme, description: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="system">System:</label>
          <select
            id="system"
            value={scheme.systemId}
            onChange={(e) => setScheme({ ...scheme, systemId: parseInt(e.target.value, 10) })}
            required
          >
            {systems.map((system) => (
              <option key={system.id} value={system.id}>
                {system.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};
