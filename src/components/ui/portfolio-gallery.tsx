import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Smartphone, Wrench, Star, Calendar } from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import { cn } from '../../lib/utils';

export interface PortfolioItem {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  deviceType: string;
  repairType: string;
  rating: number;
  completedDate: string;
}

interface PortfolioGalleryProps {
  items: PortfolioItem[];
  showDetails?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  className?: string;
}

export function PortfolioGallery({
  items,
  showDetails = true,
  autoplay = false,
  autoplayDelay = 5000,
  className,
}: PortfolioGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoplay);

  useEffect(() => {
    if (!isPlaying || items.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, autoplayDelay);

    return () => clearInterval(timer);
  }, [isPlaying, autoplayDelay, items.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const currentItem = items[currentIndex];

  if (!items.length) return null;

  return (
    <div className={cn('relative w-full', className)}>
      {/* Main Image Display */}
      <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-800 mb-4 group">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentItem.id}
            src={currentItem.imageUrl}
            alt={currentItem.title}
            className="w-full h-full object-cover"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Autoplay Control */}
        {items.length > 1 && (
          <div className="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-black/50 hover:bg-black/70 text-white"
            >
              {isPlaying ? '⏸️' : '▶️'}
            </Button>
          </div>
        )}
      </div>

      {/* Details Section */}
      {showDetails && currentItem && (
        <div className="bg-slate-800/50 rounded-xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {currentItem.title}
              </h3>
              <p className="text-slate-300">{currentItem.description}</p>
            </div>
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="w-5 h-5 fill-current" />
              <span className="text-lg font-semibold">{currentItem.rating}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 text-slate-300">
              <Smartphone className="w-5 h-5 text-blue-400" />
              <span className="font-medium">Устройство:</span>
              <Badge variant="outline" className="border-slate-600">
                {currentItem.deviceType}
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <Wrench className="w-5 h-5 text-green-400" />
              <span className="font-medium">Тип ремонта:</span>
              <Badge variant="outline" className="border-slate-600">
                {currentItem.repairType}
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <Calendar className="w-5 h-5 text-purple-400" />
              <span>{currentItem.completedDate}</span>
            </div>
          </div>
        </div>
      )}

      {/* Thumbnail Strip */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {items.map((item, index) => (
          <motion.button
            key={item.id}
            onClick={() => goToSlide(index)}
            className={cn(
              'relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all',
              index === currentIndex
                ? 'border-blue-500 shadow-lg shadow-blue-500/50'
                : 'border-transparent hover:border-slate-600'
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={item.imageUrl}
              alt={`${index + 1} of ${items.length}`}
              className="w-full h-full object-cover"
            />
            {index === currentIndex && (
              <div className="absolute inset-0 bg-blue-500/20" />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}








