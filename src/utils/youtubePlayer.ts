/**
 * YouTube IFrame API loader and utility helper
 */

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export type YouTubePlayerInstance = any;

let isApiLoading = false;
const readyCallbacks: Array<(YT: any) => void> = [];

export function loadYouTubeAPI(): Promise<any> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return;

    if (window.YT && window.YT.Player) {
      resolve(window.YT);
      return;
    }

    readyCallbacks.push((yt) => resolve(yt));

    if (!isApiLoading) {
      isApiLoading = true;
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) {
          try {
            prevCallback();
          } catch (e) {
            console.error('Error in previous onYouTubeIframeAPIReady', e);
          }
        }
        const YT = window.YT;
        readyCallbacks.forEach((cb) => cb(YT));
        readyCallbacks.length = 0;
      };

      const existingScript = document.querySelector('script[src*="youtube.com/iframe_api"]');
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        tag.async = true;
        document.body.appendChild(tag);
      }

      // Fallback poll in case onYouTubeIframeAPIReady already triggered
      const pollInterval = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(pollInterval);
          readyCallbacks.forEach((cb) => cb(window.YT));
          readyCallbacks.length = 0;
        }
      }, 200);

      setTimeout(() => clearInterval(pollInterval), 10000);
    }
  });
}
