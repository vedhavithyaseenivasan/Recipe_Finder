import React from 'react';
import RecipeCard from './RecipeCard';
import './RecipeList.css';

const RecipeList = ({ recipes }) => {
  return (
    <div className="recipe-list">
      {recipes && recipes.length > 0 ? (
        recipes.map((recipe) => (
          <RecipeCard key={recipe.uri || recipe._id} recipe={recipe} />
        ))
      ) : (
        <p>No recipes found. Please try another search.</p>
      )}
    </div>
  );
};

export default RecipeList;
