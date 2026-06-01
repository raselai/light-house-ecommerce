import { NextRequest, NextResponse } from 'next/server';
import { uploadMultipleImages, generateProductImagePath } from '@/lib/storage';
import { checkAdminAuth, unauthorizedResponse } from '@/lib/adminAuth';

export async function POST(request: NextRequest) {
  if (!checkAdminAuth(request)) return unauthorizedResponse();
  try {
    console.log('Upload API called - uploading to Firebase Storage');
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

    const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    const validFiles = files.filter(file => {
      const ext = '.' + (file.name.split('.').pop() ?? '').toLowerCase();
      if (!ALLOWED_EXTENSIONS.includes(ext)) return false;
      if (file.size > 5 * 1024 * 1024) return false;
      return true;
    });

    if (validFiles.length === 0) {
      return NextResponse.json({ error: 'No valid image files provided' }, { status: 400 });
    }

    // Generate base path for Firebase Storage
    const basePath = generateProductImagePath(category, subcategory, '');
    
    // Upload files to Firebase Storage
    const firebaseURLs = await uploadMultipleImages(validFiles, basePath);
    
    console.log('Images uploaded to Firebase Storage successfully:', firebaseURLs);

    return NextResponse.json({ 
      success: true, 
      uploadedPaths: firebaseURLs,
      message: `Successfully uploaded ${firebaseURLs.length} files to Firebase Storage`
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