import React, { useState } from 'react';
import SearchBar from './components/SearchBar';  
import RecipeList from './components/RecipeList';  
import { fetchRecipes } from './components/api/api';  // API fetch logic for external API
import axios from 'axios';  // Axios for fetching recipes from MongoDB
import './components/styles.css';  
import { Navigate } from 'react-router-dom';

const Search = () => {
  const [recipes, setRecipes] = useState([]);  // Store combined recipes
  const handleSearch = async (query) => {
    try {
      // Fetch API recipes (external)
      const data = await fetchRecipes(query);
      const apiRecipes = data.hits.map(hit => ({
        uri: hit.recipe.uri,
        label: hit.recipe.label,
        image: hit.recipe.image,
        calories: hit.recipe.calories,
        totalTime: hit.recipe.totalTime,
        ingredients: hit.recipe.ingredients.map(i => i.text),
      }));
  
      // Fetch MongoDB recipes with a query filter
      const response = await axios.get(`https://recipe-finder-backend-cw2w.onrender.com/recipes`, {
        params: { label: query }  // Pass the query as 'label'
      });
      const mongoData = response.data.map(recipe => ({
        _id: recipe._id,
        label: recipe.label,
        image: recipe.image,
        calories: recipe.calories,
        totalTime: recipe.totalTime,
        ingredients: recipe.ingredients,
      }));
  
      // Combine both MongoDB and API recipes
      const combinedRecipes = [...mongoData, ...apiRecipes];
      setRecipes(combinedRecipes);  // Set the combined recipes to state
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };
  


  // Check for logged in user
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="main-container">  
      <h1>Recipe Finder</h1>
      
      <div className="search"> 
        <SearchBar onSearch={handleSearch} />  
      </div>
      
      <div className="recipe">  
        <RecipeList recipes={recipes} />  
      </div>
    </div>
  );
};

export default Search;
