import React, { useState } from 'react';
import axios from 'axios';

const RecipeForm = () => {
  const [formData, setFormData] = useState({
    label: '',
    image: '',
    totalTime: '',
    calories: '',
    ingredients: ['']
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleIngredientChange = (e, index) => {
    const updatedIngredients = formData.ingredients.map((ingredient, i) =>
      i === index ? e.target.value : ingredient
    );
    setFormData({
      ...formData,
      ingredients: updatedIngredients
    });
  };

  const handleAddIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, '']
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://recipe-finder-backend-cw2w.onrender.com/recipes', formData);
      setMessage(res?.data?.message || 'Recipe saved successfully!');
    } catch (err) {
      setMessage(err?.response?.data?.message || 'Error saving recipe');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '30px',
      background: 'linear-gradient(135deg, #e8f7ff, #d1e9f7)',
      minHeight: '100vh',
      fontFamily: 'Poppins, sans-serif',
      color: '#333',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
      transition: 'background-color 0.5s ease'
    }}>
      <h2 style={{
        fontSize: '2.5em',
        color: '#256D85',
        marginBottom: '20px',
        textAlign: 'center',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
        transition: 'color 0.3s'
      }}>Create Your Delicious Recipe</h2>
      <form onSubmit={handleSubmit} style={{
        backgroundColor: '#ffffff',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '600px',
        border: '1px solid #e0e7ff',
        transform: 'scale(1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.03)';
        e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.1)';
      }}>
        <div style={{ marginBottom: '25px' }}>
          <label style={{ fontWeight: '700', marginBottom: '10px', display: 'block', fontSize: '1.1em' }}>Recipe Name</label>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              name="label"
              value={formData.label}
              onChange={handleChange}
              required
              placeholder="E.g., Spaghetti Bolognese"
              style={{
                width: '100%',
                padding: '12px 16px',
                paddingLeft: '40px',
                borderRadius: '10px',
                border: '1px solid #d1d5db',
                boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
                outline: 'none',
                transition: 'border-color 0.3s, box-shadow 0.3s',
                fontSize: '1em'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#256D85';
                e.target.style.boxShadow = '0px 0px 8px rgba(37, 109, 133, 0.2)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db';
                e.target.style.boxShadow = 'inset 0 1px 3px rgba(0, 0, 0, 0.1)';
              }}
            />
            <span style={{
              position: 'absolute',
              top: '50%',
              left: '10px',
              transform: 'translateY(-50%)',
              fontSize: '1.2em',
              color: '#256D85',
            }}>🍴</span>
          </div>
        </div>
        <div style={{ marginBottom: '25px' }}>
          <label style={{ fontWeight: '700', marginBottom: '10px', display: 'block', fontSize: '1.1em' }}>Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            placeholder="E.g., https://example.com/image.jpg"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '10px',
              border: '1px solid #d1d5db',
              boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
              outline: 'none',
              transition: 'border-color 0.3s, box-shadow 0.3s',
              fontSize: '1em'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#256D85';
              e.target.style.boxShadow = '0px 0px 8px rgba(37, 109, 133, 0.2)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'inset 0 1px 3px rgba(0, 0, 0, 0.1)';
            }}
          />
        </div>
        <div style={{ marginBottom: '25px' }}>
          <label style={{ fontWeight: '700', marginBottom: '10px', display: 'block', fontSize: '1.1em' }}>Total Time (minutes)</label>
          <input
            type="number"
            name="totalTime"
            value={formData.totalTime}
            onChange={handleChange}
            required
            placeholder="E.g., 45"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '10px',
              border: '1px solid #d1d5db',
              boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
              outline: 'none',
              transition: 'border-color 0.3s, box-shadow 0.3s',
              fontSize: '1em'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#256D85';
              e.target.style.boxShadow = '0px 0px 8px rgba(37, 109, 133, 0.2)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'inset 0 1px 3px rgba(0, 0, 0, 0.1)';
            }}
          />
        </div>
        <div style={{ marginBottom: '25px' }}>
          <label style={{ fontWeight: '700', marginBottom: '10px', display: 'block', fontSize: '1.1em' }}>Calories</label>
          <input
            type="number"
            name="calories"
            value={formData.calories}
            onChange={handleChange}
            required
            placeholder="E.g., 300"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '10px',
              border: '1px solid #d1d5db',
              boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
              outline: 'none',
              transition: 'border-color 0.3s, box-shadow 0.3s',
              fontSize: '1em'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#256D85';
              e.target.style.boxShadow = '0px 0px 8px rgba(37, 109, 133, 0.2)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'inset 0 1px 3px rgba(0, 0, 0, 0.1)';
            }}
          />
        </div>
        <label style={{ fontWeight: '700', marginBottom: '10px', display: 'block', fontSize: '1.1em' }}>Ingredients</label>
        {formData.ingredients.map((ingredient, index) => (
          <input
            key={index}
            type="text"
            value={ingredient}
            onChange={(e) => handleIngredientChange(e, index)}
            required
            placeholder={`Ingredient ${index + 1}`}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '10px',
              border: '1px solid #d1d5db',
              boxShadow: 'inset 0px 2px 4px rgba(0, 0, 0, 0.08)',
              outline: 'none',
              marginBottom: '10px',
              transition: 'border-color 0.3s, box-shadow 0.3s',
              fontSize: '1em'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#256D85';
              e.target.style.boxShadow = '0px 0px 8px rgba(37, 109, 133, 0.2)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'inset 0px 2px 4px rgba(0, 0, 0, 0.08)';
            }}
          />
        ))}
        <button type="button" onClick={handleAddIngredient} style={{
          backgroundColor: '#256D85',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          padding: '10px 15px',
          cursor: 'pointer',
          marginTop: '10px',
          transition: 'background-color 0.3s, transform 0.3s',
          outline: 'none',
          fontSize: '1em'
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#1f5669';
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#256D85';
          e.target.style.transform = 'scale(1)';
        }}
        >Add Ingredient</button>
        <button type="submit" style={{
          backgroundColor: '#F26419',
          color: '#fff',
          border: 'none',
          borderRadius: '10px',
          padding: '15px 25px',
          cursor: 'pointer',
          fontWeight: '700',
          fontSize: '1.2em',
          marginTop: '20px',
          width: '100%',
          transition: 'background-color 0.3s, transform 0.3s',
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#d14d17';
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#F26419';
          e.target.style.transform = 'scale(1)';
        }}
        onMouseDown={(e) => {
          e.target.style.transform = 'scale(0.98)';
        }}
        onMouseUp={(e) => {
          e.target.style.transform = 'scale(1.05)';
        }}
        >Submit Recipe</button>
      </form>
      {message && <p style={{
        marginTop: '20px',
        color: message.includes('successfully') ? '#4CAF50' : '#E63946',
        fontWeight: '600',
        transition: 'color 0.3s'
      }}>{message}</p>}
    </div>
  );
};

export default RecipeForm;
