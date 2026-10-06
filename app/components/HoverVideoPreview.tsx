"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProjectVideo } from "@/lib/projects";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

type Props = {
  image: string;
  alt: string;
  video?: ProjectVideo;
};

export default function HoverVideoPreview({ image, alt, video }: Props) {
  const [playing, setPlaying] = useState(false);

  const startPreview = () => {
    if (!video || video.type !== "youtube") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPlaying(true);
  };

  const stopPreview = () => setPlaying(false);
  const embed = video?.type === "youtube"
    ? `https://www.youtube-nocookie.com/embed/${video.src}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video.src}&playsinline=1&rel=0`
    : "";

  return <div className="hover-video-preview" onPointerEnter={startPreview} onPointerLeave={stopPreview} onPointerCancel={stopPreview}>
    <Image unoptimized src={`${basePath}${image}`} alt={alt} fill sizes="(max-width: 760px) 100vw, 56vw" />
    {playing && <iframe
      src={embed}
      title={`${video?.title} muted preview`}
      aria-hidden="true"
      tabIndex={-1}
      allow="autoplay; encrypted-media"
      referrerPolicy="strict-origin-when-cross-origin"
    />}
    {video?.type === "youtube" && <span className="preview-hint" aria-hidden="true">Gameplay preview</span>}
  </div>;
}
