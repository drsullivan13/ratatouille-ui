export default function SearchForm({ formData, setFormData, handleSearch }) {
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
        className="bg-white p-8 rounded-xl shadow-lg"
      >
        <div className="mb-8">
          <input
            type="text"
            name="dishType"
            value={formData.dishType}
            onChange={handleChange}
            placeholder="What would you like to cook?"
            required
            className="w-full p-4 text-lg border-b-2 border-amber-200 focus:border-amber-600 focus:outline-none bg-transparent text-amber-900 placeholder-amber-400"
          />
        </div>
        
        <div className="mb-8">
          <label className="block text-amber-900 font-serif mb-2">
            Pantry Ingredients
            <div className="relative">
              <input
                type="text"
                value={formData.pantryIngredients || ''}
                onChange={handlePantryIngredientsChange}
                onKeyDown={handleKeyDown}
                placeholder="Type ingredient and press Enter"
                className="w-full p-3 mt-1 border-2 border-amber-200 rounded-lg focus:border-amber-600 focus:outline-none text-amber-800 placeholder-amber-800/60"
              />
              <p className="mt-1 text-xs text-amber-700">Add ingredients from your pantry to use in recipes</p>
              
              {formData.pantryIngredientsArray && formData.pantryIngredientsArray.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {formData.pantryIngredientsArray.map((ingredient, index) => (
                    <span 
                      key={index} 
                      className="inline-flex items-center bg-amber-100 text-amber-800 px-3 py-1.5 rounded-full text-sm border border-amber-200 group hover:bg-amber-200 transition-colors"
                    >
                      {ingredient}
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="ml-1.5 w-4 h-4 rounded-full inline-flex items-center justify-center text-amber-800/70 hover:bg-amber-300 hover:text-amber-900"
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
          <h3 className="text-xl font-serif text-amber-900 mb-4">Dietary Preferences</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['gluten free', 'dairy free', 'vegan', 'vegetarian'].map((option) => (
              <label key={option} className="flex items-center space-x-2 text-amber-800">
                <input
                  type="checkbox"
                  name="dietary"
                  value={option}
                  checked={formData.dietary.includes(option)}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-amber-600 rounded border-amber-300"
                />
                <span className="capitalize">{option}</span>
              </label>
            ))}
          </div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-amber-900 mb-2 font-serif">
              Servings
              <input
                type="number"
                name="servings"
                value={formData.servings}
                onChange={handleChange}
                min="1"
                required
                className="w-full mt-1 p-2 border-2 border-amber-200 rounded-lg focus:border-amber-600 focus:outline-none"
              />
            </label>
          </div>
          <div>
            <label className="block text-amber-900 mb-2 font-serif">
              Difficulty
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full mt-1 p-2 border-2 border-amber-200 rounded-lg focus:border-amber-600 focus:outline-none"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </label>
          </div>
        </div>

        <div className="mb-4">
        <label className="block text-amber-800 mb-2">Number of Recipes (1-10)</label>
        <div className="flex items-center">
          <button 
            type="button"
            onClick={() => handleRecipeCountChange(formData.recipeCount - 1)}
            className="bg-amber-500 text-white w-10 h-10 rounded-l flex items-center justify-center hover:bg-amber-600 transition"
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
            className="w-16 h-10 text-center border-t border-b border-amber-300 focus:outline-none"
          />
          <button 
            type="button"
            onClick={() => handleRecipeCountChange(formData.recipeCount + 1)}
            className="bg-amber-500 text-white w-10 h-10 rounded-r flex items-center justify-center hover:bg-amber-600 transition"
            disabled={formData.recipeCount >= 10}
          >
            +
          </button>
        </div>
      </div>
  
        <button 
          type="submit" 
          className="w-full bg-amber-600 text-white p-4 rounded-lg hover:bg-amber-700 transition duration-300 font-medium text-lg"
        >
          Generate Recipes
        </button>
      </form>
    )
  }