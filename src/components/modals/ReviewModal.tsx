import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X } from 'lucide-react';
import { useReviewsStore } from '../../store/reviewsStore';
import { Review } from '../../types/review';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  masterId: string;
  review?: Review; // If editing existing review
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, orderId, masterId, review }) => {
  const { createReview, updateReview } = useReviewsStore();
  const [rating, setRating] = useState(review?.rating || 5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState(review?.comment || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (comment.trim().length < 10) {
      alert('Comment must be at least 10 characters long');
      return;
    }

    setIsSubmitting(true);

    try {
      if (review) {
        // Updating existing review
        updateReview(review.id, { rating, comment });
      } else {
        // Creating new review
        createReview({
          orderId,
          masterId,
          rating,
          comment,
        });
      }
      onClose();
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {review ? 'Edit Review' : 'Leave a Review'}
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Rating Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Your Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="p-1 rounded-lg hover:bg-yellow-50 transition"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= (hoveredRating || rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          } transition`}
                        />
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {rating === 5 && '⭐⭐⭐⭐⭐ Excellent'}
                    {rating === 4 && '⭐⭐⭐⭐ Good'}
                    {rating === 3 && '⭐⭐⭐ Average'}
                    {rating === 2 && '⭐⭐ Below Average'}
                    {rating === 1 && '⭐ Poor'}
                  </p>
                </div>

                {/* Comment */}
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review (min 10 characters)
                  </label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell others about your experience..."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {comment.length} / 10 characters
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || comment.trim().length < 10}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : review ? 'Update Review' : 'Submit Review'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

