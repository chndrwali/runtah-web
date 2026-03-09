import { Video } from "lucide-react";

interface ScanCameraFeedProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isModelLoading: boolean;
}

export function ScanCameraFeed({
  videoRef,
  isModelLoading,
}: ScanCameraFeedProps) {
  return (
    <div className="relative w-full aspect-4/3 sm:aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center border-4 border-border">
      {/* The actual video feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Scanning Reticle Overlay */}
      <div className="relative z-10 w-48 h-48 sm:w-64 sm:h-64 border-2 border-primary/50 pointer-events-none">
        <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-primary" />
        <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-primary" />
        <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-primary" />
        <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-primary" />
      </div>

      {/* Scan UI Elements */}
      <div className="absolute top-6 left-6 z-20 flex gap-2">
        <div className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-white text-xs flex items-center gap-2">
          <span className="size-2 rounded-full bg-red-500 animate-pulse"></span>
          LIVE
        </div>
        <div className="px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-white text-xs flex items-center gap-2">
          <Video className="size-3" />
          Auto
        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-20">
        <div className="px-4 py-2 bg-primary/90 text-primary-foreground rounded-xl text-sm font-bold shadow-lg backdrop-blur-sm">
          {isModelLoading ? "Memuat AI..." : "Ready to Scan"}
        </div>
      </div>
    </div>
  );
}
