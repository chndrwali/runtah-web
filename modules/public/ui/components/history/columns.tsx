"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Image from "next/image";
import { TrashTransaction } from "@prisma/client";

export const columns: ColumnDef<TrashTransaction>[] = [
  {
    accessorKey: "imageUrl",
    header: "Foto",
    cell: ({ row }) => {
      const imageUrl = row.getValue("imageUrl") as string | null;
      return (
        <div className="size-12 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700 relative">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={row.getValue("aiCategory")}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400">
              No Image
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "aiCategory",
    header: "Kategori",
    cell: ({ row }) => {
      // Basic grouping based on Runtah categories
      const category = row.getValue("aiCategory") as string;
      const typeMap: Record<string, string> = {
        "Botol Plastik PET": "Anorganik",
        "Kardus Bekas": "Anorganik",
        "Kaleng Aluminium": "Logam",
      };
      const subType = typeMap[category] || "Lainnya";

      return (
        <div>
          <div className="text-sm font-semibold text-slate-900 dark:text-white">
            {category}
          </div>
          <div className="text-xs text-slate-500">{subType}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "aiAccuracy",
    header: "Akurasi AI",
    cell: ({ row }) => {
      const val = row.getValue("aiAccuracy") as number;
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-primary/10 text-primary border border-primary/20">
          {val.toFixed(0)}%
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Tanggal",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      return (
        <span className="text-sm text-slate-600 dark:text-slate-400">
          {format(new Date(date), "dd MMM yyyy", { locale: id })}
        </span>
      );
    },
  },
  {
    accessorKey: "pointsEarned",
    header: "Poin",
    cell: ({ row }) => {
      const pts = row.getValue("pointsEarned") as number;
      return (
        <span className="text-sm font-bold text-primary">+{pts} Poin</span>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      if (status === "COMPLETED") {
        return (
          <div className="text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400">
              Selesai
            </span>
          </div>
        );
      }
      if (status === "PENDING") {
        return (
          <div className="text-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
              Menunggu
            </span>
          </div>
        );
      }
      return (
        <div className="text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
            {status}
          </span>
        </div>
      );
    },
  },
];
