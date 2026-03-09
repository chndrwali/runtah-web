"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TrashTransaction } from "@/app/generated/prisma/client";
import {
  Droplet,
  FileText,
  Package,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Battery,
  Leaf,
  GlassWater,
  Shirt,
  Wrench,
  HelpCircle,
} from "lucide-react";
import { format, isToday, isYesterday } from "date-fns";
import { id } from "date-fns/locale";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export const dashboardColumns: ColumnDef<TrashTransaction>[] = [
  {
    accessorKey: "aiCategory",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          Jenis Sampah
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const category = row.getValue("aiCategory") as string;

      let Icon = Package;
      let iconBgClass = "bg-slate-100 dark:bg-slate-800";
      let iconTextClass = "text-slate-600 dark:text-slate-400";

      switch (category) {
        case "Baterai":
          Icon = Battery;
          iconBgClass = "bg-red-100 dark:bg-red-900/30";
          iconTextClass = "text-red-600 dark:text-red-400";
          break;
        case "Biologis":
          Icon = Leaf;
          iconBgClass = "bg-emerald-100 dark:bg-emerald-900/30";
          iconTextClass = "text-emerald-600 dark:text-emerald-400";
          break;
        case "Plastik":
          Icon = Droplet;
          iconBgClass = "bg-blue-100 dark:bg-blue-900/30";
          iconTextClass = "text-blue-600 dark:text-blue-400";
          break;
        case "Kardus":
        case "Kertas":
          Icon = FileText;
          iconBgClass = "bg-amber-100 dark:bg-amber-900/30";
          iconTextClass = "text-amber-600 dark:text-amber-400";
          break;
        case "Kaca Coklat":
        case "Kaca Hijau":
        case "Kaca Putih":
          Icon = GlassWater;
          iconBgClass = "bg-cyan-100 dark:bg-cyan-900/30";
          iconTextClass = "text-cyan-600 dark:text-cyan-400";
          break;
        case "Pakaian":
        case "Sepatu":
          Icon = Shirt;
          iconBgClass = "bg-indigo-100 dark:bg-indigo-900/30";
          iconTextClass = "text-indigo-600 dark:text-indigo-400";
          break;
        case "Logam":
          Icon = Wrench;
          iconBgClass = "bg-slate-200 dark:bg-slate-700";
          iconTextClass = "text-slate-700 dark:text-slate-300";
          break;
        case "Residu":
          Icon = HelpCircle;
          iconBgClass = "bg-neutral-100 dark:bg-neutral-800";
          iconTextClass = "text-neutral-600 dark:text-neutral-400";
          break;
        default:
          Icon = Package;
          break;
      }

      return (
        <div className="flex items-center gap-3 py-2 text-left">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBgClass} ${iconTextClass}`}
          >
            <Icon className="size-5" />
          </div>
          <span className="font-medium text-slate-900 dark:text-white">
            {category}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          Tanggal
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dateString = row.getValue("createdAt") as string | Date;
      const date = new Date(dateString);

      let dateLabel = "";
      if (isToday(date)) {
        dateLabel = `Hari ini, ${format(date, "HH:mm")}`;
      } else if (isYesterday(date)) {
        dateLabel = `Kemarin, ${format(date, "HH:mm")}`;
      } else {
        dateLabel = format(date, "dd MMM, HH:mm", { locale: id });
      }

      return (
        <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          {dateLabel}
        </span>
      );
    },
  },
  {
    accessorKey: "pointsEarned",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-4 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          Poin Diperoleh
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const pts = row.getValue("pointsEarned") as number;
      return (
        <div className="font-bold text-emerald-600 dark:text-emerald-500 text-left pl-4">
          +{pts} Poin
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div className="flex justify-start">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-ml-4 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      let StatusIcon = Clock;
      let label = "Menunggu";
      let containerClass =
        "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";

      if (status === "COMPLETED") {
        StatusIcon = CheckCircle2;
        label = "Selesai";
        containerClass =
          "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400";
      } else if (status === "CANCELLED" || status === "FAILED") {
        StatusIcon = XCircle;
        label = "Dibatalkan";
        containerClass =
          "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400";
      } else if (status === "IN_PROGRESS") {
        StatusIcon = AlertCircle;
        label = "Diproses";
        containerClass =
          "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400";
      }

      return (
        <div className="flex justify-start pl-4">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${containerClass}`}
          >
            <StatusIcon className="size-3.5" />
            {label}
          </span>
        </div>
      );
    },
  },
];
