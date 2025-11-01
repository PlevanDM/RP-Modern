import { useState } from 'react';
import { Calendar, Truck, Package, MapPin, X } from 'lucide-react';
import { BookedDate } from '../types';

interface BookingCalendarProps {
  t: (key: string) => string;
  language: 'en' | 'uk';
  bookedDates: BookedDate[];
  setBookedDates: (dates: BookedDate[]) => void;
  userRole: 'client' | 'master';
}

export function BookingCalendar({
  t,
  language,
  bookedDates,
  setBookedDates,
  userRole
}: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [logisticsType, setLogisticsType] = useState<'self' | 'pickup' | 'novaposhta'>('self');
  const [shippingAddress, setShippingAddress] = useState('');
  const [notes, setNotes] = useState('');

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const handleDateClick = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const isBooked = bookedDates.some(bd => bd.date.toDateString() === date.toDateString());
    const isPast = date < new Date() && date.getTime() - new Date().getTime() < 0;

    if (!isBooked && !isPast) {
      setSelectedDate(date);
      setShowBookingModal(true);
    }
  };

  const handleConfirmBooking = () => {
    if (!selectedDate) return;

    const newBooking: BookedDate = {
      id: `booking_${Date.now()}`,
      date: selectedDate,
      status: 'booked',
      logisticsType,
      shippingAddress: logisticsType === 'self' ? shippingAddress : '',
      novaPnestaAddress: logisticsType === 'novaposhta' ? shippingAddress : '',
      notes,
      orderId: '',
      userId: ''
    };

    setBookedDates([...bookedDates, newBooking]);
    setShowBookingModal(false);
    setSelectedDate(null);
    setLogisticsType('self');
    setShippingAddress('');
    setNotes('');
  };

  const handleBlockDate = () => {
    if (!selectedDate) return;

    const newBlockedDate: BookedDate = {
      id: `blocked_${Date.now()}`,
      date: selectedDate,
      status: 'cancelled',
      orderId: '',
      userId: ''
    };

    setBookedDates([...bookedDates, newBlockedDate]);
    setShowBookingModal(false);
    setSelectedDate(null);
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const days = [];

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const monthName = currentMonth.toLocaleDateString(language === 'uk' ? 'uk-UA' : 'en-US', {
    month: 'long',
    year: 'numeric'
  });

  const logisticsOptions = [
    {
      id: 'self',
      label: language === 'uk' ? 'Самодоставка' : 'Self Delivery',
      description: language === 'uk' ? 'Ми доставимо' : 'We will deliver',
      icon: Truck,
      color: 'indigo'
    },
    {
      id: 'pickup',
      label: language === 'uk' ? 'Самовивіз' : 'Self Pickup',
      description: language === 'uk' ? 'Заберіть самостійно' : 'Pick up yourself',
      icon: Package,
      color: 'blue'
    },
    {
      id: 'novaposhta',
      label: 'Nova Poshta',
      description: language === 'uk' ? 'Відправка поштою' : 'Postal delivery',
      icon: MapPin,
      color: 'purple'
    }
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          {t('bookingCalendar')}
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          {language === 'uk'
            ? 'Виберіть дату для вашого ремонту'
            : 'Choose a date for your repair service'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handlePrevMonth}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              ←
            </button>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {monthName}
            </h3>
            <button
              onClick={handleNextMonth}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              →
            </button>
          </div>

          {/* Days Header */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div
                key={day}
                className="text-xs font-bold text-slate-600 dark:text-slate-400 py-2 text-center"
              >
                {language === 'uk'
                  ? ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'][
                      ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(day)
                    ]
                  : day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: firstDay }).map((_, idx) => (
              <div key={`empty_${idx}`} />
            ))}
            {days.map(day => {
              const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
              const isBooked = bookedDates.some(bd => bd.date.toDateString() === date.toDateString());
              const isPast = date < new Date() && date.getTime() - new Date().getTime() < -86400000;
              const isToday = date.toDateString() === new Date().toDateString();

              return (
                <button
                  key={day}
                  onClick={() => handleDateClick(day)}
                  disabled={isBooked || isPast}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                    isBooked
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 cursor-not-allowed'
                      : isPast
                      ? 'text-slate-300 dark:text-slate-600 bg-transparent cursor-not-allowed'
                      : isToday
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 cursor-pointer'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 flex gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-indigo-600 rounded"></div>
              <span className="text-xs text-slate-600 dark:text-slate-400">
                {language === 'uk' ? 'Сьогодні' : 'Today'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-100 rounded"></div>
              <span className="text-xs text-slate-600 dark:text-slate-400">
                {language === 'uk' ? 'Заброньовано' : 'Booked'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-slate-100 rounded"></div>
              <span className="text-xs text-slate-600 dark:text-slate-400">
                {language === 'uk' ? 'Доступно' : 'Available'}
              </span>
            </div>
          </div>
        </div>

        {/* Booked Dates Sidebar */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {language === 'uk' ? 'Забронійовані дати' : 'Booked Dates'}
          </h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {bookedDates.length > 0 ? (
              bookedDates.map(bd => (
                <div key={bd.id} className="bg-white/10 p-3 rounded-lg backdrop-blur">
                  <p className="font-medium text-sm">
                    {bd.date.toLocaleDateString(language === 'uk' ? 'uk-UA' : 'en-US')}
                  </p>
                  <p className="text-xs text-white/80 mt-1">
                    {bd.logisticsType === 'self'
                      ? language === 'uk'
                        ? '🚚 Самодоставка'
                        : '🚚 Self Delivery'
                      : bd.logisticsType === 'pickup'
                      ? language === 'uk'
                        ? '📦 Самовивіз'
                        : '📦 Self Pickup'
                      : '📬 Nova Poshta'}
                  </p>
                  {bd.notes && (
                    <p className="text-xs text-white/70 mt-1 line-clamp-2">{bd.notes}</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-white/60 text-sm">
                {language === 'uk' ? 'Немає бронювань' : 'No bookings yet'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedDate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-x-hidden">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {language === 'uk'
                  ? `Бронювання: ${selectedDate.toLocaleDateString('uk-UA')}`
                  : `Booking: ${selectedDate.toLocaleDateString('en-US')}`}
              </h3>
              <button
                onClick={() => setShowBookingModal(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Logistics Options */}
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  {language === 'uk'
                    ? '🚚 Способ доставки/вивезення'
                    : '🚚 Delivery/Pickup Method'}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {logisticsOptions.map(option => {
                    const Icon = option.icon;
                    const isSelected = logisticsType === option.id;
                    return (
                      <button
                        key={option.id}
                        onClick={() => setLogisticsType(option.id as 'self' | 'pickup' | 'novaposhta')}
                        className={`p-4 rounded-lg border-2 transition-all text-left ${
                          isSelected
                            ? `border-${option.color}-600 bg-${option.color}-50 dark:bg-${option.color}-900/20`
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 mb-2 ${
                            isSelected
                              ? `text-${option.color}-600`
                              : 'text-slate-400'
                          }`}
                        />
                        <p className={`font-semibold ${
                          isSelected
                            ? 'text-slate-900 dark:text-slate-100'
                            : 'text-slate-700 dark:text-slate-300'
                        }`}>
                          {option.label}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {option.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Address Input */}
              {(logisticsType === 'self' || logisticsType === 'novaposhta') && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {logisticsType === 'self'
                      ? language === 'uk'
                        ? 'Адреса доставки'
                        : 'Delivery Address'
                      : language === 'uk'
                      ? 'Адреса Nova Poshta'
                      : 'Nova Poshta Address'}
                  </label>
                  <input
                    type="text"
                    value={shippingAddress}
                    onChange={e => setShippingAddress(e.target.value)}
                    placeholder={
                      logisticsType === 'self'
                        ? language === 'uk'
                          ? 'Вулиця, будинок, номер квартири'
                          : 'Street, building, apartment number'
                        : language === 'uk'
                        ? 'Номер відділення Nova Poshta'
                        : 'Nova Poshta branch number'
                    }
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {language === 'uk' ? 'Додаткові примітки' : 'Additional Notes'}
                </label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder={
                    language === 'uk'
                      ? 'Час доставки,특ы усереди тощо...'
                      : 'Time preferences, special instructions, etc...'
                  }
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors font-medium"
                >
                  {language === 'uk' ? 'Скасувати' : 'Cancel'}
                </button>
                <button
                  onClick={handleConfirmBooking}
                  disabled={!shippingAddress && logisticsType !== 'pickup'}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {language === 'uk' ? 'Забронювати' : 'Confirm Booking'}
                </button>
                {userRole === 'master' && (
                  <button
                    onClick={handleBlockDate}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    {language === 'uk' ? 'Заблокувати' : 'Block Date'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
