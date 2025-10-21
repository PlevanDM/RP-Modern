import React, { useState, useMemo } from 'react';
import { Star, Clock, CheckCircle, ThumbsUp, MessageCircle, User } from 'lucide-react';

interface Review {
  id: string;
  clientName: string;
  clientAvatar: string;
  rating: number;
  title: string;
  text: string;
  date: Date;
  helpful: number;
  verified: boolean;
  service: string;
}

interface MasterReviewsProps {
  masterId: string;
  masterName: string;
  averageRating: number;
  totalReviews: number;
  reviews?: Review[];
}

// Mock дані рецензій
const generateMockReviews = (count: number = 15): Review[] => {
  const services = [
    'Заміна дисплея iPhone',
    'Заміна батареї',
    'Ремонт камери',
    'Чистка від вологи',
    'Заміна портів',
  ];

  const clientNames = [
    'Іван Петренко',
    'Марія Іванова',
    'Сергій Коваленко',
    'Оксана Сидоренко',
    'Дмитро Волков',
    'Анна Павленко',
    'Користувач 1',
    'Користувач 2',
  ];

  const reviews: Review[] = [];

  for (let i = 0; i < count; i++) {
    reviews.push({
      id: `review_${i}`,
      clientName: clientNames[Math.floor(Math.random() * clientNames.length)],
      clientAvatar: `https://i.pravatar.cc/96?img=${Math.floor(Math.random() * 30)}`,
      rating: Math.floor(Math.random() * 2) + 4, // 4 або 5
      title: ['Чудово!', 'Якісна робота', 'Рекомендую', 'Дуже задоволений', 'Профеcіонал'][
        Math.floor(Math.random() * 5)
      ],
      text: [
        'Майстер вийшов швидко, якість роботи на найвищому рівні. Дуже задоволений!',
        'Професіонал своєї справи. Порадив мені найкращий варіант.',
        'Чекав довго, але воно того варте. Дисплей як новий!',
        'Вийшов в день звернення. Вийшов на рівні оригіналу.',
        'Зробив все акуратно і швидко. Дякую!',
      ][Math.floor(Math.random() * 5)],
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Останні 30 днів
      helpful: Math.floor(Math.random() * 50),
      verified: Math.random() > 0.2,
      service: services[Math.floor(Math.random() * services.length)],
    });
  }

  return reviews.sort((a, b) => b.date.getTime() - a.date.getTime());
};

export const MasterReviews: React.FC<MasterReviewsProps> = ({
  masterName,
  averageRating,
  totalReviews,
  reviews = generateMockReviews(),
}) => {
  const [sortBy, setSortBy] = useState<'newest' | 'highest' | 'lowest' | 'helpful'>('newest');
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const ratingDistribution = useMemo(() => {
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      dist[review.rating as keyof typeof dist]++;
    });
    return dist;
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    let filtered = filterRating ? reviews.filter((r) => r.rating === filterRating) : reviews;

    filtered = filtered.sort((a, b) => {
      if (sortBy === 'newest') return b.date.getTime() - a.date.getTime();
      if (sortBy === 'highest') return b.rating - a.rating;
      if (sortBy === 'lowest') return a.rating - b.rating;
      if (sortBy === 'helpful') return b.helpful - a.helpful;
      return 0;
    });

    return filtered;
  }, [reviews, sortBy, filterRating]);

  const formatDate = (date: Date) => {
    const days = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Сьогодні';
    if (days === 1) return 'Вчора';
    if (days < 7) return `${days} днів тому`;
    if (days < 30) return `${Math.floor(days / 7)} тижнів тому`;
    return `${Math.floor(days / 30)} місяців тому`;
  };

  return (
    <div className="w-full">
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Рецензії та Рейтинги</h1>
        <p className="text-lg text-gray-600">
          {masterName} має {totalReviews} рецензій
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Лівий блок - статистика рейтингу */}
        <div className="lg:col-span-1">
          {/* Основний рейтинг */}
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-6 border border-indigo-200 mb-6">
            <div className="text-center">
              <p className="text-5xl font-bold text-indigo-900 mb-2">{averageRating.toFixed(1)}</p>
              <div className="flex justify-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(averageRating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-indigo-700 font-medium">
                На основі {totalReviews} рецензій
              </p>
            </div>
          </div>

          {/* Розподіл рейтингів */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 mb-4">Розподіл рейтингів</h3>
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = ratingDistribution[rating as keyof typeof ratingDistribution];
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

              return (
                <div key={rating} className="flex items-center gap-3">
                  <button
                    onClick={() => setFilterRating(filterRating === rating ? null : rating)}
                    className={`text-sm font-medium transition-colors px-2 py-1 rounded ${
                      filterRating === rating
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {rating}
                    <Star className="w-3 h-3 ml-1 inline" />
                  </button>
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
                </div>
              );
            })}
          </div>

          {filterRating && (
            <button
              onClick={() => setFilterRating(null)}
              className="mt-4 w-full px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              Очистити фільтр
            </button>
          )}
        </div>

        {/* Правий блок - рецензії */}
        <div className="lg:col-span-2">
          {/* Сортування */}
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-200">
            <label className="text-sm font-medium text-gray-700">
              Сортування:
            </label>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as 'newest' | 'highest' | 'lowest' | 'helpful'
                )
              }
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="newest">Найновіші</option>
              <option value="highest">Найвищі рейтинги</option>
              <option value="lowest">Найнижчі рейтинги</option>
              <option value="helpful">Найкорисніші</option>
            </select>
          </div>

          {/* Рецензії */}
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <div key={review.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                {/* Заголовок рецензії */}
                <div className="flex items-start gap-4 mb-3">
                  <img
                    src={review.clientAvatar}
                    alt={review.clientName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold text-gray-900">{review.clientName}</h4>
                      {review.verified && (
                        <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Верифіковано
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatDate(review.date)}</span>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Назва сервісу */}
                <div className="mb-2 ml-14">
                  <span className="text-xs font-medium text-indigo-700 bg-indigo-50 px-2 py-1 rounded-full">
                    {review.service}
                  </span>
                </div>

                {/* Текст рецензії */}
                <div className="ml-14 mb-3">
                  <h5 className="font-medium text-gray-900 mb-1">{review.title}</h5>
                  <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
                </div>

                {/* Кнопки */}
                <div className="ml-14 flex items-center gap-4">
                  <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-indigo-600 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span>Корисно ({review.helpful})</span>
                  </button>
                  <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-indigo-600 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span>Відповісти</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredReviews.length === 0 && (
            <div className="text-center py-12">
              <User className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">Рецензій з таким рейтингом не знайдено</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
