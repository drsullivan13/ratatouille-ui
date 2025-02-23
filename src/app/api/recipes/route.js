import { NextResponse } from 'next/server';

export async function POST(request) {
  console.log(`MADE IT HERE`);
  
  const apiUrl = process.env.RECIPE_API_URL;
  if (!apiUrl) {
    return NextResponse.json(
      { message: 'API URL not configured' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const response = await fetch(`${apiUrl}/api/recipes/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers your API requires
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch recipes from external API');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}