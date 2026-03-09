import Image from "next/image";
import { Info } from "lucide-react";

interface ScanImagePreviewProps {
  imageUrl: string | null;
  aiCategory: string;
  createdAt: Date;
}

export function ScanImagePreview({
  imageUrl,
  aiCategory,
  createdAt,
}: ScanImagePreviewProps) {
  return (
    <div className="lg:w-[40%] flex flex-col gap-4">
      <div className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-xl ring-1 ring-border bg-muted">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={aiCategory}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <p>Tidak ada gambar</p>
          </div>
        )}

        {/* AI Overlay indicators */}
        <div className="absolute inset-0 border-[3px] border-primary/50 m-12 rounded-2xl pointer-events-none">
          <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-primary"></div>
          <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-primary"></div>
          <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-primary"></div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-primary"></div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
        <Info className="size-4" />
        <span>
          Foto diambil pada{" "}
          {new Intl.DateTimeFormat("id-ID", {
            dateStyle: "medium",
            timeStyle: "short",
          }).format(new Date(createdAt))}
        </span>
      </div>
    </div>
  );
}
