import { useEffect } from "react";

const isIOS = () => {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  const iOSDevice = /iPad|iPhone|iPod/.test(ua);
  // iPadOS reports as Mac, but has touch points
  const iPadOS = navigator.platform === "MacIntel" && (navigator as any).maxTouchPoints > 1;
  return iOSDevice || iPadOS;
};

/**
 * iOS Safari ignores `overscroll-behavior` in many cases.
 * This prevents the rubber-band (elastic) scroll at the very top/bottom of the page
 * without breaking normal scrolling.
 */
export function usePreventElasticScroll() {
  useEffect(() => {
    if (!isIOS()) return;

    const scrollingEl =
      (document.scrollingElement as HTMLElement | null) ||
      (document.documentElement as HTMLElement | null);
    if (!scrollingEl) return;

    let startY = 0;

    const onTouchStart = (e: TouchEvent) => {
      startY = e.touches?.[0]?.clientY ?? 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      const currentY = e.touches?.[0]?.clientY ?? 0;
      const deltaY = currentY - startY;

      const scrollTop = scrollingEl.scrollTop;
      const maxScrollTop = scrollingEl.scrollHeight - scrollingEl.clientHeight;

      const isPullingDownAtTop = scrollTop <= 0 && deltaY > 0;
      const isPullingUpAtBottom = scrollTop >= maxScrollTop && deltaY < 0;

      if (isPullingDownAtTop || isPullingUpAtBottom) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchstart", onTouchStart, { passive: true });
    // MUST be non-passive for preventDefault
    document.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
    };
  }, []);
}
