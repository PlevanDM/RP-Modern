import { useState } from "react";
import { X, Send, ChevronLeft, ChevronRight } from "lucide-react";
import { EscrowPaymentManager } from "../../../EscrowPaymentManager"; // Импортируем наш компонент

interface OrderDetailProps {
  orderId: string;
  orderTitle: string;
  orderDescription: string;
  masterName: string;
  masterAvatar: string;
  status: string;
  priority: string;
  startDate: string;
  estimatedEndDate: string;
  location: string;
  photos: string[];
  comments: { avatar: string; author: string; text: string; date: string }[];
  chatMessages: { sender: string; text: string; time: string }[];
  onBack: () => void;
}

export function OrderDetail({
  orderId,
  orderTitle,
  orderDescription,
  masterName,
  masterAvatar,
  status,
  priority,
  startDate,
  estimatedEndDate,
  location,
  photos,
  comments,
  chatMessages,
  onBack
}: OrderDetailProps) {
  const [activeTab, setActiveTab] = useState("photos");
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(chatMessages);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-x-hidden">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{orderTitle}</h2>
            <p className="text-sm text-gray-600 mt-1">Замовлення #{orderId}</p>
          </div>
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b flex gap-0">
          <button
            onClick={() => setActiveTab("photos")}
            className={`px-6 py-3 font-medium border-b-2 transition ${
              activeTab === "photos"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            📸 Фото
          </button>
          <button
            onClick={() => setActiveTab("details")}
            className={`px-6 py-3 font-medium border-b-2 transition ${
              activeTab === "details"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            📋 Деталі
          </button>
          <button
            onClick={() => setActiveTab("comments")}
            className={`px-6 py-3 font-medium border-b-2 transition ${
              activeTab === "comments"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            💬 Коментарії
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            className={`px-6 py-3 font-medium border-b-2 transition ${
              activeTab === "chat"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            💭 Чат
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Photos Tab */}
          {activeTab === "photos" && (
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                {photos.length > 0 ? (
                  <div className="relative">
                    <img
                      src={photos[currentPhotoIndex]}
                      alt={`photo-${currentPhotoIndex}`}
                      className="w-full h-96 object-cover"
                    />
                    {photos.length > 1 && (
                      <>
                        <button
                          onClick={() =>
                            setCurrentPhotoIndex(
                              (prev) => (prev - 1 + photos.length) % photos.length
                            )
                          }
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={() =>
                            setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
                          }
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
                          {currentPhotoIndex + 1} / {photos.length}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="h-96 flex items-center justify-center text-gray-500 bg-gray-50 rounded-lg">
                    <svg className="w-16 h-16 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 6h16M4 6a2 2 0 012-2h12a2 2 0 012 2M4 6v10a2 2 0 002 2h12a2 2 0 002-2V6m-4 0V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m0 0h8" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Details Tab */}
          {activeTab === "details" && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Основна інформація</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Опис</p>
                    <p className="font-medium text-gray-900">{orderDescription}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Локація</p>
                    <p className="font-medium text-gray-900">{location}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Статус та пріоритет</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Статус</p>
                    <p className="font-medium text-blue-600">{status}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Пріоритет</p>
                    <p className="font-medium text-red-600">{priority}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Термін виконання</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Початок</p>
                    <p className="font-medium text-gray-900">{startDate}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Очікуване завершення</p>
                    <p className="font-medium text-gray-900">{estimatedEndDate}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Майстер</h3>
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
                  <img
                    src={masterAvatar}
                    alt={masterName}
                    className="w-12 h-12 rounded-full"
                  />
                  <p className="font-medium text-gray-900">{masterName}</p>
                </div>
              </div>

              {/* === ESCROW PAYMENT MANAGER === */}
              <div className="mt-6">
                <EscrowPaymentManager
                  orderId={orderId}
                  clientId="client-1" // Заглушка, в будущем нужно будет прокидывать реальные ID
                  masterId="master-1" // Заглушка
                  amount={5000}       // Заглушка, нужно будет брать реальную сумму заказа
                  userRole="client"   // Заглушка, роль должна определяться динамически
                />
              </div>
              {/* ============================== */}
            </div>
          )}

          {/* Comments Tab */}
          {activeTab === "comments" && (
            <div className="space-y-4">
              {comments.length > 0 ? (
                comments.map((comment, idx) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <img
                        src={comment.avatar}
                        alt={comment.author}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{comment.author}</p>
                        <p className="text-sm text-gray-600">{comment.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{comment.date}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Коментарів немає</p>
              )}
            </div>
          )}

          {/* Chat Tab */}
          {activeTab === "chat" && (
            <div className="space-y-4 flex flex-col h-96">
              <div className="flex-1 overflow-y-auto bg-gray-50 rounded-lg p-4 space-y-3">
                {messages.length > 0 ? (
                  messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${
                        msg.sender === "client" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          msg.sender === "client"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-900"
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">Чат порожній</p>
                )}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Написати повідомлення..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button 
                  onClick={() => {
                    if (newMessage.trim()) {
                      const now = new Date();
                      const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
                      setMessages([...messages, {
                        sender: 'client',
                        text: newMessage,
                        time: time
                      }]);
                      setNewMessage('');
                    }
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2 transition"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
