'use client'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBookOpen, FaSearch } from 'react-icons/fa';
import SearchForm from './components/SearchForm';
import RecipeList from './components/RecipeList';
import SettingsMenu from './components/SettingsMenu';

export default function Home() {
  const [formData, setFormData] = useState({
    dishType: '',
    dietary: [],
    servings: 4,
    difficulty: 'medium',
    recipeCount: 3,
    pantryIngredients: '',
    pantryIngredientsArray: []
  });
  const [settings, setSettings] = useState({
    model: 'openai', // Default model
    apiKey: ''
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedRecipes = sessionStorage.getItem('recipes');
    const storedFormData = sessionStorage.getItem('formData');
    const storedModel = localStorage.getItem('ratatouille_model');
    
    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes));
    }
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
    if (storedModel) {
      setSettings(prev => ({
        ...prev,
        model: storedModel
      }));
    }
  }, []);

  // Save only the selected model to localStorage
  useEffect(() => {
    localStorage.setItem('ratatouille_model', settings.model);
  }, [settings.model]);

  const fetchRecipes = async (searchParams) => {
    setLoading(true);
    setError(null);
    try {
      if (!settings.apiKey) {
        throw new Error('Please provide an API key in settings');
      }
      
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'X-LLM-Model': settings.model,
          'X-API-Key': settings.apiKey
        },
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
    // Check if API key is provided
    if (!settings.apiKey) {
      setError("Please select a model and provide an API key in settings");
      setIsSettingsOpen(true); // Open settings panel
      return;
    }
    
    const searchParams = {
      dishType: formData.dishType,
      preferences: {
        dietary: formData.dietary,
        servings: formData.servings,
        difficulty: formData.difficulty,
        recipeCount: formData.recipeCount,
        pantryIngredients: formData.pantryIngredientsArray
      },
    };
    fetchRecipes(searchParams);
  };

  return (
    <div className="min-h-screen py-8" style={{ 
        backgroundColor: '#F7F4EE',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23cfc5b4\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")'
    }}>
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
            <FaBookOpen className="text-6xl text-teal-700" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-serif text-stone-800 mb-4" style={{ fontFamily: 'Garamond, Baskerville, serif' }}>
            Ratatouille
          </h1>
          <p className="text-lg text-stone-700" style={{ fontFamily: 'Garamond, Baskerville, serif' }}>
            Discover personalized recipes tailored to your preferences
          </p>
        </div>

        {/* Settings Menu */}
        <div className="mb-4">
          <SettingsMenu
            settings={settings}
            setSettings={setSettings}
            isOpen={isSettingsOpen}
            setIsOpen={setIsSettingsOpen}
          />
        </div>

        {/* Search Section */}
        <div className="mb-12">
          <SearchForm 
            formData={formData} 
            setFormData={setFormData} 
            handleSearch={handleSearch}
            hasApiKey={Boolean(settings.apiKey)}
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
                {settings.apiKey ? (
                  <p className="text-amber-800">
                    Enter a dish type above to discover delicious recipes
                  </p>
                ) : (
                  <div className="space-y-3">
                    <p className="text-amber-800">
                      Welcome to Ratatouille! To get started:
                    </p>
                    <ol className="text-sm text-stone-700 list-decimal list-inside space-y-2 max-w-md mx-auto text-left">
                      <li>Click the <span className="font-semibold">Settings</span> button above</li>
                      <li>Select your preferred LLM model (OpenAI, Anthropic, Grok, or Perplexity)</li>
                      <li>Enter your API key for the selected model</li>
                      <li>Then you&apos;ll be ready to generate personalized recipes!</li>
                    </ol>
                    <button 
                      onClick={() => setIsSettingsOpen(true)}
                      className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
                    >
                      Open Settings
                    </button>
                  </div>
                )}
              </motion.div>
            )
          )}
        </div>
      </motion.div>
    </div>
  );
}