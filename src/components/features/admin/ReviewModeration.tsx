import { useState, useEffect } from 'react';
import { Review } from '../../../types';
import { adminService } from '../../../services/adminService';

export function ReviewModeration() {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    adminService.getReviews().then(setReviews);
  }, []);

  const updateReviewStatus = async (reviewId: string, status: 'approved' | 'rejected') => {
    const updatedReview = await adminService.updateReviewStatus(reviewId, status);
    setReviews(reviews.map(review =>
      review.id === reviewId ? updatedReview : review
    ));
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-2">Модерація Відгуків</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Автор</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Відгук</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Оцінка</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Дії</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {reviews.map((review) => (
            <tr key={review.id}>
              <td className="px-6 py-4 whitespace-nowrap">{review.authorName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{review.text}</td>
              <td className="px-6 py-4 whitespace-nowrap">{review.rating}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  review.status === 'approved' ? 'bg-green-100 text-green-800' :
                  review.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {review.status === 'approved' ? 'схвалено' :
                  review.status === 'rejected' ? 'відхилено' :
                  review.status === 'pending' ? 'очікує' : review.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {review.status === 'pending' && (
                  <>
                    <button onClick={() => updateReviewStatus(review.id, 'approved')} className="text-indigo-600 hover:text-indigo-900">Схвалити</button>
                    <button onClick={() => updateReviewStatus(review.id, 'rejected')} className="text-red-600 hover:text-red-900 ml-4">Відхилити</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
