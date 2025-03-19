'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BiTime, BiUser, BiDish } from 'react-icons/bi'
import { FaRegClock, FaUtensils } from 'react-icons/fa'

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
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F7F4EE' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center p-8 rounded-lg shadow-lg"
          style={{ backgroundColor: '#FFFCF5', borderColor: '#E3D6C3', border: '1px solid #E3D6C3' }}
        >
          <p className="text-red-500 text-lg mb-4" style={{ fontFamily: 'Garamond, Baskerville, serif' }}>Recipe not found.</p>
          <button 
            onClick={handleBackToSearch}
            className="px-6 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition duration-300 font-serif"
          >
            Back to Search
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: '#F7F4EE' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 max-w-4xl"
      >
        <div className="rounded-xl shadow-lg overflow-hidden" style={{ backgroundColor: '#FFFCF5', borderColor: '#E3D6C3', border: '1px solid #E3D6C3' }}>
          {/* Hero Section */}
          <div className="p-8 border-b" style={{ 
            background: 'linear-gradient(to right, #EFE9DB, #FFFCF5)', 
            borderColor: '#E3D6C3' 
          }}>
            <h1 className="text-4xl md:text-5xl font-serif text-stone-800 mb-4" style={{ fontFamily: 'Garamond, Baskerville, serif' }}>{recipe.title}</h1>
            <p className="text-lg text-stone-700 italic" style={{ fontFamily: 'Garamond, Baskerville, serif' }}>{recipe.description}</p>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6" style={{ backgroundColor: '#F7F4EE' }}>
            <QuickInfoCard icon={<BiTime />} title="Prep Time" value={`${recipe.prepTime} min`} />
            <QuickInfoCard icon={<FaRegClock />} title="Cook Time" value={`${recipe.cookTime} min`} />
            <QuickInfoCard icon={<BiUser />} title="Servings" value={recipe.servings} />
            <QuickInfoCard icon={<FaUtensils />} title="Difficulty" value={recipe.difficulty} />
          </div>

          <div className="p-8">
            {/* Ingredients Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif text-stone-800 mb-6 flex items-center border-b pb-2" style={{ fontFamily: 'Garamond, Baskerville, serif', borderColor: '#E3D6C3' }}>
                <BiDish className="mr-2 text-teal-700" /> Ingredients
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="flex items-center p-3 rounded-lg" style={{ backgroundColor: '#F7F4EE', border: '1px solid #EBE4D3' }}>
                    <span className="font-medium font-serif">{ing.amount}{ing.unit}</span>
                    <span className="ml-2 text-stone-700 font-serif">{ing.item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Steps Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-serif text-stone-800 mb-6 border-b pb-2" style={{ fontFamily: 'Garamond, Baskerville, serif', borderColor: '#E3D6C3' }}>Instructions</h2>
              <div className="space-y-6">
                {recipe.steps.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex"
                  >
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-teal-600 text-white rounded-full mr-4">
                      {idx + 1}
                    </span>
                    <p className="text-stone-700 leading-relaxed font-serif">{step}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Additional Sections... */}
            {/* Keep your nutritional and additional information sections with similar styling */}
          </div>

          <div className="p-8 border-t" style={{ backgroundColor: '#F7F4EE', borderColor: '#E3D6C3' }}>
            <button 
              onClick={handleBackToSearch}
              className="px-6 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition duration-300 font-serif"
            >
              Back to Search
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Helper component for quick info cards
function QuickInfoCard({ icon, title, value }) {
  return (
    <div className="flex items-center p-3 rounded-lg shadow-sm" style={{ 
      backgroundColor: '#FFFCF5', 
      border: '1px solid #E3D6C3'
    }}>
      <span className="text-teal-700 text-xl mr-3">{icon}</span>
      <div>
        <p className="text-sm text-stone-600 font-serif">{title}</p>
        <p className="font-medium text-stone-800 font-serif">{value}</p>
      </div>
    </div>
  )
}