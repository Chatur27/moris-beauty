"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Pause, Play, Sparkles } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { withBasePath } from "@/lib/site-path";

const HeroScene = dynamic(() => import("@/components/hero-scene"), {
  ssr: false,
  loading: () => null,
});

function StaticHeroProduct() {
  return (
    <div className="hero-static-product" aria-hidden="true">
      <div className="hero-static-card" />
      <Image
        src={withBasePath("/rivage-glow-bottle.png")}
        alt=""
        width={1040}
        height={1440}
        priority
        unoptimized
      />
    </div>
  );
}

class HeroSceneBoundary extends Component<
  { children: ReactNode; onFailure: () => void },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onFailure();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

type SceneStatus = "loading" | "ready" | "failed";

export function HeroVisual() {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(true);
  const [sceneStatus, setSceneStatus] = useState<SceneStatus>("loading");
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const animate = enabled && !prefersReducedMotion && isVisible && !isScrolling;

  useEffect(() => {
    const element = containerRef.current;
    if (!element || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.18 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let timeoutId = 0;

    const handleScroll = () => {
      setIsScrolling(true);
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => setIsScrolling(false), 140);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(timeoutId);
    };
  }, []);

  const handleReady = useCallback(() => setSceneStatus("ready"), []);
  const handleFailure = useCallback(() => setSceneStatus("failed"), []);

  return (
    <div className="hero-visual-v3" ref={containerRef}>
      <div className="hero-v3-noise" />
      <div className="hero-v3-kicker"><Sparkles size={14} /> Featured ritual</div>
      <div
        className="hero-v3-canvas"
        role="img"
        aria-label="Interactive three-dimensional presentation of Rivage Glow serum"
      >
        {(prefersReducedMotion || sceneStatus === "failed") && (
          <div className="hero-v3-poster-layer is-static">
            <StaticHeroProduct />
          </div>
        )}

        {!prefersReducedMotion && sceneStatus === "loading" && (
          <div className="hero-v3-loading-layer" aria-hidden="true">
            <span className="hero-v3-loading-orbit" />
            <small>Preparing interactive product scene</small>
          </div>
        )}

        {!prefersReducedMotion && sceneStatus !== "failed" && (
          <div className={`hero-v3-live-layer ${sceneStatus === "ready" ? "is-ready" : ""}`}>
            <HeroSceneBoundary onFailure={handleFailure}>
              <HeroScene
                animate={animate}
                onReady={handleReady}
                onFailure={handleFailure}
              />
            </HeroSceneBoundary>
          </div>
        )}
      </div>
      <div className="hero-v3-note hero-v3-note-a">
        <small>01</small>
        <span>Lightweight glow for humid island days</span>
      </div>
      <div className="hero-v3-note hero-v3-note-b">
        <small>02</small>
        <span>Niacinamide + marine minerals</span>
      </div>
      {!prefersReducedMotion && sceneStatus !== "failed" && (
        <button
          className="motion-toggle-v3"
          onClick={() => setEnabled((value) => !value)}
          aria-pressed={!enabled}
        >
          {enabled ? <Pause size={13} /> : <Play size={13} />}
          {enabled ? "Pause 3D" : "Play 3D"}
        </button>
      )}
    </div>
  );
}
