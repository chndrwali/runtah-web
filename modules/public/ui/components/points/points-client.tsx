"use client";

import { useState } from "react";
import Image from "next/image";
import { useTRPC } from "@/trpc/client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { appToast } from "@/components/custom/app-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Loader2 } from "lucide-react";

interface Reward {
  id: number;
  category: "MAKANAN" | "TRANSPORTASI" | "E-WALLET" | "HIBURAN";
  title: string;
  description: string;
  points: number;
  image: string;
  outOfStock: boolean;
}

const REWARDS_DUMMY: Reward[] = [
  {
    id: 1,
    category: "MAKANAN",
    title: "Diskon 20% Kopi Braga",
    description:
      "Nikmati kopi terbaik di pusat kota Bandung dengan harga spesial.",
    points: 500,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCZJ7Ui06_84l1s3o_G98mvuEjmgHEDgCLw7sw-N2hFJ9XRikY05xrpFxX_Auyg92OXZWnzFj1kbaMTvDW77PEHqFbS4ZRVSXtSLIiwwG-LCFmpFECR4rDaO4uJMKnufFrf1hsMenAz-Tr6DZNOuoSqZTPVQRDmimSUEVBT6Kq1Oe4IE4m048m8Xgr7Rd3l0_p4Wl3jBAgeIoU-WEOkbMcWUCmQM6ZpIrLkr6ocnitb_tW4KpMNCPJGRQ9lyaEiFfCVbdN53ufh1I5Q",
    outOfStock: false,
  },
  {
    id: 2,
    category: "TRANSPORTASI",
    title: "Tiket Trans Metro Pasundan",
    description:
      "Voucher satu kali perjalanan gratis rute manapun di Bandung Raya.",
    points: 750,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDI2nrDk1arFF2NAkdhFTVSq2K6sSPSMk2QPqFO2AKnCHOEBmKhVrfq_30-CjGApAffQOOMjSHesQilPtZHtY_SVjxkB1iUhrVxYy44Qo6b7-zl8vdvSBU1wJ55Gf1JljQVz1RKqTzgtsXuqZNWWBDmGC7gfv6EXCLl6_0CNbQtrwrsCUhsmGIwA9RCk7XMR1WXJ3diLXXbcbNFSgglVd-VITbHrtcVYSBtnGwaLqu53PzfkXN7WnqhBmR_q4oP9hRKdAL6lcI7asx0",
    outOfStock: false,
  },
  {
    id: 3,
    category: "E-WALLET",
    title: "OVO Top Up Rp10.000",
    description:
      "Saldo langsung masuk ke akun OVO terdaftar Anda dalam 24 jam.",
    points: 1000,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBghfiFV3Xwx2ViVwZfP9Bh096G4K5VwEMLK2OXE_uFVtyp0o4rlB-xq_UfWipBVnBwgw_NmgSJJOHxsY3_rkvAZTHHPgK5MAbQ7C9Bvg_4G5M4lFMcfgi4iPQfZIveZrPMnB5Dx0rUZkjIwOBkqJvzXMouvt_DQSA1dohngmaWoIhIT_wrjKW-m60ugfY6xlHoCF1VanqAuZZcBfAmF1RfJd1bT8mxfIFaIEVpG8MqHpyZZ3r28uxCH5pNzcYfTEEiNkuol7y244H6",
    outOfStock: false,
  },
  {
    id: 4,
    category: "HIBURAN",
    title: "Voucher Cinema XXI",
    description: "Potongan Rp25.000 untuk pembelian tiket film apa saja.",
    points: 1500,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAaQ3aibqRQgTeZq1OWyGRM8V1UiEjQOe3L7ya1pZsiKUY5dKKB2g17gMoUtz4jWq2EWw1lQYfGM8U2ND3AS-Vyev-P6fhF6z004alHnov2ZmBANPMeLUTmKlrW_ZHuJFgT-Ci6JRd-xTX-siYNuNdI7V8V9NsvmFuiAmRVEBY1jUHUD-Cj-WfWXWquUGUPNjlC35m2e-VX9p3TWxY9eWPa2VrXQHPN3HLyc6zpWxQ4JugQ5gp6hhq14uRX2xpiD1PLj8LT2jcQthkb",
    outOfStock: false,
  },
  {
    id: 5,
    category: "MAKANAN",
    title: "Paket Hemat McDonald's",
    description: "Voucher makan senilai Rp30.000 tanpa minimum pembelian.",
    points: 1200,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD0suaehnyvZxojLoba9IrbIagDmogTe7yoBKQjv3w_4Oh9w_d6DAg2DSGskGf1Rd3Cj1Yh49nmNOvYPPBYe9hrmWNDja9uZ4wAVigYXUjVWHkvsnr7uC_tBA7FekNqoxDK6QXju4cm2QsizlkPymNFOjxCr6WgWOBC4VFF7QHD-h8OdV0BhJcEa7jgq4hX-b907kefGdBHZafQRT0hKXAi-GMT47hb3lL1lFmNfBd2-J3lP5JlQf6_aq1oembQGZy8AME5kV2cAjjF",
    outOfStock: false,
  },
  {
    id: 6,
    category: "TRANSPORTASI",
    title: "Tiket Whoosh JKT-BDG",
    description:
      "Diskon 50% tiket Kereta Cepat Jakarta-Bandung kelas ekonomi premium.",
    points: 2500,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAPoe5GckNkyfBy_j83_7iooijZ8dljJ4UZ3VNZJRGbHit-hTWzErKoMexG78XoYBMGosr90rnohwnFv8fp3jP9gHiiInkzTownClKhJLjfBkiQ2XyMBJqss6zSC8Mx8hlyfkpnvmxTYLv8lzQ6a9WwF-GSPtanTSGezxpFIU3cJJZdIvOEfhs24tny-_mGC9U3secM5Asz917mE28Aw7X2ux9d4SnWI9_iHqBh3oXFySDBuLFUtgUbjwQhNwDZzknQhUqnEbEy0ObP",
    outOfStock: true,
  },
];

