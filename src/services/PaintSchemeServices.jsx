

export const getAllPaintSchemes = () => {
    return fetch("http://localhost:8088/PaintSchemes")
      .then((response) => response.json());
  };
  

  export const addNewPaintScheme = (newScheme) => {
    return fetch("http://localhost:8088/PaintSchemes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newScheme)
    }).then((response) => response.json());
  };

  export const getAllSystems = () => {
    return fetch("http://localhost:8088/System")
      .then((response) => response.json());
  };