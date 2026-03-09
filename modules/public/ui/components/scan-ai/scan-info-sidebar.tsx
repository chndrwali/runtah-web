import {
  Battery,
  Droplet,
  FileText,
  GlassWater,
  HelpCircle,
  Leaf,
  Lightbulb,
  Package,
  Settings,
  Shirt,
  Wrench,
  LucideIcon,
} from "lucide-react";

export function ScanInfoSidebar() {
  return (
    <div className="bg-card text-card-foreground rounded-3xl p-6 shadow-sm border border-border h-fit">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg text-primary">
          <HelpCircle className="size-5" />
        </div>
        <h3 className="text-xl font-bold text-foreground">Cara Scan</h3>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Arahkan kamera ke sampah Anda. AI kami akan mendeteksi salah satu
        kategori di bawah ini:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 mb-8 h-64 overflow-y-auto pr-2">
        <CategoryItem icon={Battery} label="Baterai" />
        <CategoryItem icon={Leaf} label="Biologis" />
        <CategoryItem icon={GlassWater} label="Kaca Coklat" />
        <CategoryItem icon={Package} label="Kardus" />
        <CategoryItem icon={Shirt} label="Pakaian" />
        <CategoryItem icon={GlassWater} label="Kaca Hijau" />
        <CategoryItem icon={Wrench} label="Logam" />
        <CategoryItem icon={FileText} label="Kertas" />
        <CategoryItem icon={Droplet} label="Plastik" />
        <CategoryItem icon={Settings} label="Sepatu" />
        <CategoryItem icon={HelpCircle} label="Residu" />
        <CategoryItem icon={GlassWater} label="Kaca Putih" />
      </div>

      <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl flex gap-3">
        <Lightbulb className="text-primary shrink-0 size-5" />
        <p className="text-xs leading-relaxed text-muted-foreground">
          <strong>Tips:</strong> Pastikan pencahayaan terang untuk akurasi
          maksimal.
        </p>
      </div>
    </div>
  );
}

function CategoryItem({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 p-2.5 rounded-xl border border-border bg-muted">
      <Icon className="text-primary size-4" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
