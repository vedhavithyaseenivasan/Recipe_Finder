const appId = "184bb69b"
const apiKey = "c6a4f5cc2c3d863e370e2d978382677e"

export const fetchRecipes = async (query) => {
  const url = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${apiKey}&from=0&to=10`

  try {
    const response = await fetch(url)
    const data = await response.json()

    console.log("API Response:", data) // Debug log

    if (response.ok) {
      return data
    } else {
      console.error("Error fetching recipes:", data)
      throw new Error(data.message || "Failed to fetch recipes")
    }
  } catch (error) {
    console.error("Error:", error)
    throw error
  }
}
