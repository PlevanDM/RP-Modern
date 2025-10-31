'use client'

import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { SplineScene } from "./spline-scene";
import { Card } from "./card"
import { Spotlight } from "./spotlight"

export const SplineRobotDemo = memo(function SplineRobotDemo() {
  const { t } = useTranslation();
  
  return (
    <Card className="w-full h-[500px] bg-white relative overflow-hidden border-0 shadow-none">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="blue"
      />
      
      <div className="flex h-full flex-col md:flex-row">
        {/* Left content - Text */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            RepairHub Pro
          </h1>
          <p className="text-xl md:text-2xl font-bold text-gray-700 leading-relaxed">
            {t('common.modernPlatform')}
          </p>
        </div>

        {/* Right content - 3D Robot */}
        <div className="flex-1 relative min-h-[300px] md:min-h-0">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  )
});

