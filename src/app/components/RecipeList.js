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
          className="p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
          style={{ 
            backgroundColor: '#FFFCF5', 
            borderColor: '#E3D6C3',
            border: '1px solid #E3D6C3'
          }}
        >
          <h2 className="text-2xl font-serif text-stone-800 mb-3" style={{ fontFamily: 'Garamond, Baskerville, serif' }}>{recipe.title}</h2>
          <p className="text-stone-700 mb-4" style={{ fontFamily: 'Garamond, Baskerville, serif' }}>{recipe.description}</p>
          <Link 
            href={`/recipe/${index}`} 
            className="inline-flex items-center text-teal-700 hover:text-teal-800 transition duration-300"
          >
            <span className="mr-2">View Recipe</span>
            <FaArrowRight />
          </Link>
        </motion.div>
      ))}
    </div>
  );
}