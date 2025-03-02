'use client'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBookOpen, FaSearch } from 'react-icons/fa';
import SearchForm from './components/SearchForm';
import RecipeList from './components/RecipeList';

export default function Home() {
  const [formData, setFormData] = useState({
    dishType: '',
    dietary: [],
    servings: 4,
    difficulty: 'medium',
    recipeCount: 3
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
    <div className="min-h-screen bg-amber-50 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 max-w-4xl"
      >
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <FaBookOpen className="text-6xl text-amber-600" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-serif text-amber-900 mb-4">
            Ratatouille
          </h1>
          <p className="text-lg text-amber-800">
            Discover personalized recipes tailored to your preferences
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-12">
          <SearchForm 
            formData={formData} 
            setFormData={setFormData} 
            handleSearch={handleSearch} 
          />
        </div>

        {/* Results Section */}
        <div>
          {loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center p-8"
            >
              <div className="inline-block animate-spin text-amber-600 mb-4">
                <FaSearch className="text-3xl" />
              </div>
              <p className="text-amber-800">Crafting your recipes...</p>
            </motion.div>
          )}

          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4 text-center text-red-600"
            >
              Error: {error}
            </motion.div>
          )}

          {recipes.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <RecipeList recipes={recipes} />
            </motion.div>
          ) : (
            !loading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center p-8 bg-white rounded-lg shadow-sm"
              >
                <p className="text-amber-800">
                  Enter a dish type above to discover delicious recipes
                </p>
              </motion.div>
            )
          )}
        </div>
      </motion.div>
    </div>
  );
}