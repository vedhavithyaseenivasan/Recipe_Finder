"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import "./dashboard.css"

const RecipeForm = () => {
  const [activeTab, setActiveTab] = useState("create")
  const [formData, setFormData] = useState({
    label: "",
    image: "",
    totalTime: "",
    calories: "",
    servings: "",
    ingredients: [""],
  })
  const [recipes, setRecipes] = useState([])
  const [users, setUsers] = useState([])
  const [stats, setStats] = useState({
    totalRecipes: 0,
    totalUsers: 0,
    totalAdmins: 0,
  })

  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Check if user is admin
  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      navigate("/login")
      return
    }

    const user = JSON.parse(userData)
    if (user.role !== "admin") {
      navigate("/") // Redirect non-admin users
      return
    }

    // Load dashboard data
    loadDashboardData()
  }, [navigate])

  const loadDashboardData = async () => {
    try {
      // Load recipes
      const recipesRes = await axios.get("https://recipe-finder-x2s0.onrender.com/recipes")
      setRecipes(recipesRes.data)

      // Load users (you'll need to create this endpoint)
      try {
        const usersRes = await axios.get("https://recipe-finder-x2s0.onrender.com/admin/users")
        setUsers(usersRes.data)
      } catch (err) {
        console.log("Users endpoint not available")
      }

      // Calculate stats
      setStats({
        totalRecipes: recipesRes.data.length,
        totalUsers: users.length,
        totalAdmins: users.filter((user) => user.role === "admin").length,
      })
    } catch (error) {
      console.error("Error loading dashboard data:", error)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleIngredientChange = (e, index) => {
    const updatedIngredients = formData.ingredients.map((ingredient, i) => (i === index ? e.target.value : ingredient))
    setFormData({
      ...formData,
      ingredients: updatedIngredients,
    })
  }

  const handleAddIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, ""],
    })
  }

  const handleRemoveIngredient = (index) => {
    if (formData.ingredients.length > 1) {
      const updatedIngredients = formData.ingredients.filter((_, i) => i !== index)
      setFormData({
        ...formData,
        ingredients: updatedIngredients,
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    try {
      const res = await axios.post("https://recipe-finder-x2s0.onrender.com/recipes", formData)
      setMessage("Recipe created successfully!")
      setFormData({
        label: "",
        image: "",
        totalTime: "",
        calories: "",
        servings: "",
        ingredients: [""],
      })
      loadDashboardData() // Refresh data
    } catch (err) {
      setMessage("Error creating recipe. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteRecipe = async (recipeId) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        await axios.delete(`https://recipe-finder-x2s0.onrender.com/recipes/${recipeId}`)
        setMessage("Recipe deleted successfully!")
        loadDashboardData()
      } catch (error) {
        setMessage("Error deleting recipe.")
      }
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    navigate("/")
  }

  return (
    <div className="rf-admin-dashboard">
      <div className="rf-admin-container">
        {/* Header */}
        <div className="rf-admin-header">
          <div className="rf-admin-header-content">
            <div>
              <div className="rf-admin-logo">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h1 className="rf-admin-title">Admin Dashboard</h1>
              <p className="rf-admin-subtitle">Manage recipes and monitor your platform</p>
            </div>
            <button onClick={handleLogout} className="rf-logout-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16,17 21,12 16,7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="rf-stats-grid">
          <div className="rf-stat-card">
            <div className="rf-stat-icon rf-stat-recipes">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="m16 10-4 4-4-4" />
              </svg>
            </div>
            <div className="rf-stat-content">
              <h3 className="rf-stat-number">{stats.totalRecipes}</h3>
              <p className="rf-stat-label">Total Recipes</p>
            </div>
          </div>

          <div className="rf-stat-card">
            <div className="rf-stat-icon rf-stat-users">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div className="rf-stat-content">
              <h3 className="rf-stat-number">{stats.totalUsers}</h3>
              <p className="rf-stat-label">Total Users</p>
            </div>
          </div>

          <div className="rf-stat-card">
            <div className="rf-stat-icon rf-stat-admins">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="rf-stat-content">
              <h3 className="rf-stat-number">{stats.totalAdmins}</h3>
              <p className="rf-stat-label">Admins</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="rf-admin-tabs">
          <button
            className={`rf-tab-btn ${activeTab === "create" ? "rf-active" : ""}`}
            onClick={() => setActiveTab("create")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Create Recipe
          </button>
          <button
            className={`rf-tab-btn ${activeTab === "manage" ? "rf-active" : ""}`}
            onClick={() => setActiveTab("manage")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="m16 10-4 4-4-4" />
            </svg>
            Manage Recipes
          </button>
          <button
            className={`rf-tab-btn ${activeTab === "users" ? "rf-active" : ""}`}
            onClick={() => setActiveTab("users")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Users
          </button>
        </div>

        {/* Success/Error Message */}
        {message && (
          <div className={`rf-admin-message ${message.includes("successfully") ? "rf-success" : "rf-error"}`}>
            {message}
          </div>
        )}

        {/* Tab Content */}
        {activeTab === "create" && (
          <div className="rf-admin-form-card">
            <h2 className="rf-section-title">Create New Recipe</h2>
            <form onSubmit={handleSubmit} className="rf-admin-form">
              {/* Recipe Name */}
              <div className="rf-admin-form-group">
                <label className="rf-admin-form-label">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="m16 10-4 4-4-4" />
                  </svg>
                  Recipe Name
                </label>
                <input
                  type="text"
                  name="label"
                  value={formData.label}
                  onChange={handleChange}
                  placeholder="e.g., Spaghetti Carbonara"
                  className="rf-admin-input"
                  required
                />
              </div>

              {/* Image URL */}
              <div className="rf-admin-form-group">
                <label className="rf-admin-form-label">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/recipe-image.jpg"
                  className="rf-admin-input"
                  required
                />
                {formData.image && (
                  <div className="rf-admin-image-preview">
                    <img
                      src={formData.image || "/placeholder.svg"}
                      alt="Recipe preview"
                      className="rf-admin-preview-image"
                      onError={(e) => {
                        e.currentTarget.style.display = "none"
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Time, Calories, and Servings */}
              <div className="rf-admin-grid">
                <div className="rf-admin-form-group">
                  <label className="rf-admin-form-label">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12,6 12,12 16,14" />
                    </svg>
                    Total Time (minutes)
                  </label>
                  <input
                    type="number"
                    name="totalTime"
                    value={formData.totalTime}
                    onChange={handleChange}
                    placeholder="30"
                    className="rf-admin-input"
                    required
                    min="1"
                  />
                </div>
                <div className="rf-admin-form-group">
                  <label className="rf-admin-form-label">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                    </svg>
                    Calories
                  </label>
                  <input
                    type="number"
                    name="calories"
                    value={formData.calories}
                    onChange={handleChange}
                    placeholder="450"
                    className="rf-admin-input"
                    required
                    min="1"
                  />
                </div>
                <div className="rf-admin-form-group">
                  <label className="rf-admin-form-label">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    Servings
                  </label>
                  <input
                    type="number"
                    name="servings"
                    value={formData.servings}
                    onChange={handleChange}
                    placeholder="4"
                    className="rf-admin-input"
                    required
                    min="1"
                  />
                </div>
              </div>

              {/* Ingredients */}
              <div className="rf-admin-form-group rf-admin-ingredients-section">
                <label className="rf-admin-form-label">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 11H5a2 2 0 0 0-2 2v3c0 1.1.9 2 2 2h4m6-6h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-4m-6 0V9a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2z" />
                  </svg>
                  Ingredients
                </label>
                <div className="rf-admin-ingredients-list">
                  {formData.ingredients.map((ingredient, index) => (
                    <div key={index} className="rf-admin-ingredient-item">
                      <input
                        type="text"
                        value={ingredient}
                        onChange={(e) => handleIngredientChange(e, index)}
                        placeholder={`Ingredient ${index + 1}`}
                        className="rf-admin-input rf-admin-ingredient-input"
                        required
                      />
                      {formData.ingredients.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveIngredient(index)}
                          className="rf-admin-remove-btn"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button type="button" onClick={handleAddIngredient} className="rf-admin-add-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Add Ingredient
                </button>
              </div>

              {/* Submit Button */}
              <button type="submit" disabled={loading} className="rf-admin-submit-btn">
                {loading ? (
                  <div className="rf-loading-spinner"></div>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                      <polyline points="17,21 17,13 7,13 7,21" />
                      <polyline points="7,3 7,8 15,8" />
                    </svg>
                    Create Recipe
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {activeTab === "manage" && (
          <div className="rf-admin-form-card">
            <h2 className="rf-section-title">Manage Recipes</h2>
            <div className="rf-recipes-table">
              {recipes.length > 0 ? (
                <div className="rf-table-container">
                  <table className="rf-table">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Time</th>
                        <th>Calories</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recipes.map((recipe) => (
                        <tr key={recipe._id}>
                          <td>
                            <img
                              src={recipe.image || "/placeholder.svg"}
                              alt={recipe.label}
                              className="rf-table-image"
                            />
                          </td>
                          <td className="rf-recipe-name">{recipe.label}</td>
                          <td>{recipe.totalTime} min</td>
                          <td>{recipe.calories} cal</td>
                          <td>
                            <button
                              onClick={() => handleDeleteRecipe(recipe._id)}
                              className="rf-delete-btn"
                              title="Delete Recipe"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                              >
                                <polyline points="3,6 5,6 21,6" />
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="rf-empty-state">
                  <p>No recipes found. Create your first recipe!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="rf-admin-form-card">
            <h2 className="rf-section-title">User Management</h2>
            <div className="rf-users-grid">
              <div className="rf-user-card">
                <h3>Total Users</h3>
                <p className="rf-user-count">{stats.totalUsers}</p>
              </div>
              <div className="rf-user-card">
                <h3>Active Admins</h3>
                <p className="rf-user-count">{stats.totalAdmins}</p>
              </div>
              <div className="rf-user-card">
                <h3>Regular Users</h3>
                <p className="rf-user-count">{stats.totalUsers - stats.totalAdmins}</p>
              </div>
            </div>
            <p className="rf-feature-note">
              📝 User management features coming soon! This will include user roles, activity monitoring, and more.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecipeForm
