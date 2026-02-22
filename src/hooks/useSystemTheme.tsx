import { useEffect } from "react";

export function useSystemTheme(): void {
  useEffect(() => {
    const mediaQuery: MediaQueryList =
      window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = (isDark: boolean): void => {
      if (isDark) {
        document.body.setAttribute("data-theme", "dark");
      } else {
        document.body.removeAttribute("data-theme");
      }
    };

    // Apply on initial load
    applyTheme(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent): void => {
      applyTheme(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);
}
