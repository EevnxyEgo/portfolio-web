"use client";

import { useState, useEffect } from "react";

interface UseMediaQueryOptions {
  initializeWithValue?: boolean;
}

interface MediaQuery {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLargeDesktop: boolean;
  prefersReducedMotion: boolean;
  prefersDarkColorScheme: boolean;
}

export function useMediaQuery(options: UseMediaQueryOptions = {}): MediaQuery {
  const { initializeWithValue = true } = options;

  const getMatches = (query: string): boolean => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return initializeWithValue ? false : true;
  };

  const [mediaQuery, setMediaQuery] = useState<MediaQuery>(() => ({
    isMobile: getMatches("(max-width: 639px)"),
    isTablet: getMatches("(min-width: 640px) and (max-width: 1023px)"),
    isDesktop: getMatches("(min-width: 1024px) and (max-width: 1279px)"),
    isLargeDesktop: getMatches("(min-width: 1280px)"),
    prefersReducedMotion: getMatches("(prefers-reduced-motion: reduce)"),
    prefersDarkColorScheme: getMatches("(prefers-color-scheme: dark)"),
  }));

  useEffect(() => {
    const mediaQueryList = {
      isMobile: window.matchMedia("(max-width: 639px)"),
      isTablet: window.matchMedia("(min-width: 640px) and (max-width: 1023px)"),
      isDesktop: window.matchMedia("(min-width: 1024px) and (max-width: 1279px)"),
      isLargeDesktop: window.matchMedia("(min-width: 1280px)"),
      prefersReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)"),
      prefersDarkColorScheme: window.matchMedia("(prefers-color-scheme: dark)"),
    };

    const handler = (event: MediaQueryListEvent) => {
      setMediaQuery((prev) => ({
        ...prev,
        [event.media.replace("(max-width: 639px)", "isMobile")]:
          event.matches,
      }));
    };

    const desktopHandler = (event: MediaQueryListEvent) => {
      if (event.media === "(min-width: 1024px) and (max-width: 1279px)") {
        setMediaQuery((prev) => ({
          ...prev,
          isDesktop: event.matches,
        }));
      } else if (event.media === "(min-width: 1280px)") {
        setMediaQuery((prev) => ({
          ...prev,
          isLargeDesktop: event.matches,
        }));
      }
    };

    Object.values(mediaQueryList).forEach((mql) => {
      mql.addEventListener("change", handler);
      mql.addEventListener("change", desktopHandler);
    });

    return () => {
      Object.values(mediaQueryList).forEach((mql) => {
        mql.removeEventListener("change", handler);
        mql.removeEventListener("change", desktopHandler);
      });
    };
  }, []);

  return mediaQuery;
}
