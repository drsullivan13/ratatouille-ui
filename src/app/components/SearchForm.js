export default function SearchForm({ formData, setFormData, handleSearch }) {
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      if (type === 'checkbox') {
        setFormData((prev) => ({
          ...prev,
          dietary: checked ? [...prev.dietary, value] : prev.dietary.filter((item) => item !== value),
        }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    }

    const handleRecipeCountChange = (value) => {
      // Ensure value is between 1 and 10
      const count = Math.min(Math.max(1, value), 10);
      setFormData({...formData, recipeCount: count});
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
    );
  }