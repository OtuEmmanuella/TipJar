import { useState, useEffect } from 'react';
import { detectDevice, isInAppBrowser, DeviceType } from '../utils/device';

interface DeviceInfo {
  deviceType: DeviceType;
  isInAppBrowser: boolean;
}

export function useDevice(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    deviceType: 'desktop',
    isInAppBrowser: false
  });

  useEffect(() => {
    // Only run device detection on the client side
    setDeviceInfo({
      deviceType: detectDevice(),
      isInAppBrowser: isInAppBrowser()
    });
  }, []);

  return deviceInfo;
}