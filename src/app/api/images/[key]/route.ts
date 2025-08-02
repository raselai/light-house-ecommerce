import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  try {
    const { key } = await params;
    
    // Read the image storage file
    const dataFilePath = path.join(process.cwd(), 'src/app/data/image-storage.json');
    
    try {
      const existingData = await readFile(dataFilePath, 'utf8');
      const imageData = JSON.parse(existingData);
      
      const imageInfo = imageData[key];
      if (!imageInfo) {
        return NextResponse.json({ error: 'Image not found' }, { status: 404 });
      }
      
      // Return the base64 data URL
      return new NextResponse(imageInfo.dataUrl, {
        headers: {
          'Content-Type': 'image/jpeg', // You might want to detect this from the data URL
          'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
        },
      });
      
    } catch (readError) {
      return NextResponse.json({ error: 'Image storage not found' }, { status: 404 });
    }
    
  } catch (error) {
    console.error('Image serving error:', error);
    return NextResponse.json({ error: 'Failed to serve image' }, { status: 500 });
  }
} 