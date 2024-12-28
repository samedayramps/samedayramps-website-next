"use client"

interface VideoPlayerProps {
  src: string;
  title: string;
}

export function VideoPlayer({ src, title }: VideoPlayerProps) {
  return (
    <div className="relative w-full aspect-square rounded-lg overflow-hidden">
      <iframe
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={false}
        className="absolute inset-0 w-full h-full bg-background/50"
      />
    </div>
  )
} 