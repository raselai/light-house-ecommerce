import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
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

      // Convert file to base64
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64String = buffer.toString('base64');
      const dataUrl = `data:${file.type};base64,${base64String}`;

      // Store base64 data in a JSON file (temporary solution)
      const dataFilePath = path.join(process.cwd(), 'src/app/data/image-storage.json');
      
      try {
        // Read existing data
        let imageData = {};
        try {
          const existingData = await readFile(dataFilePath, 'utf8');
          imageData = JSON.parse(existingData);
        } catch (readError) {
          // File doesn't exist, start with empty object
          imageData = {};
        }

        // Add new image data
        const imageKey = `image_${timestamp}_${randomId}`;
        imageData[imageKey] = {
          dataUrl,
          fileName,
          category,
          subcategory,
          uploadedAt: new Date().toISOString()
        };

        // Write back to file
        await writeFile(dataFilePath, JSON.stringify(imageData, null, 2));
        console.log('Image data stored successfully');

        // Return a virtual path (we'll handle this in the frontend)
        const virtualPath = `/api/images/${imageKey}`;
        uploadedPaths.push(virtualPath);

      } catch (storageError) {
        console.error('Failed to store image data:', storageError);
        throw storageError;
      }
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