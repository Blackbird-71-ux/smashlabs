'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight, FaPlay, FaExpand } from 'react-icons/fa';
import { getGalleryImages, type GalleryImage } from '@/lib/api';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { trackEvent } from '@/lib/analytics';

interface GallerySectionProps {
  className?: string;
}

const GallerySection: React.FC<GallerySectionProps> = ({ className = '' }) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  
  const lightboxRef = useRef<HTMLDivElement>(null);

  // Fallback images for demo purposes
  const fallbackImages: GalleryImage[] = [
    {
      id: '1',
      url: '/images/gallery/smash-room-1.jpg',
      alt: 'Main smash room with safety equipment',
      category: 'smash-room',
      caption: 'Our main smash room equipped with all safety gear'
    },
    {
      id: '2',
      url: '/images/gallery/team-event-1.jpg',
      alt: 'Team building event in progress',
      category: 'team-event',
      caption: 'Corporate team enjoying their stress relief session'
    },
    {
      id: '3',
      url: '/images/gallery/before-after-1.jpg',
      alt: 'Before and after destruction',
      category: 'before-after',
      caption: 'The satisfying transformation of stress into freedom'
    },
    {
      id: '4',
      url: '/images/gallery/corporate-1.jpg',
      alt: 'Corporate event setup',
      category: 'corporate',
      caption: 'Professional setup for corporate stress relief events'
    },
    {
      id: '5',
      url: '/images/gallery/smash-room-2.jpg',
      alt: 'VIP smash room interior',
      category: 'smash-room',
      caption: 'Premium VIP room with enhanced experience'
    },
    {
      id: '6',
      url: '/images/gallery/team-event-2.jpg',
      alt: 'Group celebrating after session',
      category: 'team-event',
      caption: 'The joy and relief after a successful smash session'
    },
  ];

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'smash-room', label: 'Smash Rooms' },
    { id: 'team-event', label: 'Team Events' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'before-after', label: 'Before & After' },
  ];

  // Load gallery images
  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try to load from API, fallback to demo images
        try {
          const apiImages = await getGalleryImages();
          setImages(apiImages.length > 0 ? apiImages : fallbackImages);
        } catch (apiError) {
          console.warn('API images not available, using fallback images');
          setImages(fallbackImages);
        }
        
        trackEvent('gallery_viewed', {
          category: 'engagement',
          label: 'gallery_section',
        });
      } catch (err) {
        setError('Failed to load gallery images');
        console.error('Gallery loading error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  // Filter images by category
  const filteredImages = activeCategory === 'all' 
    ? images 
    : images.filter(img => img.category === activeCategory);

  // Handle image loading
  const handleImageLoad = (imageId: string) => {
    setLoadedImages(prev => {
      const newSet = new Set(prev);
      newSet.add(imageId);
      return newSet;
    });
  };

  // Lightbox functionality
  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    document.body.style.overflow = 'hidden';
    
    trackEvent('gallery_image_opened', {
      category: 'engagement',
      label: image.category,
      image_id: image.id,
    });
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % filteredImages.length
      : (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    
    setCurrentIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          navigateLightbox('prev');
          break;
        case 'ArrowRight':
          navigateLightbox('next');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentIndex, filteredImages]);

  if (loading) {
    return (
      <section className={`py-24 bg-dark-900 ${className}`}>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <LoadingSpinner size="lg" color="primary" />
            <p className="mt-4 text-gray-400">Loading gallery...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`py-24 bg-dark-900 ${className}`}>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-400 text-lg">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 btn btn-secondary"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="gallery" className={`py-24 bg-dark-900 ${className}`}>
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-rage-400 to-rage-600 bg-clip-text text-transparent">
              Experience Gallery
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              See the transformation, feel the energy, and witness the ultimate stress relief in action.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  trackEvent('gallery_filter_changed', {
                    category: 'interaction',
                    label: category.id,
                  });
                }}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-rage-500 text-white shadow-lg'
                    : 'bg-dark-800 text-gray-300 hover:bg-dark-700 hover:text-white'
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={`${activeCategory}-${image.id}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="relative group cursor-pointer overflow-hidden rounded-xl bg-dark-800"
                  onClick={() => openLightbox(image, index)}
                >
                  <div className="aspect-w-16 aspect-h-12 relative">
                    {!loadedImages.has(image.id) && (
                      <div className="absolute inset-0 flex items-center justify-center bg-dark-800">
                        <LoadingSpinner size="sm" color="primary" />
                      </div>
                    )}
                    <Image
                      src={image.url}
                      alt={image.alt}
                      fill
                      className={`object-cover transition-all duration-300 ${
                        loadedImages.has(image.id) ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => handleImageLoad(image.id)}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <FaExpand className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Caption */}
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                      <p className="text-white text-sm font-medium">
                        {image.caption}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">
                No images found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            ref={lightboxRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <div className="absolute inset-0 flex items-center justify-center p-4">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200 flex items-center justify-center"
                aria-label="Close lightbox"
              >
                <FaTimes className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              {filteredImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateLightbox('prev');
                    }}
                    className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200 flex items-center justify-center"
                    aria-label="Previous image"
                  >
                    <FaChevronLeft className="w-6 h-6" />
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateLightbox('next');
                    }}
                    className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200 flex items-center justify-center"
                    aria-label="Next image"
                  >
                    <FaChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Image */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-5xl max-h-[80vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.alt}
                  width={1200}
                  height={800}
                  className="w-full h-full object-contain rounded-lg"
                  priority
                />
                
                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                  <h3 className="text-white text-xl font-semibold mb-2">
                    {selectedImage.alt}
                  </h3>
                  {selectedImage.caption && (
                    <p className="text-gray-300">
                      {selectedImage.caption}
                    </p>
                  )}
                  <p className="text-gray-400 text-sm mt-2">
                    {currentIndex + 1} of {filteredImages.length}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GallerySection; 