import Link from 'next/link';

export default function RecipeList({ recipes }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200">
          <h2 className="text-xl font-semibold mb-2 text-gray-800">{recipe.title}</h2>
          <p className="text-gray-600 mb-4">{recipe.description}</p>
          <Link href={`/recipe/${index}`} className="text-blue-500 hover:underline">
            View Recipe
          </Link>
        </div>
      ))}
    </div>
  );
}