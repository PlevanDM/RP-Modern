import { motion } from 'framer-motion';

// Simple SVG Icons
const DollarSign = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const Package = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const Handshake = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3m0 0l3 3m-3-3v6m6-9v12m-6 12a9 9 0 019-9" />
  </svg>
);

const X = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Check = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

interface QuickActionsProps {
  isMaster: boolean;
  onMakeOffer: () => void;
  onOfferPart: () => void;
  onNegotiate: () => void;
}

export function QuickActions({ isMaster, onMakeOffer, onOfferPart, onNegotiate }: QuickActionsProps) {
  return (
      <div className="flex gap-2 p-4 bg-white border-b border-gray-200">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onMakeOffer}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition text-sm font-semibold"
      >
        <DollarSign />
        {isMaster ? 'Запропонувати ціну' : 'Запитати ціну'}
      </motion.button>
      {isMaster && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOfferPart}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition text-sm font-semibold"
        >
          <Package />
          Запчастина
        </motion.button>
      )}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNegotiate}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition text-sm font-semibold"
      >
        <Handshake />
        Торгуватися
      </motion.button>
    </div>
  );
}

interface ProposalMessageProps {
  price: number;
  description: string;
  status: 'pending' | 'accepted' | 'rejected';
  isFromMe: boolean;
  onAccept: () => void;
  onReject: () => void;
}

export function ProposalMessage({
  price,
  description,
  status,
  isFromMe,
  onAccept,
  onReject
}: ProposalMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-3 rounded-lg border-2 ${
        isFromMe
          ? 'bg-blue-50 border-blue-200'
          : 'bg-white border-gray-300'
      }`}
    >
        <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="text-blue-600"><DollarSign /></div>
          <span className="font-semibold text-gray-900">Пропозиція ціни</span>
        </div>
        <span className="text-2xl font-bold text-blue-600">₴{price.toLocaleString()}</span>
      </div>
      <p className="text-sm text-gray-700 mb-3">{description}</p>
      
      {!isFromMe && status === 'pending' && (
        <div className="flex gap-2 mt-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAccept}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-semibold"
          >
            <Check />
            Прийняти
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onReject}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm font-semibold"
          >
            <X />
            Відхилити
          </motion.button>
        </div>
      )}
      
      {status !== 'pending' && (
        <div className={`mt-2 px-3 py-1 rounded-lg text-sm font-semibold ${
          status === 'accepted'
            ? 'bg-green-100 text-green-700'
            : status === 'rejected'
            ? 'bg-red-100 text-red-700'
            : 'bg-gray-100 text-gray-700'
        }`}>
          {status === 'accepted' && '✅ Прийнято'}
          {status === 'rejected' && '❌ Відхилено'}
          {status === 'cancelled' && '⏸️ Скасовано'}
        </div>
      )}
    </motion.div>
  );
}

interface NegotiateMessageProps {
  currentPrice: number;
  newPrice: number;
  message: string;
  isFromMe: boolean;
  onAccept: () => void;
  onCounter: () => void;
}

export function NegotiateMessage({
  currentPrice,
  newPrice,
  message,
  isFromMe,
  onAccept,
  onCounter
}: NegotiateMessageProps) {
  const difference = newPrice - currentPrice;
  const isIncrease = difference > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-3 rounded-lg border-2 ${
        isFromMe
          ? 'bg-orange-50 border-orange-200'
          : 'bg-white border-gray-300'
      }`}
    >
        <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="text-orange-600"><Handshake /></div>
          <span className="font-semibold text-gray-900">Торгівля</span>
        </div>
        <div className="text-right">
          <div className={`text-lg font-bold ${isIncrease ? 'text-red-600' : 'text-green-600'}`}>
            ₴{newPrice.toLocaleString()}
          </div>
          <div className={`text-xs ${isIncrease ? 'text-red-500' : 'text-green-500'}`}>
            {isIncrease ? '+' : ''}{difference.toLocaleString()} ₴
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-700 mb-3">{message}</p>
      
      {!isFromMe && (
        <div className="flex gap-2 mt-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAccept}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-semibold"
          >
            <Check />
            Прийняти
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCounter}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition text-sm font-semibold"
          >
            <Handshake />
            Контр-пропозиція
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}
