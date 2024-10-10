import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addNewPaintScheme, getAllSystems } from "../../services/PaintSchemeServices";
import "./PaintScheme.css"

export const AddNewScheme = () => {
  const [name, setName] = useState("");
  const [schemeImage, setSchemeImage] = useState("");
  const [description, setDescription] = useState("");
  const [systemId, setSystemId] = useState("");
  const [systems, setSystems] = useState([]);
  const navigate = useNavigate();

  // Fetch systems using the service
  useEffect(() => {
    getAllSystems() // Using the service function
      .then((data) => setSystems(data))
      .catch((error) => console.error("Error fetching systems:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      console.error("User is not logged in.");
      return;
    }

    const newScheme = {
      name,
      schemeImage,
      description,
      uploaderId: user.id,
      systemId: parseInt(systemId)
    };

    addNewPaintScheme(newScheme)
      .then(() => {
        navigate("/profile");
      })
      .catch((error) => console.error("Error adding paint scheme:", error));
  };

  return (
    <div>
      <h2>Add New Paint Scheme</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="schemeImage">Scheme Image:</label>
          <input
            type="url"
            id="schemeImage"
            value={schemeImage}
            onChange={(e) => setSchemeImage(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="systemId">System:</label>
          <select
            id="systemId"
            value={systemId}
            onChange={(e) => setSystemId(e.target.value)}
            required
          >
            <option value="">Select System</option>
            {systems.map(system => (
              <option key={system.id} value={system.id}>
                {system.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Paint Scheme</button>
      </form>
    </div>
  );
};
