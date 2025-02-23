'use client'

import { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import RecipeList from './components/RecipeList';

export default function Home() {
  const [formData, setFormData] = useState({
    dishType: '',
    dietary: [],
    servings: 4,
    difficulty: 'medium',
  });
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedRecipes = sessionStorage.getItem('recipes');
    const storedFormData = sessionStorage.getItem('formData');
    
    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes));
    }
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

  const fetchRecipes = async (searchParams) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchParams),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch recipes');
      }
      const data = await response.json();
      setRecipes(data);
      sessionStorage.setItem('recipes', JSON.stringify(data));
      sessionStorage.setItem('formData', JSON.stringify(formData));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const searchParams = {
      dishType: formData.dishType,
      preferences: {
        dietary: formData.dietary,
        servings: formData.servings,
        difficulty: formData.difficulty,
      },
    };
    fetchRecipes(searchParams);
  };

  return (
    <div className="container mx-auto p-4">
      <SearchForm formData={formData} setFormData={setFormData} handleSearch={handleSearch} />
      {loading && <p className="text-center text-gray-500 mt-4">Loading...</p>}
      {error && <p className="text-center text-red-500 mt-4">Error: {error}</p>}
      {recipes.length > 0 ? (
        <RecipeList recipes={recipes} />
      ) : (
        !loading && <p className="text-center text-gray-500 mt-4">Enter a dish type to search for recipes.</p>
      )}
    </div>
  );
}