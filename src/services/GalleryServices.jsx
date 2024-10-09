

// Get likes for a specific scheme and user
export const getLikesBySchemeAndUser = (schemeId, userId) => {
  return fetch(`http://localhost:8088/Likes?schemeId=${schemeId}&userId=${userId}`)
    .then(response => response.json())
    .catch(error => console.error('Error fetching likes:', error));
};

// Add a new like
export const createLike = (likeData) => {
  return fetch(`http://localhost:8088/Likes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(likeData),
  })
    .then(response => response.json())
    .catch(error => console.error('Error creating like:', error));
};

// Delete an existing like
export const deleteLike = (likeId) => {
  return fetch(`http://localhost:8088/Likes/${likeId}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .catch(error => console.error('Error deleting like:', error));
};
