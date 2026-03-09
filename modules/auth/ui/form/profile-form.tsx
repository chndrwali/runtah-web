"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect, useTransition } from "react";
import { DeleteConfirmationDialog } from "@/components/custom/alert-dialog-custom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { appToast } from "@/components/custom/app-toast";
import { updateUserSchema, UpdateUserFormValues } from "@/lib/form-schema";
import { SingleImageUpload } from "@/components/custom/image-upload";
import dynamic from "next/dynamic";
import { BANDUNG_DISTRICTS, cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LocationPicker = dynamic(
  () => import("@/components/custom/location-picker"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-48 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center border-2 border-slate-300 dark:border-slate-600 animate-pulse">
        <span className="text-sm font-medium text-slate-400">
          Memuat Peta...
        </span>
      </div>
    ),
  },
);
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Loader2,
  Camera,
  MapPin,
  BellRing,
  Tag,
  KeyRound,
  LogOut,
  Save,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signOut } from "@/lib/auth-client";
import { Switch } from "@/components/ui/switch";

export function ProfileForm() {
  const trpc = useTRPC();
  const router = useRouter();
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Fetch initial profile data
  const { data: userProfile, isLoading: isLoadingProfile } = useQuery(
    trpc.auth.getProfile.queryOptions(),
  );

  // Fetch Stats Data for the "Aksi" Total since user schema does not have it, only totalPoints/totalWeightSaved
  const { data: statsData } = useQuery(trpc.history.getStats.queryOptions());

  // Mutation to update profile
  const updateProfileMutation = useMutation(
    trpc.auth.updateProfile.mutationOptions({
      onSuccess: () => {
        appToast.success("Profil berhasil diperbarui!");
        router.refresh();
      },
      onError: (error) => {
        appToast.error(error.message || "Gagal memperbarui profil");
      },
    }),
  );

  const form = useForm<UpdateUserFormValues>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: "",
      phone: "",
      area: "",
      address: "",
      image: "",
      appGoal: "",
      lat: undefined,
      lng: undefined,
      notificationsEnabled: false,
    },
  });

  const imageValue = useWatch({
    control: form.control,
    name: "image",
  });

  // Hydrate form when profile data is loaded
  useEffect(() => {
    if (userProfile) {
      form.reset({
        name: userProfile.name || "",
        phone: userProfile.phone || "",
        area: userProfile.area || "",
        address: userProfile.address || "",
        image: userProfile.image || "",
        appGoal: userProfile.appGoal || "",
        lat: userProfile.lat || undefined,
        lng: userProfile.lng || undefined,
        notificationsEnabled: userProfile.notificationsEnabled || false,
      });
    }
  }, [userProfile, form]);

  const onSubmit = (values: UpdateUserFormValues) => {
    updateProfileMutation.mutate(values);
  };

  const handleLogoutClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowLogoutAlert(true);
  };

  const handleLogoutConfirm = () => {
    startTransition(async () => {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            appToast.success("Berhasil Keluar");
            router.push("/login");
          },
          onError: (ctx) => {
            appToast.error(ctx.error.message);
          },
        },
      });
      setShowLogoutAlert(false);
    });
  };

  if (isLoadingProfile) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  const joinYear = userProfile?.createdAt
    ? new Date(userProfile.createdAt).getFullYear()
    : new Date().getFullYear();

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Top Identity Card */}
          <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative group">
                <div className="size-32 rounded-full overflow-hidden border-4 border-slate-50 dark:border-slate-800 shadow-lg bg-slate-100 relative">
                  {imageValue || userProfile?.image ? (
                    <Image
                      src={imageValue || userProfile?.image || ""}
                      alt={userProfile?.name || "Avatar"}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-slate-400 bg-slate-200 dark:bg-slate-800">
                      {(userProfile?.name?.[0] || "U").toUpperCase()}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setIsAvatarOpen(true)}
                  className="absolute bottom-1 right-1 size-8 bg-primary text-white rounded-full flex items-center justify-center shadow-md border-2 border-white dark:border-slate-900 transition-transform hover:scale-105"
                >
                  <Camera className="size-4" />
                </button>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {userProfile?.name || "Pengguna"}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mt-1 flex items-center justify-center md:justify-start gap-1">
                  <MapPin className="size-4" />
                  {userProfile?.area ? `Warga ${userProfile.area} • ` : ""}
                  Bergabung sejak {joinYear}
                </p>
                <div className="mt-4 flex gap-2 justify-center md:justify-start">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full uppercase tracking-wider">
                    Verified Account
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 w-full md:w-auto">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-center min-w-[120px]">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Total Poin
                </p>
                <p className="text-xl font-bold text-primary mt-1">
                  {userProfile?.totalPoints || 0}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-center min-w-[120px]">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Sampah Disetor
                </p>
                <p className="text-xl font-bold text-primary mt-1">
                  {(userProfile?.totalWeightSaved || 0).toFixed(1)} Kg
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-center min-w-[120px]">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Aksi
                </p>
                <p className="text-xl font-bold text-primary mt-1">
                  {statsData?.totalScansCompleted || 0} Kali
                </p>
              </div>
            </div>
          </section>

          {/* Middle Form Card */}
          <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Informasi Pribadi
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Kelola detail informasi dasar akun Anda.
              </p>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Nama Lengkap
                      </FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Alamat Email
                  </FormLabel>
                  <FormControl>
                    <input
                      disabled
                      value={userProfile?.email || ""}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 opacity-70 cursor-not-allowed outline-none text-slate-500"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="space-y-2 md:col-span-2">
                      <FormLabel className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Nomor WhatsApp
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-medium">
                            +62
                          </span>
                          <input
                            {...field}
                            className="w-full pl-12 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                            type="tel"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="area"
                  render={({ field }) => (
                    <FormItem className="space-y-2 md:col-span-2">
                      <FormLabel className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Kecamatan / Area
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value || undefined}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full h-11 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 text-slate-900 dark:text-slate-100">
                            <SelectValue placeholder="Pilih area (misal: Coblong, Sukajadi...)" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {BANDUNG_DISTRICTS.map((district) => (
                            <SelectItem
                              key={district}
                              value={district.toLowerCase()}
                            >
                              {district}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="appGoal"
                  render={({ field }) => (
                    <FormItem className="space-y-4 md:col-span-2">
                      <FormLabel className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Tujuan Utama Penggunaan
                      </FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {[
                            {
                              id: "Menyelamatkan Lingkungan",
                              icon: "🌍",
                              title: "Menyelamatkan Lingkungan",
                            },
                            {
                              id: "Kumpulkan Poin & Reward",
                              icon: "🎁",
                              title: "Kumpulkan Poin & Reward",
                            },
                            {
                              id: "Cari Bank Sampah Terdekat",
                              icon: "🚚",
                              title: "Cari Bank Sampah Terdekat",
                            },
                          ].map((goal) => {
                            const isSelected = field.value === goal.id;
                            return (
                              <label
                                key={goal.id}
                                className="radio-card relative block cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  className="sr-only"
                                  checked={isSelected}
                                  onChange={() => field.onChange(goal.id)}
                                />
                                <div
                                  className={cn(
                                    "flex flex-col items-center text-center gap-3 p-4 rounded-xl border-2 transition-all hover:border-primary/50",
                                    isSelected
                                      ? "border-primary bg-primary/5 shadow-sm"
                                      : "border-slate-100 dark:border-zinc-800",
                                  )}
                                >
                                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl">
                                    {goal.icon}
                                  </div>
                                  <h3 className="text-slate-900 dark:text-slate-100 font-bold text-xs">
                                    {goal.title}
                                  </h3>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="space-y-2 md:col-span-2">
                      <FormLabel className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Alamat Lengkap
                      </FormLabel>
                      <FormControl>
                        <textarea
                          {...field}
                          className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none"
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2 md:col-span-2 mt-2 border-t border-slate-100 dark:border-slate-800 pt-4">
                  <FormLabel className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Tandai Titik Lokasi
                  </FormLabel>
                  <LocationPicker
                    defaultPosition={
                      userProfile?.lat && userProfile?.lng
                        ? [userProfile.lat, userProfile.lng]
                        : [-6.914744, 107.60981]
                    }
                    onLocationSelect={(lat, lng) => {
                      form.setValue("lat", lat, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                      form.setValue("lng", lng, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Geser map dan klik untuk mengupdate titik penjemputanmu.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom Preferences Card */}
          <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Pengaturan Akun
              </h3>
            </div>
            <div className="p-8">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="notificationsEnabled"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
                          <BellRing className="size-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">
                            Notifikasi Penjemputan
                          </p>
                          <p className="text-xs text-slate-500">
                            Dapatkan update saat kurir menuju lokasi Anda.
                          </p>
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-primary"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
                      <Tag className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        Promo & Info Poin
                      </p>
                      <p className="text-xs text-slate-500">
                        Info penukaran poin terbaru dan diskon merchant.
                      </p>
                    </div>
                  </div>
                  <Switch
                    defaultChecked
                    className="data-[state=checked]:bg-primary"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
                      <KeyRound className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        Keamanan Akun
                      </p>
                      <p className="text-xs text-slate-500">
                        Ganti kata sandi secara berkala untuk keamanan.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Ubah Password
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Footer Action Area */}
          <footer className="flex items-center justify-between py-6">
            <button
              type="button"
              onClick={handleLogoutClick}
              className="flex items-center gap-2 text-rose-600 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
            >
              <LogOut className="size-5" />
              Keluar Akun
            </button>
            <button
              type="submit"
              disabled={updateProfileMutation.isPending}
              className="bg-primary text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2 disabled:opacity-70"
            >
              {updateProfileMutation.isPending ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <Save className="size-5" />
              )}
              Simpan Perubahan
            </button>
          </footer>
        </form>
      </Form>

      <Dialog open={isAvatarOpen} onOpenChange={setIsAvatarOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ubah Foto Profil</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <SingleImageUpload
              value={imageValue}
              onChange={(url) => {
                form.setValue("image", url, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
                setIsAvatarOpen(false);
              }}
              onRemove={() =>
                form.setValue("image", "", {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
            />
          </div>
        </DialogContent>
      </Dialog>

      <DeleteConfirmationDialog
        open={showLogoutAlert}
        onOpenChange={setShowLogoutAlert}
        title="Keluar dari akun Anda?"
        description="Anda harus masuk kembali untuk mengakses dashboard."
        onConfirm={handleLogoutConfirm}
        isDeleting={isPending}
        confirmationKeyword="KELUAR"
        confirmationText="Keluar"
      />
    </div>
  );
}
