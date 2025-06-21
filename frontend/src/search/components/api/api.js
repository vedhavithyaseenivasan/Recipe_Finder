const appId = 'df4e4ade';
const apiKey = '926aac8d880d4b710e3df6ceae7d1e55';

export const fetchRecipes = async(query)=>{
    const url = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${apiKey}&from=0&to=10`;
    
  try {
    const response = await fetch(url);
    const data = await response.json();
    

    if (response.ok) {
      return data;  
    } else {
      console.error('Error fetching recipes:', data);
      throw new Error(data.message || 'Failed to fetch recipes');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};