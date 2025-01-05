export const DEVICE_TYPES = {
    DESKTOP: 'desktop',
    MOBILE: 'mobile',
    TABLET: 'tablet'
  } as const;
  
  export type DeviceType = typeof DEVICE_TYPES[keyof typeof DEVICE_TYPES];
  
  export function detectDevice(): DeviceType {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /iphone|ipad|ipod|android|blackberry|windows phone/g.test(userAgent);
    const isTablet = /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(userAgent);
    
    if (isTablet) return DEVICE_TYPES.TABLET;
    if (isMobile) return DEVICE_TYPES.MOBILE;
    return DEVICE_TYPES.DESKTOP;
  }
  
  export function isInAppBrowser(): boolean {
    const userAgent = navigator.userAgent.toLowerCase();
    return /metamask|coinbase|trust|crypto/i.test(userAgent);
  }