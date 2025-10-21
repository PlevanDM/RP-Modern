
import * as React from 'react';
import { devicePhotoService } from '../services/devicePhotoService';
import type { IFixitGuide } from '../services/devicePhotoService';
import type { DeviceModel } from '../types/models';

/**
 * Hook для получения iFixit гайдов ремонта
 */
export const useIFixitGuides = (deviceName?: string) => {
  const [guides, setGuides] = React.useState<IFixitGuide | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!deviceName) return;

    const fetchGuides = async () => {
      setLoading(true);
      try {
        const guide = await devicePhotoService.fetchIFixitGuide(deviceName);
        setGuides(guide);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch guides');
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, [deviceName]);

  return { guides, loading, error };
};

/**
 * Hook для получения нескольких гайдов
 */
export const useIFixitGuidesForModels = (models?: DeviceModel[]) => {
  const [guidesMap, setGuidesMap] = React.useState<Map<string, IFixitGuide | null>>(
    new Map()
  );
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!models || models.length === 0) return;

    const fetchGuides = async () => {
      setLoading(true);
      try {
        const guides = await devicePhotoService.fetchIFixitGuidesForModels(models);
        setGuidesMap(guides);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch guides');
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, [models]); // зависит от количества моделей

  return { guidesMap, loading, error };
};
