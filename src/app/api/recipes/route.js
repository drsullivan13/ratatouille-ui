import { NextResponse } from 'next/server'

export async function POST(request) {  
  const apiUrl = process.env.RECIPE_API_URL
  if (!apiUrl) {
    return NextResponse.json(
      { message: 'API URL not configured' },
      { status: 500 }
    )
  }

  try {
    // Extract model and API key from headers
    const llmModel = request.headers.get('X-LLM-Model') || 'openai'
    const apiKey = request.headers.get('X-API-Key')
    
    if (!apiKey) {
      return NextResponse.json(
        { message: 'API key is required' },
        { status: 400 }
      )
    }
    
    const body = await request.json()
    
    // Add model selection to the request body
    const enhancedBody = {
      ...body,
      llmConfig: {
        model: llmModel,
        apiKey: apiKey
      }
    }
    
    const response = await fetch(`${apiUrl}/api/recipes/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enhancedBody),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Failed to fetch recipes from ${llmModel} API`);
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    )
  }
}