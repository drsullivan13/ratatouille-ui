import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

export default function RecipeList({ recipes }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {recipes.map((recipe, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
        >
          <h2 className="text-2xl font-serif text-amber-900 mb-3">{recipe.title}</h2>
          <p className="text-amber-800 mb-4">{recipe.description}</p>
          <Link 
            href={`/recipe/${index}`} 
            className="inline-flex items-center text-amber-600 hover:text-amber-700 transition duration-300"
          >
            <span className="mr-2">View Recipe</span>
            <FaArrowRight />
          </Link>
        </motion.div>
      ))}
    </div>
  );
}