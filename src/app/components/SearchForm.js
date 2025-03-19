export default function SearchForm({ formData, setFormData, handleSearch, hasApiKey }) {
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      if (type === 'checkbox') {
        setFormData((prev) => ({
          ...prev,
          dietary: checked ? [...prev.dietary, value] : prev.dietary.filter((item) => item !== value),
        }))
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }))
      }
    }

    const handlePantryIngredientsChange = (e) => {
      setFormData(prev => ({ 
        ...prev, 
        pantryIngredients: e.target.value
      }))
    }
    
    const handleKeyDown = (e) => {
      if ((e.key === 'Enter' || e.key === ',') && formData.pantryIngredients.trim()) {
        e.preventDefault()
        const ingredient = formData.pantryIngredients.trim().replace(/,$/, '')
        
        if (ingredient && !formData.pantryIngredientsArray.includes(ingredient)) {
          setFormData(prev => ({
            ...prev,
            pantryIngredients: '',
            pantryIngredientsArray: [...prev.pantryIngredientsArray, ingredient]
          }))
        }
      }
    }
    
    const removeIngredient = (index) => {
      setFormData(prev => ({
        ...prev,
        pantryIngredientsArray: prev.pantryIngredientsArray.filter((_, i) => i !== index)
      }))
    }

    const handleRecipeCountChange = (value) => {
      // Ensure value is between 1 and 10
      const count = Math.min(Math.max(1, value), 10)
      setFormData({...formData, recipeCount: count})
    }
  
    return (
      <form 
        onSubmit={(e) => { e.preventDefault(); handleSearch(); }} 
        className="p-8 rounded-xl shadow-md border border-stone-200"
        style={{ 
          backgroundColor: '#FFFCF5', 
          boxShadow: '0 4px 8px rgba(0,0,0,0.04)', 
          borderColor: '#E3D6C3' 
        }}
      >
        <div className="mb-8">
          <input
            type="text"
            name="dishType"
            value={formData.dishType}
            onChange={handleChange}
            placeholder="What would you like to cook?"
            required
            className="w-full p-4 text-lg border-b-2 border-stone-200 focus:border-teal-600 focus:outline-none bg-transparent text-stone-800 placeholder-stone-500 font-serif"
          />
        </div>
        
        <div className="mb-8">
          <label className="block text-stone-700 font-serif mb-2">
            Pantry Ingredients
            <div className="relative">
              <input
                type="text"
                value={formData.pantryIngredients || ''}
                onChange={handlePantryIngredientsChange}
                onKeyDown={handleKeyDown}
                placeholder="Type ingredient and press Enter"
                className="w-full p-3 mt-1 border border-stone-300 rounded-lg focus:border-teal-600 focus:outline-none text-stone-700 placeholder-stone-500 bg-white/80"
              />
              <p className="mt-1 text-xs text-stone-500 italic">Add ingredients from your pantry to use in recipes</p>
              
              {formData.pantryIngredientsArray && formData.pantryIngredientsArray.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {formData.pantryIngredientsArray.map((ingredient, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center text-stone-700 px-3 py-1.5 rounded-lg text-sm border group transition-colors"
                      style={{ backgroundColor: '#EFE9DB', borderColor: '#D3C7A6', fontFamily: 'serif' }}
                    >
                      {ingredient}
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="ml-1.5 w-4 h-4 rounded-full inline-flex items-center justify-center text-stone-500 hover:bg-teal-100 hover:text-teal-700"
                        aria-label={`Remove ${ingredient}`}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </label>
        </div>
  
        <div className="mb-8">
          <h3 className="text-xl font-serif text-stone-700 mb-4 border-b border-stone-200 pb-2">Dietary Preferences</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['gluten free', 'dairy free', 'vegan', 'vegetarian'].map((option) => (
              <label key={option} className="flex items-center space-x-2 text-stone-700 font-serif">
                <input
                  type="checkbox"
                  name="dietary"
                  value={option}
                  checked={formData.dietary.includes(option)}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-teal-600 rounded border-stone-300 focus:ring-teal-600"
                />
                <span className="capitalize">{option}</span>
              </label>
            ))}
          </div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-stone-700 mb-2 font-serif">
              Servings
              <input
                type="number"
                name="servings"
                value={formData.servings}
                onChange={handleChange}
                min="1"
                required
                className="w-full mt-1 p-2 border border-stone-300 rounded-lg focus:border-teal-600 focus:outline-none bg-white/80 text-stone-700"
              />
            </label>
          </div>
          <div>
            <label className="block text-stone-700 mb-2 font-serif">
              Difficulty
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-stone-300 rounded-lg focus:border-teal-600 focus:outline-none bg-white/80 text-stone-700"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </label>
          </div>
        </div>

        <div className="mb-6">
        <label className="block text-stone-700 mb-2 font-serif">Number of Recipes (1-10)</label>
        <div className="flex items-center">
          <button 
            type="button"
            onClick={() => handleRecipeCountChange(formData.recipeCount - 1)}
            className="bg-teal-600 text-white w-10 h-10 rounded-l flex items-center justify-center hover:bg-teal-700 transition"
            disabled={formData.recipeCount <= 1}
          >
            -
          </button>
          <input
            type="number"
            min="1"
            max="10"
            value={formData.recipeCount}
            onChange={(e) => handleRecipeCountChange(parseInt(e.target.value) || 1)}
            className="w-16 h-10 text-center border-t border-b border-stone-300 text-stone-700 focus:outline-none font-serif"
          />
          <button 
            type="button"
            onClick={() => handleRecipeCountChange(formData.recipeCount + 1)}
            className="bg-teal-600 text-white w-10 h-10 rounded-r flex items-center justify-center hover:bg-teal-700 transition"
            disabled={formData.recipeCount >= 10}
          >
            +
          </button>
        </div>
      </div>
  
        {hasApiKey ? (
          <button 
            type="submit" 
            className="w-full bg-teal-600 text-white p-4 rounded-lg hover:bg-teal-700 transition duration-300 font-medium text-lg font-serif shadow-sm"
          >
            Generate Recipes
          </button>
        ) : (
          <div className="space-y-3">
            <button 
              type="button"
              onClick={() => handleSearch()} // This will trigger the API key check and open settings
              className="w-full bg-stone-100 border border-stone-200 text-stone-500 p-4 rounded-lg hover:bg-stone-200 transition duration-300 font-medium text-lg font-serif shadow-sm"
            >
              Generate Recipes
            </button>
            <p className="text-center text-sm text-stone-500 italic">
              ⚙️ Please configure your LLM settings before generating recipes
            </p>
          </div>
        )}
      </form>
    )
  }