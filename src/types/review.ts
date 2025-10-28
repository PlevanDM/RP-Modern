export interface Review {
  id: string;
  orderId: string;
  clientId: string;
  masterId: string;
  clientName: string;
  rating: number; // 1-5
  comment?: string;
  masterResponse?: string;
  createdAt: string;
  updatedAt?: string;
  helpful?: number; // количество "полезный отзыв"
  verified: boolean; // если заказ действительно был завершен
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    '5': number;
    '4': number;
    '3': number;
    '2': number;
    '1': number;
  };
}

