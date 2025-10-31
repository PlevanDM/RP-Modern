'use client'

import { Suspense, lazy, useState, useEffect } from 'react'
import { SplineErrorBoundary } from './SplineErrorBoundary'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

function SplineErrorFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
      <div className="text-center p-4">
        <p className="text-sm text-gray-600">3D анімація недоступна</p>
        <p className="text-xs text-gray-500 mt-1">Ваш браузер не підтримує WebGL</p>
      </div>
    </div>
  )
}

// Перевірка доступності WebGL
function checkWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch {
    return false;
  }
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    setWebGLSupported(checkWebGLSupport());
  }, []);

  // Якщо WebGL не підтримується, одразу показуємо fallback
  if (webGLSupported === false) {
    return <SplineErrorFallback />;
  }

  // Якщо помилка завантаження
  if (loadError) {
    return <SplineErrorFallback />;
  }

  return (
    <SplineErrorBoundary fallback={<SplineErrorFallback />}>
      <Suspense 
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
      >
        <Spline
          scene={scene}
          className={className}
          onError={(error) => {
            console.warn('Spline loading error (non-critical):', error);
            setLoadError(true);
          }}
        />
      </Suspense>
    </SplineErrorBoundary>
  )
}
