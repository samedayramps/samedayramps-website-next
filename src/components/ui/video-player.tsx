"use client"

interface VideoPlayerProps {
  src: string;
  title: string;
}

export function VideoPlayer({ src, title }: VideoPlayerProps) {
  return (
    <div className="w-full max-w-[500px] mx-auto rounded-lg overflow-hidden shadow-lg aspect-square">
      <iframe
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={false}
        className="w-full h-full"
      />
    </div>
  )
} 