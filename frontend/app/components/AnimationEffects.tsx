
"use client";

import { useEffect } from "react";

const selectors = [
  ".hero",
  ".workspace",
  ".student-dashboard",
  ".readiness-panel",
  ".suggestions-panel",
  ".dashboard-card",
  ".suggestion-item",
  ".career-path",
  ".career-progress",
  ".roadmap-item",
  ".performance-analytics",
  ".analytics-card",
  ".result-card",
  ".metric-card",
];

export default function AnimationEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    let observer: IntersectionObserver | null = null;
    let mutationObserver: MutationObserver | null = null;

    const revealAll = () => {
      document
        .querySelectorAll<HTMLElement>(selectors.join(","))
        .forEach((element) => {
          element.classList.add("pw-is-visible");
        });
    };

    const scan = () => {
      document
        .querySelectorAll<HTMLElement>(selectors.join(","))
        .forEach((element) => {
          if (element.dataset.pwReady === "true") return;

          element.dataset.pwReady = "true";

          if (reduceMotion.matches || !observer) {
            element.classList.add("pw-is-visible");
          } else {
            observer.observe(element);
          }
        });
    };

    if (!reduceMotion.matches && "IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("pw-is-visible");
              observer?.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.05,
          rootMargin: "0px 0px -20px 0px",
        }
      );
    }

    // Enable hidden initial states only after setup starts.
    scan();
    root.classList.add("pw-motion-ready");

    // Re-scan dashboard/results added after user interaction.
    scan();
    mutationObserver = new MutationObserver(scan);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    const handleMotionChange = () => {
      if (reduceMotion.matches) {
        revealAll();
        observer?.disconnect();
        observer = null;
      }
    };

    reduceMotion.addEventListener("change", handleMotionChange);

    return () => {
      mutationObserver?.disconnect();
      observer?.disconnect();
      reduceMotion.removeEventListener("change", handleMotionChange);
      root.classList.remove("pw-motion-ready");
    };
  }, []);

  return null;
}
