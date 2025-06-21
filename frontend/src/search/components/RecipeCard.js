import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RecipeCard.css'; // Your custom styles

const RecipeCard = ({ recipe }) => {
  const [modalShow, setModalShow] = useState(false);

  const handleModalToggle = () => {
    setModalShow(!modalShow);
  };

  return (
    <>
      <div className="recipe-card">
        <h3 className="recipe-title">{recipe.label}</h3>
        <img src={recipe.image} alt={recipe.label} className="recipe-image" />
        <p className="recipe-calories">Calories: {Math.round(recipe.calories)} kcal</p>
        <p className="recipe-time">Total Time: {recipe.totalTime ? `${recipe.totalTime} minutes` : 'N/A'}</p>
        <button onClick={handleModalToggle} className="btn btn-primary">View More</button>
      </div>

      {/* Custom Overlay */}
      {modalShow && <div className="custom-overlay" onClick={handleModalToggle}></div>}

      {/* Bootstrap Modal */}
      <div className={`modal fade ${modalShow ? 'show' : ''}`} style={{ display: modalShow ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-hidden={!modalShow}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{recipe.label}</h5>
              <button type="button" className="close" onClick={handleModalToggle} aria-label="Close">
                <span>&times;</span> {/* Close icon */}
              </button>
            </div>
            <div className="modal-body">
              <img src={recipe.image} alt={recipe.label} className="modal-image" />
              <h3>Ingredients:</h3>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient.text || ingredient}</li>
                ))}
              </ul>
              
              <p><strong>Total Time:</strong> {recipe.totalTime ? `${recipe.totalTime} minutes` : 'N/A'}</p>
              <p><strong>Calories:</strong> {Math.round(recipe.calories)}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleModalToggle}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
