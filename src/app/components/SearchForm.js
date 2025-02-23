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
    };
  
    return (
      <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Recipe Search</h1>
        <input
          type="text"
          name="dishType"
          value={formData.dishType}
          onChange={handleChange}
          placeholder="Enter dish type (e.g., Meatloaf)"
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Dietary Preferences</h3>
          <div className="flex flex-wrap gap-4">
            {['gluten free', 'dairy free', 'vegan', 'vegetarian'].map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  name="dietary"
                  value={option}
                  checked={formData.dietary.includes(option)}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-gray-700">{option.charAt(0).toUpperCase() + option.slice(1)}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Servings:
            <input
              type="number"
              name="servings"
              value={formData.servings}
              onChange={handleChange}
              min="1"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Difficulty:
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200">
          Search Recipes
        </button>
      </form>
    );
  }