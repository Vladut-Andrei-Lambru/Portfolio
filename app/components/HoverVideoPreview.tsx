"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { ProjectVideo } from "@/lib/projects";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function EvidenceLoop({
  src,
  poster,
  title,
}: {
  src: string;
  poster?: string;
  title: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setEnabled(!preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setLoaded(true);
      },
      { threshold: 0.1 },
    );
    observer.observe(video);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (loaded && visible && enabled) {
      video.play().catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  }, [loaded, visible, enabled]);

  return (
    <div className="evidence-loop">
      <video
        ref={videoRef}
        src={loaded ? src : undefined}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={title}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        className="evidence-playback"
        aria-label={`${playing ? "Pause" : "Play"} ${title}`}
        onClick={() => {
          setLoaded(true);
          setEnabled(!playing);
          if (!playing && loaded) {
            videoRef.current?.play().catch(() => setPlaying(false));
          }
        }}
      >
        {playing ? "Pause clip" : "Play clip"}
      </button>
    </div>
  );
}

type Props = {
  image: string;
  alt: string;
  video?: ProjectVideo;
};

export default function HoverVideoPreview({ image, alt, video }: Props) {
  const [playing, setPlaying] = useState(false);

  const startPreview = () => {
    if (!video || video.type !== "youtube") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPlaying(true);
  };

  const stopPreview = () => setPlaying(false);
  const embed =
    video?.type === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${video.src}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video.src}&playsinline=1&rel=0`
      : "";

  return (
    <div
      className="hover-video-preview"
      onPointerEnter={startPreview}
      onPointerLeave={stopPreview}
      onPointerCancel={stopPreview}
    >
      <Image
        unoptimized
        src={`${basePath}${image}`}
        alt={alt}
        fill
        sizes="(max-width: 760px) 100vw, 56vw"
      />
      {playing && (
        <iframe
          src={embed}
          title={`${video?.title} muted preview`}
          aria-hidden="true"
          tabIndex={-1}
          allow="autoplay; encrypted-media"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      )}
      {video?.type === "youtube" && (
        <span className="preview-hint" aria-hidden="true">
          Gameplay preview
        </span>
      )}
    </div>
  );
}
