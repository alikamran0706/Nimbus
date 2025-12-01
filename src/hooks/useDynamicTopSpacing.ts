import { useEffect, useState } from "react";

export const useDynamicTopSpacing = (elementId: string) => {
  const [spacing, setSpacing] = useState<number>(0);

  useEffect(() => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const updateSpacing = () => {
      setSpacing(element.offsetHeight);
    };

    updateSpacing(); // initial call

    // Observe element resize
    const observer = new ResizeObserver(() => updateSpacing());
    observer.observe(element);

    // Adjust spacing on window resize
    window.addEventListener("resize", updateSpacing);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSpacing);
    };
  }, [elementId]);

  return spacing;
};
