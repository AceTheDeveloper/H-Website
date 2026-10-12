"use client";

import { useEffect } from "react";

const PLAYED_KEY = "h-welcome-played";

/**
 * Plays the spoken welcome once per visit when the home page opens.
 *
 * Browsers block sound until the visitor has interacted with the site, so if
 * the first attempt is refused the clip plays on their first tap, click or key
 * press instead.
 */
export default function WelcomeAudio() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(PLAYED_KEY)) return;
    } catch {
      // Storage unavailable (private mode): just play.
    }

    const audio = new Audio("/welcome.mp3");
    const events = ["pointerdown", "keydown", "touchstart"] as const;

    const stopWaiting = () =>
      events.forEach((name) => window.removeEventListener(name, play));

    function play() {
      audio
        .play()
        .then(() => {
          stopWaiting();
          try {
            sessionStorage.setItem(PLAYED_KEY, "1");
          } catch {
            // Nothing to remember it in.
          }
        })
        .catch(() => {
          // Autoplay refused: the listeners below will try again.
        });
    }

    events.forEach((name) =>
      window.addEventListener(name, play, { passive: true }),
    );
    play();

    return () => {
      stopWaiting();
      audio.pause();
    };
  }, []);

  return null;
}
