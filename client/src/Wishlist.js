"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useNotification } from "./components/NotificationContext"
import "./Wishlist.css"

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const navigate = useNavigate()
  const { addNotification } = useNotification()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (!user) {
      navigate("/login")
      return
    }

    // Load wishlist from localStorage for demo
    const savedWishlist = JSON.parse(localStorage.getItem(`wishlist_${user.username}`)) || []
    setWishlist(savedWishlist)
    setLoading(false)
  }, [navigate])

  const removeFromWishlist = (recipeId) => {
    const user = JSON.parse(localStorage.getItem("user"))
    const updatedWishlist = wishlist.filter((recipe) => recipe.id !== recipeId)
    setWishlist(updatedWishlist)
    localStorage.setItem(`wishlist_${user.username}`, JSON.stringify(updatedWishlist))
    addNotification("Recipe removed from wishlist", "success")
  }

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe)
  }

  const closeModal = () => {
    setSelectedRecipe(null)
  }

  if (loading) {
    return (
      <div className="rf-wishlist-page">
        <div className="rf-wishlist-loading">
          <div className="rf-loading-spinner-large"></div>
          <p>Loading your wishlist...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="rf-wishlist-page">
      <div className="rf-wishlist-container">
        {/* Header */}
        <div className="rf-wishlist-header">
          <div className="rf-wishlist-title-section">
            <h1 className="rf-wishlist-title">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              Your Wishlist
            </h1>
            <p className="rf-wishlist-subtitle">
              {wishlist.length} {wishlist.length === 1 ? "recipe" : "recipes"} saved for later
            </p>
          </div>
        </div>

        {/* Content */}
        {wishlist.length === 0 ? (
          <div className="rf-wishlist-empty">
            <div className="rf-empty-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <h3 className="rf-empty-title">Your wishlist is empty</h3>
            <p className="rf-empty-description">Start exploring recipes and save your favorites here</p>
            <a href="/search" className="rf-btn rf-btn-primary rf-btn-lg">
              Discover Recipes
            </a>
          </div>
        ) : (
          <div className="rf-wishlist-grid">
            {wishlist.map((recipe, index) => (
              <div
                key={recipe.id}
                className="rf-wishlist-card"
                onClick={() => handleRecipeClick(recipe)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="rf-wishlist-image-container">
                  <img
                    src={recipe.image || "/placeholder.svg?height=200&width=300"}
                    alt={recipe.label}
                    className="rf-wishlist-image"
                  />
                  <button
                    className="rf-remove-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFromWishlist(recipe.id)
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                <div className="rf-wishlist-content">
                  <h3 className="rf-wishlist-recipe-title">{recipe.label}</h3>

                  <div className="rf-wishlist-stats">
                    <div className="rf-wishlist-stat">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12,6 12,12 16,14" />
                      </svg>
                      <span>{recipe.totalTime || 30} min</span>
                    </div>
                    <div className="rf-wishlist-stat">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                      </svg>
                      <span>{Math.round(recipe.calories || 250)} cal</span>
                    </div>
                  </div>

                  <div className="rf-wishlist-actions">
                    <button className="rf-btn rf-btn-primary rf-btn-sm">View Recipe</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Recipe Modal */}
        {selectedRecipe && (
          <div className="rf-recipe-modal-overlay" onClick={closeModal}>
            <div className="rf-recipe-modal" onClick={(e) => e.stopPropagation()}>
              <button className="rf-recipe-modal-close" onClick={closeModal}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <img
                src={selectedRecipe.image || "/placeholder.svg?height=300&width=600"}
                alt={selectedRecipe.label}
                className="rf-recipe-modal-image"
              />

              <div className="rf-recipe-modal-content">
                <h2 className="rf-recipe-modal-title">{selectedRecipe.label}</h2>

                <div className="rf-recipe-modal-stats">
                  <div className="rf-recipe-modal-stat">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12,6 12,12 16,14" />
                    </svg>
                    <span>{selectedRecipe.totalTime || 30} minutes</span>
                  </div>
                  <div className="rf-recipe-modal-stat">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                    </svg>
                    <span>{Math.round(selectedRecipe.calories || 250)} calories</span>
                  </div>
                  <div className="rf-recipe-modal-stat">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span>Serves {selectedRecipe.servings || 4}</span>
                  </div>
                </div>

                <div className="rf-recipe-modal-body">
                  <div>
                    <h3 className="rf-recipe-section-title">Ingredients</h3>
                    <ul className="rf-recipe-ingredients">
                      {(selectedRecipe.ingredients || []).map((ingredient, index) => (
                        <li key={index} className="rf-recipe-ingredient">
                          <div className="rf-ingredient-bullet"></div>
                          <span>{typeof ingredient === "string" ? ingredient : ingredient.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="rf-recipe-section-title">Instructions</h3>
                    <div className="rf-recipe-instructions">
                      {(selectedRecipe.instructions || ["Instructions will be available soon."]).map((step, index) => (
                        <div key={index} className="rf-recipe-instruction">
                          <div className="rf-instruction-number">{index + 1}</div>
                          <div className="rf-instruction-text">{step}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Wishlist
