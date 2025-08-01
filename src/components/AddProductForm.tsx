'use client';

import { useState } from 'react';
import ImageUpload from './ImageUpload';

interface AddProductFormProps {
  onClose: () => void;
  onSave: (product: any) => void;
}

export default function AddProductForm({ onClose, onSave }: AddProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    dimensions: '',
    bulbType: '',
    wattage: '',
    voltage: '',
    material: '',
    category: '',
    subcategory: '',
    room: '',
    lightType: '',
    style: '',
    availability: 'In Stock',
    isFeatured: false,
    isOnSale: false,
    rating: '4.5',
    reviewCount: '0',
    images: [] as string[],
    galleryImages: [] as string[],
    image: '',
    mainImage: '',
    imagePath: ''
  });

  const categories = [
    'Indoor Lights',
    'Outdoor Lights',
    'Others'
  ];

  const subcategories = {
    'Indoor Lights': [
      'Hanging Lights',
      'Spotlight',
      'Pendant Lights',
      'Magnetic Light',
      'LED Tube',
      'Office Lights',
      'Warehouse Light',
      'LED Strip',
      'Aluminum Profile',
      'Mirror Light',
      'LED Track Lights'
    ],
    'Outdoor Lights': [
      'Wall Lights',
      'Stand Lights',
      'Garden Lights',
      'Floodlight',
      'Solar Light'
    ],
    'Others': [
      'Custom Solutions',
      'Specialty Lighting',
      'Unique Designs',
      'Miscellaneous'
    ]
  };

  const availabilityOptions = ['In Stock', 'Out of Stock', 'Limited Stock'];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImagesUploaded = (images: string[]) => {
    setFormData(prev => ({
      ...prev,
      images: images,
      image: images[0] || '',
      mainImage: images[0] || '',
      imagePath: images[0] || ''
    }));
  };

  const handleGalleryImagesUploaded = (images: string[]) => {
    setFormData(prev => ({
      ...prev,
      galleryImages: images
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name.trim()) {
      alert('Product name is required');
      return;
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      alert('Valid price is required');
      return;
    }
    
    if (!formData.category) {
      alert('Category is required');
      return;
    }
    
    if (!formData.subcategory) {
      alert('Subcategory is required');
      return;
    }
    
    // Create product object WITHOUT id (API will generate it)
    const newProduct = {
      name: formData.name,
      price: parseFloat(formData.price),
      description: formData.description,
      dimensions: formData.dimensions,
      bulbType: formData.bulbType,
      wattage: formData.wattage === 'N/A' ? 'N/A' : parseInt(formData.wattage) || 0,
      voltage: formData.voltage,
      material: formData.material,
      category: formData.category,
      subcategory: formData.subcategory,
      room: formData.room,
      lightType: formData.lightType,
      style: formData.style,
      availability: formData.availability,
      isFeatured: formData.isFeatured,
      isOnSale: formData.isOnSale,
      rating: parseFloat(formData.rating) || 4.5,
      reviewCount: parseInt(formData.reviewCount) || 0,
      images: formData.images.filter(img => img.trim() !== ''),
      galleryImages: formData.galleryImages.filter(img => img.trim() !== ''),
      image: formData.image || formData.images[0] || '',
      mainImage: formData.mainImage || formData.images[0] || '',
      imagePath: formData.image || formData.images[0] || ''
    };

    console.log('Submitting product:', newProduct);
    onSave(newProduct);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '2rem'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '2rem',
        maxWidth: '800px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h2 style={{ margin: 0, color: '#1f2937' }}>Add New Product</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#6b7280'
            }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {/* Basic Information */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Product Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Price (AED) *
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => {
                  handleInputChange('category', e.target.value);
                  handleInputChange('subcategory', '');
                }}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Subcategory *
              </label>
              <select
                value={formData.subcategory}
                onChange={(e) => handleInputChange('subcategory', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
                required
                disabled={!formData.category}
              >
                <option value="">Select Subcategory</option>
                {formData.category && subcategories[formData.category as keyof typeof subcategories]?.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>

            {/* Specifications */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Dimensions *
              </label>
              <input
                type="text"
                value={formData.dimensions}
                onChange={(e) => handleInputChange('dimensions', e.target.value)}
                placeholder="e.g., 80cm diameter x 100cm height"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Bulb Type *
              </label>
              <input
                type="text"
                value={formData.bulbType}
                onChange={(e) => handleInputChange('bulbType', e.target.value)}
                placeholder="e.g., E14 LED Compatible"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Wattage *
              </label>
              <input
                type="text"
                value={formData.wattage}
                onChange={(e) => handleInputChange('wattage', e.target.value)}
                placeholder="e.g., 240 or N/A"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Voltage *
              </label>
              <input
                type="text"
                value={formData.voltage}
                onChange={(e) => handleInputChange('voltage', e.target.value)}
                placeholder="e.g., 220-240V"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Material *
              </label>
              <input
                type="text"
                value={formData.material}
                onChange={(e) => handleInputChange('material', e.target.value)}
                placeholder="e.g., K9 Crystal, Chrome Frame"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Style *
              </label>
              <input
                type="text"
                value={formData.style}
                onChange={(e) => handleInputChange('style', e.target.value)}
                placeholder="e.g., Traditional, Modern"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Room *
              </label>
              <input
                type="text"
                value={formData.room}
                onChange={(e) => handleInputChange('room', e.target.value)}
                placeholder="e.g., Dining Room, Living Room"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Light Type *
              </label>
              <input
                type="text"
                value={formData.lightType}
                onChange={(e) => handleInputChange('lightType', e.target.value)}
                placeholder="e.g., Chandelier, Flush Mount"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Availability *
              </label>
              <select
                value={formData.availability}
                onChange={(e) => handleInputChange('availability', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
                required
              >
                {availabilityOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Rating *
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={(e) => handleInputChange('rating', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Review Count *
              </label>
              <input
                type="number"
                min="0"
                value={formData.reviewCount}
                onChange={(e) => handleInputChange('reviewCount', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
                required
              />
            </div>
          </div>

          {/* Description - Full Width */}
          <div style={{ marginTop: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Product Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe the product features, benefits, and specifications..."
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '1rem',
                minHeight: '100px',
                resize: 'vertical'
              }}
              required
            />
          </div>

          {/* Image Upload - Full Width */}
          {formData.category && formData.subcategory && (
            <ImageUpload
              category={formData.category}
              subcategory={formData.subcategory}
              onImagesUploaded={handleImagesUploaded}
            />
          )}

          {/* Gallery Images Upload */}
          {formData.category && formData.subcategory && (
            <div style={{ marginTop: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Gallery Images (Additional Images)
              </label>
              <ImageUpload
                category={formData.category}
                subcategory={formData.subcategory}
                onImagesUploaded={handleGalleryImagesUploaded}
              />
            </div>
          )}

          {/* Checkboxes */}
          <div style={{ marginTop: '1rem', display: 'flex', gap: '2rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={formData.isFeatured}
                onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
              />
              Featured Product
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={formData.isOnSale}
                onChange={(e) => handleInputChange('isOnSale', e.target.checked)}
              />
              On Sale
            </label>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '2rem',
            justifyContent: 'flex-end'
          }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '0.75rem 1.5rem',
                background: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '0.75rem 1.5rem',
                background: '#059669',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 