const CATEGORIES = [
  "Semua",
  "Voucher Makanan",
  "Transportasi Publik",
  "E-Wallet",
  "Hiburan",
];

export const PointsClient = () => {
  const trpc = useTRPC();
  const [activeCategory, setActiveCategory] = useState("Semua");

  // Real-time Dashboard Stats for Points Header
  const { data: statsData, refetch: refetchStats } = useQuery(
    trpc.auth.getDashboardStats.queryOptions(),
  );

  // Reward History Query
  const {
    data: historyData,
    isLoading: isLoadingHistory,
    refetch: refetchHistory,
  } = useQuery(trpc.reward.getHistory.queryOptions({ page: 1, limit: 100 }));

  const redeemMutation = useMutation(
    trpc.reward.redeem.mutationOptions({
      onSuccess: () => {
        appToast.success("Berhasil menukar Poin dengan Hadiah!");
        refetchStats(); // Refresh header points
        refetchHistory(); // Add to history list
      },
      onError: (error) => {
        appToast.error(error.message || "Gagal melakukan penukaran");
      },
    }),
  );

  const totalPoints = statsData?.totalPoints || 0;

  const filteredRewards = REWARDS_DUMMY.filter((reward) => {
    if (activeCategory === "Semua") return true;
    if (activeCategory === "Voucher Makanan" && reward.category === "MAKANAN")
      return true;
    if (
      activeCategory === "Transportasi Publik" &&
      reward.category === "TRANSPORTASI"
    )
      return true;
    if (activeCategory === "E-Wallet" && reward.category === "E-WALLET")
      return true;
    if (activeCategory === "Hiburan" && reward.category === "HIBURAN")
      return true;
    return false;
  });

  return (
    <div className="flex-1">
      {/* Header Banner */}
      <header className="mb-8">
        <div className="relative overflow-hidden bg-primary rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between shadow-lg shadow-primary/20">
          <div className="relative z-10 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Saldo Anda: {totalPoints.toLocaleString("id-ID")} Poin ⭐
            </h2>
            <p className="text-primary-foreground/80 opacity-90 text-lg">
              Terus kumpulkan poin dengan mendaur ulang sampahmu!
            </p>
          </div>
          <div className="relative z-10 mt-6 md:mt-0">
            <span className="material-symbols-outlined text-8xl opacity-40">
              celebration
            </span>
          </div>
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
        </div>
      </header>

      <Tabs defaultValue="redeem" className="space-y-6">
        <div className="flex justify-center md:justify-start">
          <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <TabsTrigger
              value="redeem"
              className="rounded-lg px-8 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-primary data-[state=active]:shadow-sm font-semibold transition-all"
            >
              Tukar Poin
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="rounded-lg px-8 py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900 data-[state=active]:text-primary data-[state=active]:shadow-sm font-semibold transition-all"
            >
              Riwayat Penukaran
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent
          value="redeem"
          className="space-y-8 focus-visible:outline-none"
        >
          {/* Filter Row */}
          <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Rewards Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRewards.map((reward) => (
              <div
                key={reward.id}
                className={`bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 dark:border-slate-800 flex flex-col group ${
                  reward.outOfStock ? "opacity-60" : ""
                }`}
              >
                <div className="aspect-4/3 w-full bg-slate-100 overflow-hidden relative">
                  <Image
                    src={reward.image}
                    alt={reward.title}
                    fill
                    className={`object-cover group-hover:scale-110 transition-transform duration-500 ${
                      reward.outOfStock ? "grayscale" : ""
                    }`}
                  />
                  {!reward.outOfStock && (
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur rounded-lg px-2 py-1 text-xs font-bold text-primary">
                      {reward.category}
                    </div>
                  )}
                  {reward.outOfStock && (
                    <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                      <span className="bg-white text-slate-900 px-4 py-2 rounded-full font-bold text-sm">
                        HABIS
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col grow">
                  <h3
                    className={`text-lg font-bold mb-1 ${
                      reward.outOfStock ? "text-slate-400" : ""
                    }`}
                  >
                    {reward.title}
                  </h3>
                  <p
                    className={`text-sm mb-4 ${
                      reward.outOfStock
                        ? "text-slate-400"
                        : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {reward.description}
                  </p>
                  <div className="mt-auto">
                    {reward.outOfStock ? (
                      <button
                        disabled
                        className="w-full py-3 bg-slate-200 dark:bg-slate-700 text-slate-400 rounded-xl font-bold text-sm cursor-not-allowed"
                      >
                        Stok Habis
                      </button>
                    ) : (
                      <button
                        disabled={
                          totalPoints < reward.points ||
                          redeemMutation.isPending
                        }
                        onClick={() =>
                          redeemMutation.mutate({
                            rewardId: reward.id,
                            rewardTitle: reward.title,
                            pointsCost: reward.points,
                          })
                        }
                        className="w-full py-3 bg-primary hover:bg-emerald-600 text-white rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 disabled:cursor-not-allowed"
                      >
                        {redeemMutation.isPending &&
                        redeemMutation.variables?.rewardId === reward.id ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <span>Tukar ({reward.points} Poin)</span>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </section>
        </TabsContent>

        <TabsContent value="history" className="focus-visible:outline-none">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Riwayat Penggunaan Poin
              </h3>
              <p className="text-sm text-slate-500">
                Daftar hadiah dan voucher yang telah Anda tukar.
              </p>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {isLoadingHistory ? (
                <div className="py-12 flex justify-center">
                  <Loader2 className="size-6 animate-spin text-primary" />
                </div>
              ) : historyData?.data.length === 0 ? (
                <div className="py-12 text-center text-slate-500">
                  Belum ada riwayat penukaran poin.
                </div>
              ) : (
                historyData?.data.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 sm:p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex gap-4 items-center">
                      <div className="size-12 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600 dark:text-rose-400 shrink-0">
                        <span className="material-symbols-outlined text-xl">
                          redeem
                        </span>
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white mb-0.5">
                          {item.rewardTitle}
                        </p>
                        <p className="text-xs text-slate-500">
                          {format(
                            new Date(item.createdAt),
                            "dd MMM yyyy • HH:mm",
                            { locale: id },
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-rose-600 dark:text-rose-400">
                        -{item.pointsCost} Poin
                      </p>
                      <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                        {item.status === "SUCCESS" ? "BERHASIL" : item.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
