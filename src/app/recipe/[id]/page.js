'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function RecipePage() {
  const params = useParams()
  const router = useRouter()
  const [recipe, setRecipe] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const recipes = JSON.parse(sessionStorage.getItem('recipes') || '[]')
    const foundRecipe = recipes[parseInt(params.id, 10)]
    if (foundRecipe) {
      setRecipe(foundRecipe)
    } else {
      setError(true)
    }
  }, [params.id])

  const handleBackToSearch = (e) => {
    e.preventDefault();
    router.push('/');
  };

  if (error || !recipe) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500">Recipe not found.</p>
        <button 
          onClick={handleBackToSearch}
          className="text-blue-500 hover:underline"
        >
          Back to Search
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">{recipe.title}</h1>
        <p className="text-gray-600 italic mb-6">{recipe.description}</p>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Ingredients</h2>
          <ul className="list-disc ml-6 text-gray-700">
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx}>{ing.amount}{ing.unit} {ing.item}</li>
            ))}
          </ul>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Steps</h2>
          <ol className="list-decimal ml-6 text-gray-700">
            {recipe.steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Additional Information</h2>
          <p><strong>Servings:</strong> {recipe.servings}</p>
          <p><strong>Prep Time:</strong> {recipe.prepTime}</p>
          <p><strong>Cook Time:</strong> {recipe.cookTime}</p>
          <p><strong>Total Time:</strong> {recipe.totalTime} minutes</p>
          <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
          <p><strong>Dietary Info:</strong> {recipe.dietaryInfo}</p>
        </section>
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-gray-700">Nutritional Information</h2>
          <p><strong>Calories:</strong> {recipe.nutritionalInfo.calories} kcal</p>
          <p><strong>Protein:</strong> {recipe.nutritionalInfo.protein}</p>
          <p><strong>Fat:</strong> {recipe.nutritionalInfo.fat}</p>
          <p><strong>Carbohydrates:</strong> {recipe.nutritionalInfo.carbohydrates}</p>
          <p><strong>Sugar:</strong> {recipe.nutritionalInfo.sugar}</p>
        </section>
        <button 
          onClick={handleBackToSearch}
          className="text-blue-500 hover:underline"
        >
          Back to Search
        </button>
      </div>
    </div>
  );
}