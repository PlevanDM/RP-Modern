import React from "react";
import { PortfolioGallery, PortfolioItem } from "../../ui/portfolio-gallery";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { cn } from "../../../lib/utils";
import {
  Smartphone,
  Wrench,
  Star,
  Calendar,
  Award,
  Users,
  TrendingUp,
  Clock
} from "lucide-react";

// Примеры данных для портфолио мастеров
const samplePortfolioItems: PortfolioItem[] = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?q=80&w=880&auto=format&fit=crop",
    title: "Замена экрана iPhone 15 Pro",
    description: "Полная замена OLED экрана с сохранением всех функций Face ID и True Tone",
    deviceType: "iPhone 15 Pro",
    repairType: "Замена экрана",
    rating: 5,
    completedDate: "15.10.2024"
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=880&auto=format&fit=crop",
    title: "Ремонт MacBook Pro M3",
    description: "Замена материнской платы и восстановление всех данных пользователя",
    deviceType: "MacBook Pro",
    repairType: "Ремонт материнки",
    rating: 5,
    completedDate: "12.10.2024"
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=880&auto=format&fit=crop",
    title: "Восстановление Samsung Galaxy S24",
    description: "Замена задней панели и ремонт камеры после падения",
    deviceType: "Samsung Galaxy S24",
    repairType: "Ремонт корпуса",
    rating: 4.8,
    completedDate: "10.10.2024"
  },
  {
    id: "4",
    imageUrl: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?q=80&w=880&auto=format&fit=crop",
    title: "Замена аккумулятора iPad Pro",
    description: "Замена оригинального аккумулятора с калибровкой системы",
    deviceType: "iPad Pro 12.9",
    repairType: "Замена батареи",
    rating: 5,
    completedDate: "08.10.2024"
  },
  {
    id: "5",
    imageUrl: "https://images.unsplash.com/photo-1574944985070-e6049f9a9c60?q=80&w=880&auto=format&fit=crop",
    title: "Ремонт AirPods Pro 2",
    description: "Замена динамика и восстановление шумоподавления",
    deviceType: "AirPods Pro 2",
    repairType: "Ремонт наушников",
    rating: 4.9,
    completedDate: "05.10.2024"
  },
  {
    id: "6",
    imageUrl: "https://images.unsplash.com/photo-1556656793-08538906a9f8?q=80&w=880&auto=format&fit=crop",
    title: "Восстановление Apple Watch",
    description: "Замена корпуса и экрана после повреждения влагой",
    deviceType: "Apple Watch Series 9",
    repairType: "Восстановление",
    rating: 5,
    completedDate: "03.10.2024"
  }
];

const stats = [
  { number: "5000+", label: "Выполненных ремонтов", icon: Wrench },
  { number: "4.9", label: "Средний рейтинг", icon: Star },
  { number: "98%", label: "Довольных клиентов", icon: Users },
  { number: "30", label: "Квалифицированных мастеров", icon: Award }
];

export function PortfolioDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Header */}
        <div className="text-center space-y-4">
          <Badge className="bg-blue-500/20 text-blue-200 border-blue-400/30">
            <Star className="w-3 h-3 mr-1" />
            Демонстрация компонентов
          </Badge>
          <h1 className="text-4xl font-bold text-white">
            Галерея портфолио мастеров
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Интерактивная галерея с миниатюрами для демонстрации работ по ремонту техники
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 text-center p-4">
              <div className="flex justify-center mb-2">
                <stat.icon className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white">{stat.number}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Main Portfolio Gallery */}
        <PortfolioGallery
          items={samplePortfolioItems}
          showDetails={true}
          autoplay={true}
          autoplayDelay={5000}
          className="shadow-2xl"
        />

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Быстрая навигация</h3>
            </div>
            <p className="text-slate-400">
              Миниатюры позволяют быстро переключаться между работами без ожидания загрузки
            </p>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Детальная информация</h3>
            </div>
            <p className="text-slate-400">
              Отображение типа устройства, вида ремонта, рейтинга и даты выполнения
            </p>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Адаптивность</h3>
            </div>
            <p className="text-slate-400">
              Оптимизировано для всех устройств с поддержкой сенсорного управления
            </p>
          </Card>
        </div>

        {/* Usage Example */}
        <Card className="bg-slate-900 border-slate-700">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Как использовать в проекте
            </h3>
            <div className="bg-slate-800 rounded-lg p-4 mb-4">
              <pre className="text-slate-300 text-sm overflow-x-auto">
{`import { PortfolioGallery, PortfolioItem } from "@/components/ui/portfolio-gallery";

const portfolioItems: PortfolioItem[] = [
  {
    id: "1",
    imageUrl: "https://example.com/image1.jpg",
    title: "Ремонт iPhone",
    description: "Описание выполненной работы",
    deviceType: "iPhone 15",
    repairType: "Замена экрана",
    rating: 5,
    completedDate: "15.10.2024"
  }
];

<PortfolioGallery
  items={portfolioItems}
  showDetails={true}
  autoplay={false}
/>`}
              </pre>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="border-blue-400/30 text-blue-200">
                Автоматическая прокрутка
              </Badge>
              <Badge variant="outline" className="border-green-400/30 text-green-200">
                Анимации с Framer Motion
              </Badge>
              <Badge variant="outline" className="border-purple-400/30 text-purple-200">
                Адаптивный дизайн
              </Badge>
              <Badge variant="outline" className="border-yellow-400/30 text-yellow-200">
                TypeScript поддержка
              </Badge>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
}


