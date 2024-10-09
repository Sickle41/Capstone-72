import React, { useEffect, useState } from 'react';
import { getAllPaintSchemes } from '../../services/PaintSchemeServices';
import { getLikesBySchemeAndUser, createLike, deleteLike } from '../../services/GalleryServices';

export const Gallery = () => {
  const [paintSchemes, setPaintSchemes] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    }

    // Fetch all paint schemes and likes
    fetchPaintSchemesWithLikes(userData?.id);
  }, []);

  // Fetch all paint schemes and their likes
  const fetchPaintSchemesWithLikes = async (userId) => {
    try {
      const schemes = await getAllPaintSchemes();
      const enrichedSchemes = await Promise.all(
        schemes.map(async (scheme) => {
          // Fetch likes for each scheme
          const likes = await fetch(`http://localhost:8088/Likes?schemeId=${scheme.id}`);
          const likesData = await likes.json();

          // Calculate likeCount and check if user has liked the scheme
          const likeCount = likesData.length;
          const likedByUser = userId && likesData.some(like => like.userId === userId);

          return {
            ...scheme,
            likeCount,
            likedByUser,
          };
        })
      );
      setPaintSchemes(enrichedSchemes);
    } catch (error) {
      console.error('Error fetching paint schemes or likes:', error);
    }
  };

  // Handle Like/Unlike
  const toggleLike = async (schemeId) => {
    if (!user) {
      alert('You must be logged in to like a paint scheme!');
      return;
    }

    try {
      const scheme = paintSchemes.find(scheme => scheme.id === schemeId);

      if (scheme.likedByUser) {
        // If the user already liked this scheme, remove the like
        const likes = await getLikesBySchemeAndUser(schemeId, user.id);
        if (likes.length > 0) {
          await deleteLike(likes[0].id);
          updateScheme(schemeId, scheme.likeCount - 1, false);
        }
      } else {
        // If the user hasn't liked this scheme, add a new like
        await createLike({ userId: user.id, schemeId });
        updateScheme(schemeId, scheme.likeCount + 1, true);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  // Update the scheme after like/unlike
  const updateScheme = (schemeId, likeCount, likedByUser) => {
    setPaintSchemes((prevSchemes) =>
      prevSchemes.map((scheme) =>
        scheme.id === schemeId
          ? { ...scheme, likeCount, likedByUser }
          : scheme
      )
    );
  };

  return (
    <div className="gallery-container">
      <h2>Paint Scheme Gallery</h2>
      <div className="paint-schemes-grid">
        {paintSchemes.map((scheme) => (
          <div key={scheme.id} className="scheme-card">
            <h3>{scheme.name}</h3>
            <img src={scheme.schemeImage} alt={scheme.name} />
            <p>{scheme.description}</p>
            <div className="like-section">
              <button onClick={() => toggleLike(scheme.id)}>
                {scheme.likedByUser ? 'Unlike' : 'Like'}
              </button>
              <span>{scheme.likeCount} Likes</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
