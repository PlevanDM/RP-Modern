import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, Droplets, Wind, TrendingUp } from 'lucide-react';

interface Weather {
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

interface Rates {
  usd: number;
  usdt: number;
  btc: number;
}

export function HeaderWidgets() {
  const [time, setTime] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [weather, setWeather] = useState<Weather>({
    temp: 15,
    condition: 'Хмарно',
    humidity: 65,
    windSpeed: 12,
  });
  const [rates, setRates] = useState<Rates>({
    usd: 41.5,
    usdt: 41.45,
    btc: 67500,
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('uk-UA', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      });
      const dateStr = now.toLocaleDateString('uk-UA', { 
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });
      setTime(timeStr);
      setDate(dateStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="flex justify-between items-center px-6 py-3">
        {/* Ліва сторона - Час і дата */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-right"
        >
          <div className="text-xl font-bold text-gray-900 font-mono">{time}</div>
          <div className="text-xs text-gray-500 uppercase tracking-wider">{date}</div>
        </motion.div>

        {/* Права сторона - Погода, валюти, крипто */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          {/* Погода */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:border-blue-300 transition whitespace-nowrap"
          >
            <Cloud className="w-4 h-4 text-blue-600" />
            <div className="text-xs">
              <div className="font-semibold text-gray-900">{weather.temp}°C</div>
              <div className="text-xs text-gray-600">{weather.condition}</div>
            </div>
          </motion.div>

          {/* USD */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200 hover:border-green-300 transition whitespace-nowrap"
          >
            <TrendingUp className="w-4 h-4 text-green-600" />
            <div className="text-xs">
              <div className="text-xs text-gray-600">USD</div>
              <div className="font-semibold text-gray-900">₴{rates.usd.toFixed(2)}</div>
            </div>
          </motion.div>

          {/* USDT */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-cyan-50 to-cyan-100 rounded-lg border border-cyan-200 hover:border-cyan-300 transition whitespace-nowrap"
          >
            <TrendingUp className="w-4 h-4 text-cyan-600" />
            <div className="text-xs">
              <div className="text-xs text-gray-600">USDT</div>
              <div className="font-semibold text-gray-900">₴{rates.usdt.toFixed(2)}</div>
            </div>
          </motion.div>

          {/* Bitcoin */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200 hover:border-orange-300 transition whitespace-nowrap"
          >
            <TrendingUp className="w-4 h-4 text-orange-600" />
            <div className="text-xs">
              <div className="text-xs text-gray-600">BTC</div>
              <div className="font-semibold text-gray-900">${(rates.btc / 1000).toFixed(1)}k</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
