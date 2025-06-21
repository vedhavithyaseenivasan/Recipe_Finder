import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Wishlist.css'; // Your custom styles
import '@fortawesome/fontawesome-free/css/all.min.css';

const appId = 'd5246e6c'; // Your Edamam Application ID
const appKey = '65fec74568866f35aac85ba1a3309881'; // Your Edamam Application Key

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user.uid;

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/wishlist/${userId}`);
        setWishlist(response.data);
        fetchRecipeDetails(response.data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
    fetchWishlist();
  }, [userId]);

  const fetchRecipeDetails = async (wishlist) => {
    if (wishlist.length === 0) return;

    const queryParams = wishlist.map(id => `&r=${encodeURIComponent(id)}`).join('');
    try {
      const response = await axios.get(
        `https://api.edamam.com/search?app_id=${appId}&app_key=${appKey}${queryParams}`
      );
      setRecipeDetails(response.data.hits.map(hit => hit.recipe));
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  const removeFromWishlist = async (recipeId) => {
    try {
      await axios.post('http://localhost:5000/wishlist/remove', { userId, recipeId });
      setWishlist(wishlist.filter(recipe => recipe !== recipeId));
      setRecipeDetails(recipeDetails.filter(recipe => recipe.uri !== recipeId));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const handleShow = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleClose = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="container">
      <h2 className="my-4">Your Wishlist</h2>
      <div className="row">
        {recipeDetails.length === 0 ? (
          <p>No recipes in your wishlist.</p>
        ) : (
          recipeDetails.map(recipe => (
            <div className="col-md-4" key={recipe.uri}>
              <div className="card mb-4">
                <img src={recipe.image} alt={recipe.label} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{recipe.label}</h5>
                  <button className="btn btn-primary" onClick={() => handleShow(recipe)}>View Details</button>
                  <button className="btn btn-danger" onClick={() => removeFromWishlist(recipe.uri)}>Remove from Wishlist</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedRecipe && (
        <>
          {/* Custom Overlay */}
          <div className="custom-overlay" onClick={handleClose}></div>

          {/* Bootstrap Modal */}
          <div className={`modal fade show`} style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{selectedRecipe.label}</h5>
                  <button type="button" className="close" onClick={handleClose} aria-label="Close">
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <img src={selectedRecipe.image} alt={selectedRecipe.label} className="modal-image" />
                  <h3>Ingredients:</h3>
                  <ul>
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient.text}</li>
                    ))}
                  </ul>
                  <p><strong>Total Time:</strong> {selectedRecipe.totalTime ? `${selectedRecipe.totalTime} minutes` : 'N/A'}</p>
                  <p><strong>Calories:</strong> {Math.round(selectedRecipe.calories)}</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Wishlist;
