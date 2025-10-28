import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Review } from '../types/review';
import { useAuthStore } from './authStore';
import { useUIStore } from './uiStore';

interface ReviewsState {
  reviews: Review[];
  createReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
  updateReview: (reviewId: string, updates: Partial<Review>) => void;
  deleteReview: (reviewId: string) => void;
  getReviewByOrderId: (orderId: string) => Review | undefined;
  getReviewsByMasterId: (masterId: string) => Review[];
  getReviewStats: (masterId: string) => {
    averageRating: number;
    totalReviews: number;
    ratingDistribution: Record<string, number>;
  };
}

export const useReviewsStore = create<ReviewsState>()(
  persist(
    (set, get) => ({
      reviews: [],
      
      createReview: (reviewData) => {
        const currentUser = useAuthStore.getState().currentUser;
        
        if (!currentUser) {
          useUIStore.getState().showNotification('You must be logged in to leave a review', 'error');
          return;
        }

        // Only clients can create reviews
        if (currentUser.role !== 'client') {
          useUIStore.getState().showNotification('Only clients can leave reviews', 'error');
          return;
        }

        // Check if review already exists for this order
        const existingReview = get().reviews.find(r => r.orderId === reviewData.orderId);
        if (existingReview) {
          useUIStore.getState().showNotification('You have already reviewed this order', 'error');
          return;
        }

        // Validate rating
        if (reviewData.rating < 1 || reviewData.rating > 5) {
          useUIStore.getState().showNotification('Rating must be between 1 and 5', 'error');
          return;
        }

        const newReview: Review = {
          ...reviewData,
          id: `review-${Date.now()}`,
          clientId: currentUser.id,
          clientName: currentUser.name || 'Anonymous',
          verified: true, // Will be verified against completed orders
          createdAt: new Date().toISOString(),
        };

        set((state) => ({
          reviews: [...state.reviews, newReview],
        }));

        useUIStore.getState().showNotification('Thank you for your review!');
      },

      updateReview: (reviewId, updates) => {
        const currentUser = useAuthStore.getState().currentUser;
        const review = get().reviews.find(r => r.id === reviewId);
        
        if (!review || !currentUser) {
          useUIStore.getState().showNotification('Review not found', 'error');
          return;
        }

        // Only the original client or admin can edit
        if (review.clientId !== currentUser.id && currentUser.role !== 'admin') {
          useUIStore.getState().showNotification('You can only edit your own reviews', 'error');
          return;
        }

        // Check time limit (24 hours) - only for non-admin
        if (currentUser.role !== 'admin') {
          const hoursSinceCreation = (Date.now() - new Date(review.createdAt).getTime()) / (1000 * 60 * 60);
          if (hoursSinceCreation > 24) {
            useUIStore.getState().showNotification('Reviews can only be edited within 24 hours', 'error');
            return;
          }
        }

        set((state) => ({
          reviews: state.reviews.map(r =>
            r.id === reviewId
              ? { ...r, ...updates, updatedAt: new Date().toISOString() }
              : r
          ),
        }));

        useUIStore.getState().showNotification('Review updated successfully!');
      },

      deleteReview: (reviewId) => {
        const currentUser = useAuthStore.getState().currentUser;
        const review = get().reviews.find(r => r.id === reviewId);
        
        if (!review || !currentUser) {
          useUIStore.getState().showNotification('Review not found', 'error');
          return;
        }

        // Only admin can delete reviews
        if (currentUser.role !== 'admin') {
          useUIStore.getState().showNotification('Only admins can delete reviews', 'error');
          return;
        }

        set((state) => ({
          reviews: state.reviews.filter(r => r.id !== reviewId),
        }));

        useUIStore.getState().showNotification('Review deleted successfully!');
      },

      getReviewByOrderId: (orderId) => {
        return get().reviews.find(r => r.orderId === orderId);
      },

      getReviewsByMasterId: (masterId) => {
        return get().reviews.filter(r => r.masterId === masterId);
      },

      getReviewStats: (masterId) => {
        const reviews = get().reviews.filter(r => r.masterId === masterId);
        const totalReviews = reviews.length;
        
        if (totalReviews === 0) {
          return {
            averageRating: 0,
            totalReviews: 0,
            ratingDistribution: { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 },
          };
        }

        const sumRatings = reviews.reduce((sum, r) => sum + r.rating, 0);
        const averageRating = sumRatings / totalReviews;

        const ratingDistribution = reviews.reduce(
          (acc, r) => {
            acc[r.rating.toString() as keyof typeof acc]++;
            return acc;
          },
          { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 }
        );

        return {
          averageRating: Math.round(averageRating * 10) / 10,
          totalReviews,
          ratingDistribution,
        };
      },
    }),
    {
      name: 'reviews-storage',
    }
  )
);

