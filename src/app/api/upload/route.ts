import { NextRequest, NextResponse } from 'next/server';
import { uploadMultipleImages, generateProductImagePath } from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    console.log('Upload API called');
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const category = formData.get('category') as string;
    const subcategory = formData.get('subcategory') as string;
    
    console.log('Received data:', {
      filesCount: files.length,
      category,
      subcategory,
      fileNames: files.map(f => f.name)
    });

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }

    if (!category || !subcategory) {
      return NextResponse.json({ error: 'Category and subcategory are required' }, { status: 400 });
    }

    // Filter valid image files
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        console.log(`Skipping non-image file: ${file.name}`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        console.log(`Skipping large file: ${file.name} (${file.size} bytes)`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) {
      return NextResponse.json({ error: 'No valid image files provided' }, { status: 400 });
    }

    // Generate base path for Firebase Storage
    const basePath = `products/${category}/${subcategory}`;
    
    // Upload files to Firebase Storage
    const downloadURLs = await uploadMultipleImages(validFiles, basePath);
    
    console.log('Images uploaded to Firebase Storage successfully:', downloadURLs);

    return NextResponse.json({ 
      success: true, 
      uploadedPaths: downloadURLs,
      message: `Successfully uploaded ${downloadURLs.length} files to Firebase Storage`
    });

  } catch (error) {
    console.error('Upload error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : 'Unknown'
    });
    return NextResponse.json({ 
      error: 'Upload failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 