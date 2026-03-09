import { Camera, ImagePlus } from "lucide-react";

interface ScanControlsProps {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onGallerySelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCapture: () => void;
  isModelLoading: boolean;
  isScanning: boolean;
}

export function ScanControls({
  fileInputRef,
  onGallerySelect,
  onCapture,
  isModelLoading,
  isScanning,
}: ScanControlsProps) {
  return (
    <div className="flex justify-center items-center gap-6">
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={onGallerySelect}
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isModelLoading || isScanning}
        className="group flex flex-col items-center gap-2 disabled:opacity-50"
      >
        <div className="size-14 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full flex items-center justify-center shadow-md transition-all active:scale-95">
          <ImagePlus className="size-6" />
        </div>
        <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
          Galeri
        </span>
      </button>

      <button
        onClick={onCapture}
        disabled={isModelLoading || isScanning}
        className="group flex flex-col items-center gap-3 disabled:opacity-50"
      >
        <div className="size-20 bg-primary hover:bg-primary/90 rounded-full flex items-center justify-center shadow-lg shadow-primary/40 ring-4 ring-primary/20 transition-all active:scale-95 relative">
          {isScanning ? (
            <div className="size-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Camera className="text-white size-8" />
          )}
        </div>
        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
          Capture
        </span>
      </button>

      {/* Invisible placeholder for visual balance */}
      <div className="w-14 items-center flex-col gap-2 flex opacity-0 pointer-events-none">
        <div className="size-14 rounded-full"></div>
      </div>
    </div>
  );
}
