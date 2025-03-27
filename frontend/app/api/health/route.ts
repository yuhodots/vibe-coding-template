import { NextResponse } from 'next/server';

// Type declaration for process.env
declare const process: {
  env: {
    NEXT_PUBLIC_API_URL?: string;
    [key: string]: string | undefined;
  };
};

export async function GET() {
  try {
    // In Docker environment, we need to use the service name
    // This is a Server Component, so we're making this request from the container
    const apiUrl = 'http://backend:8000';

    console.log(`Checking backend health at: ${apiUrl}`);

    // Attempt to connect to the backend
    const response = await fetch(`${apiUrl}/`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          status: 'error',
          message: `Backend connection failed with status: ${response.status}`,
          backendUrl: apiUrl
        },
        { status: 500 }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      status: 'ok',
      backend: data,
      backendUrl: apiUrl
    });
  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error connecting to backend',
        backendUrl: 'http://backend:8000'
      },
      { status: 500 }
    );
  }
}