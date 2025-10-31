import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Edit, Trash2, Reply } from 'lucide-react';
import { useReviewsStore } from '../../store/reviewsStore';
import { useAuthStore } from '../../store/authStore';
import { Review } from '../../types/review';
import { ReviewModal } from '../modals/ReviewModal';

interface ReviewCardProps {
  review: Review;
  isOwnReview: boolean;
  currentUserRole: string;
  onEdit: (review: Review) => void;
  onDelete: (reviewId: string) => void;
  onMasterRespond: (review: Review) => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  isOwnReview,
  currentUserRole,
  onEdit,
  onDelete,
  onMasterRespond,
}) => {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const canEdit = isOwnReview && currentUserRole !== 'master';
  const hoursSinceCreation = (Date.now() - new Date(review.createdAt).getTime()) / (1000 * 60 * 60);
  const canEditByTime = hoursSinceCreation <= 24;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-semibold text-lg">
              {review.clientName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{review.clientName}</h4>
            <p className="text-sm text-gray-500">{formatDate(review.createdAt)}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-5 h-5 ${
                star <= review.rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {review.comment && (
        <p className="text-gray-700 mb-4">{review.comment}</p>
      )}

      {review.masterResponse && (
        <div className="bg-blue-50 rounded-lg p-4 mb-4 border-l-4 border-blue-500">
          <div className="flex items-center gap-2 mb-2">
            <Reply className="w-4 h-4 text-blue-600" />
            <span className="font-semibold text-blue-900">Response from master</span>
          </div>
          <p className="text-blue-800">{review.masterResponse}</p>
        </div>
      )}

      <div className="flex items-center gap-2">
        {canEdit && canEditByTime && (
          <button
            onClick={() => onEdit(review)}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
            <Edit className="w-4 h-4" />
          </button>
        )}
        {currentUserRole === 'admin' && (
          <button
            onClick={() => onDelete(review.id)}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
        {currentUserRole === 'master' && !review.masterResponse && (
          <button
            onClick={() => onMasterRespond(review)}
            className="px-4 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition flex items-center gap-2"
          >
            <Reply className="w-4 h-4" />
            Respond
          </button>
        )}
      </div>

      {review.updatedAt && (
        <p className="text-xs text-gray-400 mt-2">
          Edited {formatDate(review.updatedAt)}
        </p>
      )}
    </motion.div>
  );
};

export const ReviewsPage: React.FC = () => {
  const { currentUser } = useAuthStore();
  const { reviews, deleteReview, getReviewsByMasterId } = useReviewsStore();

  const [selectedMasterId, _setSelectedMasterId] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  // For now, show all reviews or filter by master if needed
  const displayedReviews = selectedMasterId
    ? getReviewsByMasterId(selectedMasterId)
    : reviews;

  const handleDelete = (reviewId: string) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      deleteReview(reviewId);
    }
  };

  const handleEdit = (review: Review) => {
    setSelectedReview(review);
    setShowEditModal(true);
  };

  const handleMasterRespond = (review: Review) => {
    setSelectedReview(review);
    setShowResponseModal(true);
  };

  const handleMasterResponse = (response: string) => {
    if (selectedReview) {
      const { updateReview } = useReviewsStore.getState();
      updateReview(selectedReview.id, { masterResponse: response });
      setShowResponseModal(false);
      setSelectedReview(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reviews</h1>
          <p className="text-gray-600">
            {displayedReviews.length} total reviews
          </p>
        </motion.div>

        {displayedReviews.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No reviews yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayedReviews.map((review) => {
              const isOwnReview = review.clientId === currentUser?.id;
              
              return (
                <ReviewCard
                  key={review.id}
                  review={review}
                  isOwnReview={isOwnReview}
                  currentUserRole={currentUser?.role || 'guest'}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onMasterRespond={handleMasterRespond}
                />
              );
            })}
          </div>
        )}

        {/* Edit Review Modal */}
        {showEditModal && selectedReview && (
          <ReviewModal
            isOpen={showEditModal}
            onClose={() => {
              setShowEditModal(false);
              setSelectedReview(null);
            }}
            orderId={selectedReview.orderId}
            masterId={selectedReview.masterId}
            review={selectedReview}
          />
        )}

        {/* Master Response Modal */}
        {showResponseModal && selectedReview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6">
              <h2 className="text-2xl font-bold mb-4">Respond to Review</h2>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                rows={5}
                placeholder="Write your response..."
              />
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowResponseModal(false);
                    setSelectedReview(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
                    if (textarea.value.trim()) {
                      handleMasterResponse(textarea.value);
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Send Response
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;

