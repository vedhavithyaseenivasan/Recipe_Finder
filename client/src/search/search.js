"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import RecipeCard from "./components/RecipeCard"
import { fetchRecipes } from "./components/api/api"
import axios from "axios"
import "./components/styles.css"

const Search = () => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState("")
  const [user, setUser] = useState(null)
  const [activeFilter, setActiveFilter] = useState("all")
  const navigate = useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      navigate("/login")
      return
    }
    setUser(JSON.parse(userData))
  }, [navigate])

  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return

    setLoading(true)
    try {
      // Fetch API recipes (external)
      const data = await fetchRecipes(searchQuery)
      const apiRecipes = data.hits.map((hit) => ({
        uri: hit.recipe.uri,
        label: hit.recipe.label,
        image: hit.recipe.image,
        calories: hit.recipe.calories,
        totalTime: hit.recipe.totalTime,
        ingredients: hit.recipe.ingredients.map((i) => i.text),
      }))

      // Fetch MongoDB recipes with a query filter
      const response = await axios.get(`https://recipe-finder-x2s0.onrender.com/recipes`, {
        params: { label: searchQuery },
      })
      const mongoData = response.data.map((recipe) => ({
        _id: recipe._id,
        label: recipe.label,
        image: recipe.image,
        calories: recipe.calories,
        totalTime: recipe.totalTime,
        ingredients: recipe.ingredients,
      }))

      // Combine both MongoDB and API recipes
      const combinedRecipes = [...mongoData, ...apiRecipes]
      setRecipes(combinedRecipes)
    } catch (error) {
      console.error("Error fetching recipes:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSearch(query)
  }

  const handleFilterClick = (filter) => {
    setActiveFilter(filter)
    // Add filter logic here based on the filter type
  }

  if (!user) return null

  return (
    <div className="rf-search-page">
      <div className="rf-search-container">
        {/* Header */}
        <div className="rf-search-header">
          <h1 className="rf-search-title">Recipe Search</h1>
          <p className="rf-search-subtitle">Discover your next favorite dish from thousands of recipes</p>
        </div>

        {/* Search Form */}
        <div className="rf-search-form-container">
          <form onSubmit={handleSubmit} className="rf-search-form">
            <div className="rf-search-input-wrapper">
              <div className="rf-search-input-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for recipes, ingredients, or cuisines..."
                className="rf-search-input"
              />
            </div>
            <button type="submit" disabled={loading} className="rf-search-btn">
              {loading ? (
                <div className="rf-loading"></div>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                  <span>Search</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Filters */}
        <div className="rf-filters-container">
          <button
            className={`rf-filter-btn ${activeFilter === "all" ? "rf-active" : ""}`}
            onClick={() => handleFilterClick("all")}
          >
            All Recipes
          </button>
          <button
            className={`rf-filter-btn ${activeFilter === "quick" ? "rf-active" : ""}`}
            onClick={() => handleFilterClick("quick")}
          >
            Quick & Easy
          </button>
          <button
            className={`rf-filter-btn ${activeFilter === "healthy" ? "rf-active" : ""}`}
            onClick={() => handleFilterClick("healthy")}
          >
            Healthy
          </button>
          <button
            className={`rf-filter-btn ${activeFilter === "vegetarian" ? "rf-active" : ""}`}
            onClick={() => handleFilterClick("vegetarian")}
          >
            Vegetarian
          </button>
          <button
            className={`rf-filter-btn ${activeFilter === "desserts" ? "rf-active" : ""}`}
            onClick={() => handleFilterClick("desserts")}
          >
            Desserts
          </button>
        </div>

        {/* Results */}
        <div className="rf-results-container">
          {loading ? (
            <div className="rf-loading-container">
              <div className="rf-loading-spinner-large"></div>
              <p className="rf-loading-text">Searching for delicious recipes...</p>
            </div>
          ) : recipes.length > 0 ? (
            <div className="rf-recipes-grid">
              {recipes.map((recipe, index) => (
                <RecipeCard key={recipe.uri || recipe._id || index} recipe={recipe} delay={`${index * 0.1}s`} />
              ))}
            </div>
          ) : query ? (
            <div className="rf-empty-state">
              <svg className="rf-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="m16 10-4 4-4-4" />
              </svg>
              <h3 className="rf-empty-title">No recipes found</h3>
              <p className="rf-empty-description">Try searching with different keywords</p>
            </div>
          ) : (
            <div className="rf-empty-state">
              <svg className="rf-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <h3 className="rf-empty-title">Start your culinary journey</h3>
              <p className="rf-empty-description">Search for recipes to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Search

