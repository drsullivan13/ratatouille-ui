'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaCog, FaEye, FaEyeSlash } from 'react-icons/fa'

export default function SettingsMenu({ settings, setSettings, isOpen, setIsOpen }) {
  const [showApiKey, setShowApiKey] = useState(false)
  const [apiKeys, setApiKeys] = useState({})
  
  const models = [
    { id: 'openai', name: 'OpenAI' },
    { id: 'anthropic', name: 'Anthropic' },
    { id: 'grok', name: 'Grok' },
    { id: 'perplexity', name: 'Perplexity' },
  ]
  
  // Load all saved API keys on component mount
  useEffect(() => {
    const savedApiKeys = localStorage.getItem('ratatouille_api_keys')
    if (savedApiKeys) {
      setApiKeys(JSON.parse(savedApiKeys))
    }
  }, [])
  
  // When settings change or component mounts, ensure the current API key is set
  useEffect(() => {
    if (apiKeys[settings.model]) {
      setSettings(prev => ({
        ...prev,
        apiKey: apiKeys[settings.model]
      }))
    }
  }, [apiKeys, settings.model, setSettings])
  
  const handleModelChange = (modelId) => {
    setSettings(prev => ({
      ...prev,
      model: modelId,
      apiKey: apiKeys[modelId] || ''
    }))
  }
  
  const handleApiKeyChange = (e) => {
    const newApiKey = e.target.value
    
    // Update the current API key in settings
    setSettings(prev => ({
      ...prev,
      apiKey: newApiKey
    }))
    
    // Save this API key for this specific model
    const updatedApiKeys = {
      ...apiKeys,
      [settings.model]: newApiKey
    }
    
    setApiKeys(updatedApiKeys)
    localStorage.setItem('ratatouille_api_keys', JSON.stringify(updatedApiKeys))
  }
  
  const toggleApiKeyVisibility = () => {
    setShowApiKey(!showApiKey)
  }
  
  return (
    <div className="mb-6">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-stone-700 hover:text-teal-600 mb-2 transition-colors duration-200"
      >
        <FaCog className={`${isOpen ? 'text-teal-600' : ''}`} />
        <span className="font-serif">Settings</span>
      </button>
      
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="p-5 rounded-xl shadow-md border border-stone-200 mb-6"
          style={{ 
            backgroundColor: '#FFFCF5', 
            boxShadow: '0 4px 8px rgba(0,0,0,0.04)', 
            borderColor: '#E3D6C3' 
          }}
        >
          <h3 className="text-lg font-serif text-stone-700 mb-4 border-b border-stone-200 pb-2">Model Settings</h3>
          
          <div className="mb-5">
            <p className="text-sm text-stone-600 mb-3 font-serif">Select LLM provider:</p>
            <div className="grid grid-cols-2 gap-2">
              {models.map((model) => (
                <label 
                  key={model.id}
                  className={`
                    flex items-center p-3 rounded-lg cursor-pointer 
                    ${settings.model === model.id 
                      ? 'bg-teal-50 border-teal-600 border text-teal-700' 
                      : 'bg-white/80 border border-stone-200 text-stone-700 hover:border-teal-300'}
                    transition-colors duration-200
                  `}
                >
                  <input
                    type="radio"
                    name="model"
                    value={model.id}
                    checked={settings.model === model.id}
                    onChange={() => handleModelChange(model.id)}
                    className="sr-only" // Hide the actual radio button
                  />
                  <span className="font-serif">{model.name}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="mb-3">
            <label className="block text-stone-700 font-serif mb-2">
              API Key
              <div className="relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={settings.apiKey}
                  onChange={handleApiKeyChange}
                  placeholder={`Enter your ${models.find(m => m.id === settings.model)?.name || 'selected'} API key`}
                  className="w-full p-3 mt-1 pr-10 border border-stone-300 rounded-lg focus:border-teal-600 focus:outline-none text-stone-700 placeholder-stone-500 bg-white/80"
                />
                <button
                  type="button"
                  onClick={toggleApiKeyVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-500 hover:text-teal-600"
                >
                  {showApiKey ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <p className="mt-1 text-xs text-stone-500 italic">
                Your API key is stored only in your browser and never sent to our servers
              </p>
            </label>
          </div>
        </motion.div>
      )}
    </div>
  )
}