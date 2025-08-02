import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

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

    const uploadedPaths: string[] = [];

    for (const file of files) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        continue; // Skip non-image files
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        continue; // Skip large files
      }

      // Generate unique filename
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(2, 8);
      const extension = file.name.split('.').pop();
      const fileName = `${timestamp}-${randomId}.${extension}`;

      // Create directory path
      const categoryPath = category.toLowerCase().replace(' ', '-');
      const subcategoryPath = subcategory.toLowerCase().replace(' ', '-');
      const directoryPath = path.join(process.cwd(), 'public', 'images', 'products', categoryPath, subcategoryPath);

      console.log('Directory path:', directoryPath);

      // Create directory if it doesn't exist
      try {
        await mkdir(directoryPath, { recursive: true });
        console.log('Directory created successfully');
      } catch (mkdirError) {
        console.error('Failed to create directory:', mkdirError);
        throw mkdirError;
      }

      // Save file
      const filePath = path.join(directoryPath, fileName);
      console.log('File path:', filePath);
      
      try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filePath, buffer);
        console.log('File written successfully');
      } catch (writeError) {
        console.error('Failed to write file:', writeError);
        throw writeError;
      }

      // Return the public URL path
      const publicPath = `/images/products/${categoryPath}/${subcategoryPath}/${fileName}`;
      uploadedPaths.push(publicPath);
    }

    return NextResponse.json({ 
      success: true, 
      uploadedPaths,
      message: `Successfully uploaded ${uploadedPaths.length} files`
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