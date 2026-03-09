"use client";

import { useState } from "react";
import Image from "next/image";
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

interface PointsRedeemTabProps {
  totalPoints: number;
  onRedeem: (rewardId: number, rewardTitle: string, pointsCost: number) => void;
  isRedeeming: boolean;
  redeemingId: number | null;
}

export function PointsRedeemTab({
  totalPoints,
  onRedeem,
  isRedeeming,
  redeemingId,
}: PointsRedeemTabProps) {
  const [activeCategory, setActiveCategory] = useState("Semua");

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
    <div className="space-y-8">
      {/* Filter Row */}
      <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : "bg-card text-muted-foreground border border-border hover:bg-muted"
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
            className={`bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-border flex flex-col group ${
              reward.outOfStock ? "opacity-60" : ""
            }`}
          >
            <div className="aspect-4/3 w-full bg-muted overflow-hidden relative">
              <Image
                src={reward.image}
                alt={reward.title}
                fill
                className={`object-cover group-hover:scale-110 transition-transform duration-500 ${
                  reward.outOfStock ? "grayscale" : ""
                }`}
              />
              {!reward.outOfStock && (
                <div className="absolute top-3 left-3 bg-background/90 backdrop-blur rounded-lg px-2 py-1 text-xs font-bold text-primary">
                  {reward.category}
                </div>
              )}
              {reward.outOfStock && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="bg-background text-foreground px-4 py-2 rounded-full font-bold text-sm">
                    HABIS
                  </span>
                </div>
              )}
            </div>
            <div className="p-5 flex flex-col grow">
              <h3
                className={`text-lg font-bold mb-1 ${
                  reward.outOfStock
                    ? "text-muted-foreground"
                    : "text-foreground"
                }`}
              >
                {reward.title}
              </h3>
              <p
                className={`text-sm mb-4 ${
                  reward.outOfStock
                    ? "text-muted-foreground/60"
                    : "text-muted-foreground"
                }`}
              >
                {reward.description}
              </p>
              <div className="mt-auto">
                {reward.outOfStock ? (
                  <button
                    disabled
                    className="w-full py-3 bg-muted text-muted-foreground rounded-xl font-bold text-sm cursor-not-allowed border border-border"
                  >
                    Stok Habis
                  </button>
                ) : (
                  <button
                    disabled={totalPoints < reward.points || isRedeeming}
                    onClick={() =>
                      onRedeem(reward.id, reward.title, reward.points)
                    }
                    className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed disabled:border disabled:border-border"
                  >
                    {isRedeeming && redeemingId === reward.id ? (
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
    </div>
  );
}
