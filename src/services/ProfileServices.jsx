  // Fetch paint schemes by user ID
  export const getPaintSchemesByUserId = (userId) => {
    return fetch(`http://localhost:8088/PaintSchemes?uploaderId=${userId}`)
      .then((response) => response.json());
  };

    // Delete paint scheme by ID
    export const deletePaintSchemeById = (schemeId) => {
        return fetch(`http://localhost:8088/PaintSchemes/${schemeId}`, {
          method: "DELETE",
        }).then((response) => response.json());
      };
      