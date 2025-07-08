"use client"

import { useState } from "react"
import { useNotification } from "../../components/NotificationContext"
import "./RecipeCard.css"

const RecipeCard = ({ recipe, delay = "0s" }) => {
  const [modalShow, setModalShow] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const { addNotification } = useNotification()

  const handleModalToggle = () => {
    setModalShow(!modalShow)
  }

  const handleFavorite = (e) => {
    e.stopPropagation()
    const user = JSON.parse(localStorage.getItem("user"))
    if (!user) {
      addNotification("Please login to add to wishlist", "error")
      return
    }

    const wishlistKey = `wishlist_${user.username}`
    const existingWishlist = JSON.parse(localStorage.getItem(wishlistKey)) || []

    const recipeData = {
      id: recipe.uri || recipe._id || Date.now(),
      label: recipe.label,
      image: recipe.image,
      totalTime: recipe.totalTime,
      calories: recipe.calories,
      ingredients: recipe.ingredients,
      servings: recipe.servings,
    }

    const isAlreadyFavorited = existingWishlist.some((item) => item.id === recipeData.id)

    if (isAlreadyFavorited) {
      const updatedWishlist = existingWishlist.filter((item) => item.id !== recipeData.id)
      localStorage.setItem(wishlistKey, JSON.stringify(updatedWishlist))
      setIsFavorited(false)
      addNotification("Recipe removed from wishlist", "success")
    } else {
      const updatedWishlist = [...existingWishlist, recipeData]
      localStorage.setItem(wishlistKey, JSON.stringify(updatedWishlist))
      setIsFavorited(true)
      addNotification("Recipe added to wishlist", "success")
    }
  }

  return (
    <>
      <div className="rf-recipe-card" onClick={handleModalToggle} style={{ animationDelay: delay }}>
        <div className="rf-recipe-image-container">
          <img
            src={recipe.image || "/placeholder.svg?height=200&width=300"}
            alt={recipe.label}
            className="rf-recipe-image"
          />
          <button className={`rf-recipe-favorite ${isFavorited ? "rf-favorited" : ""}`} onClick={handleFavorite}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={isFavorited ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>

        <div className="rf-recipe-content">
          <h3 className="rf-recipe-title">{recipe.label}</h3>

          <div className="rf-recipe-stats">
            <div className="rf-recipe-stat">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
              <span>{recipe.totalTime || 30} min</span>
            </div>
            <div className="rf-recipe-stat">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
              </svg>
              <span>{Math.round(recipe.calories || 250)} cal</span>
            </div>
            <div className="rf-recipe-stat">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>{recipe.servings || 4}</span>
            </div>
          </div>

          <button className="rf-recipe-view-btn">View Recipe</button>
        </div>
      </div>

      {/* Recipe Modal */}
      {modalShow && (
        <div className="rf-recipe-modal-overlay" onClick={handleModalToggle}>
          <div className="rf-recipe-modal" onClick={(e) => e.stopPropagation()}>
            <button className="rf-recipe-modal-close" onClick={handleModalToggle}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <img
              src={recipe.image || "/placeholder.svg?height=300&width=600"}
              alt={recipe.label}
              className="rf-recipe-modal-image"
            />

            <div className="rf-recipe-modal-content">
              <h2 className="rf-recipe-modal-title">{recipe.label}</h2>

              <div className="rf-recipe-modal-stats">
                <div className="rf-recipe-modal-stat">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12,6 12,12 16,14" />
                  </svg>
                  <span>{recipe.totalTime || 30} minutes</span>
                </div>
                <div className="rf-recipe-modal-stat">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                  </svg>
                  <span>{Math.round(recipe.calories || 250)} calories</span>
                </div>
                <div className="rf-recipe-modal-stat">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>Serves {recipe.servings || 4}</span>
                </div>
              </div>

              <div className="rf-recipe-modal-body">
                <div>
                  <h3 className="rf-recipe-section-title">Ingredients</h3>
                  <ul className="rf-recipe-ingredients">
                    {(recipe.ingredients || []).map((ingredient, index) => (
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
                    {(recipe.instructions || ["Instructions will be available soon."]).map((step, index) => (
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
    </>
  )
}

export default RecipeCard
