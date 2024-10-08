export const updatePaintScheme = (id, updatedScheme) => {
    return fetch(`http://localhost:8088/PaintSchemes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedScheme),
    }).then((response) => response.json());
  };
  
  export const getPaintSchemeById = (id) => {
    return fetch(`http://localhost:8088/PaintSchemes/${id}`)
      .then((response) => response.json());
  };