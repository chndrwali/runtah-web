"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { updateUser } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { MapPin, Recycle, Gift, Bell } from "lucide-react";

import { cn } from "@/lib/utils";
import { appToast } from "@/components/custom/app-toast";
import { onboardingSchema, type OnboardingFormValues } from "@/lib/form-schema";
import {
  MultiStepFormProvider,
  StepConfig,
  StepContent,
  StepIndicator,
  StepNavigation,
  useMultiStepForm,
} from "@/modules/auth/ui/components/multi-step-form";

// UI Components
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const steps: StepConfig[] = [
  { id: "goal", title: "Tujuan" },
  { id: "location", title: "Lokasi" },
  { id: "notifications", title: "Notifikasi" },
];

export function OnboardingForm({ initialName }: { initialName?: string }) {
  const router = useRouter();
  const trpc = useTRPC();

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      name: initialName || "",
      appGoal: "",
      area: "",
      address: "",
      notificationsEnabled: false,
    },
  });

  const completeMutation = useMutation(
    trpc.auth.complete.mutationOptions({
      onSuccess: async (_, variables) => {
        // Force session cookie refresh by updating the user name via Better Auth
        await updateUser({
          name: variables.name,
        });
        appToast.success("Selamat datang di Runtah! 🎉");
        router.push("/onboarding/redirect");
      },
      onError: (error) => {
        appToast.error(error.message);
      },
    }),
  );

  const onSubmit = (values: OnboardingFormValues) => {
    completeMutation.mutate(values);
  };

  return (
    <div className="w-full max-w-3xl mx-auto py-8">
      <MultiStepFormProvider
        steps={steps}
        onComplete={form.handleSubmit(onSubmit)}
      >
        <div className="mb-10 w-full rounded-2xl bg-white p-6 md:p-10 shadow-xl border border-slate-100 dark:border-slate-800 dark:bg-slate-900">
          <StepIndicator steps={steps} className="mb-12 justify-center" />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* STEP 1: Tujuan */}
              <StepContent stepIndex={0}>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                    Selamat Datang di Runtah! 👋
                  </h1>
                  <p className="text-slate-500 dark:text-zinc-400">
                    Apa tujuan utamamu menggunakan aplikasi ini?
                  </p>
                </div>

                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 dark:text-slate-300 font-semibold">
                          Siapa nama kamu?
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Masukkan nama lengkap"
                            className="h-14 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="appGoal"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormControl>
                          <div className="grid grid-cols-1 gap-4">
                            {[
                              {
                                id: "Menyelamatkan Lingkungan",
                                icon: "🌍",
                                title: "Menyelamatkan Lingkungan",
                                desc: "Fokus pada gaya hidup zero waste",
                              },
                              {
                                id: "Kumpulkan Poin & Reward",
                                icon: "🎁",
                                title: "Kumpulkan Poin & Reward",
                                desc: "Tukar sampahmu dengan voucher menarik",
                              },
                              {
                                id: "Cari Bank Sampah Terdekat",
                                icon: "🚚",
                                title: "Cari Bank Sampah Terdekat",
                                desc: "Temukan lokasi penjemputan atau drop-off",
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
                                      "card-content flex items-center gap-4 p-5 rounded-xl border-2 transition-all hover:border-primary/50",
                                      isSelected
                                        ? "border-primary bg-primary/5 shadow-sm"
                                        : "border-slate-100 dark:border-zinc-800",
                                    )}
                                  >
                                    <div className="shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                                      {goal.icon}
                                    </div>
                                    <div className="grow">
                                      <h3 className="text-slate-900 dark:text-slate-100 font-bold">
                                        {goal.title}
                                      </h3>
                                      <p className="text-slate-500 dark:text-zinc-400 text-sm">
                                        {goal.desc}
                                      </p>
                                    </div>
                                    <div
                                      className={cn(
                                        "radio-dot w-5 h-5 rounded-full border-2 flex items-center justify-center",
                                        isSelected
                                          ? "border-primary bg-primary"
                                          : "border-slate-300 dark:border-zinc-700",
                                      )}
                                    >
                                      {isSelected && (
                                        <div className="w-2 h-2 rounded-full bg-white" />
                                      )}
                                    </div>
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
                </div>
              </StepContent>

              {/* STEP 2: Lokasi */}
              <StepContent stepIndex={1}>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                    Di mana lokasimu? 📍
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Bantu kami menemukan Bank Sampah dan kurir jemputan terdekat
                    di area Bandung.
                  </p>
                </div>

                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="area"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                          Kecamatan / Area
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full h-14 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 text-slate-900 dark:text-slate-100">
                              <SelectValue placeholder="Pilih area (misal: Coblong, Sukajadi...)" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="coblong">Coblong</SelectItem>
                            <SelectItem value="sukajadi">Sukajadi</SelectItem>
                            <SelectItem value="lengkong">Lengkong</SelectItem>
                            <SelectItem value="andir">Andir</SelectItem>
                            <SelectItem value="arcamanik">Arcamanik</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                          Detail Alamat Penjemputan
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Masukkan nama jalan, RT/RW, atau patokan rumah..."
                            className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-4 text-slate-900 dark:text-slate-100 min-h-[120px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Map Placeholder */}
                  <div className="w-full h-32 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600 overflow-hidden relative group">
                    <div className="absolute inset-0 opacity-10 bg-primary/20 bg-[radial-gradient(#10b981_1px,transparent_1px)] bg-size-[16px_16px]" />
                    <div className="z-10 flex items-center gap-2 text-slate-400 dark:text-slate-500">
                      <MapPin className="size-5" />
                      <span className="text-xs uppercase tracking-wider font-semibold">
                        Tampilan Peta Tersedia Setelah Alamat Lengkap
                      </span>
                    </div>
                  </div>
                </div>
              </StepContent>

              {/* STEP 3: Notifikasi */}
              <StepContent stepIndex={2}>
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                    Satu Langkah Lagi! 🎉
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Jangan lewatkan info jadwal penjemputan dan promo poin
                    spesial untuk kamu.
                  </p>
                </div>

                <div className="flex justify-center py-6">
                  <div className="relative w-48 h-48 flex items-center justify-center bg-primary/5 dark:bg-primary/10 rounded-full">
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <Recycle className="size-32 text-slate-900 dark:text-white" />
                    </div>
                    <div className="relative flex items-center justify-center bg-white dark:bg-slate-800 shadow-xl rounded-full p-6 border border-gray-50 dark:border-slate-700">
                      <Bell className="text-primary size-12" />
                    </div>
                    {/* Mini badges */}
                    <div className="absolute top-4 right-4 bg-primary text-white p-2 flex items-center justify-center rounded-full shadow-lg">
                      <Gift className="size-4" />
                    </div>
                  </div>
                </div>

                <div className="py-4">
                  <FormField
                    control={form.control}
                    name="notificationsEnabled"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-800/80 rounded-xl cursor-pointer group hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-primary/20">
                        <div className="flex items-center gap-4">
                          <div className="bg-primary/10 p-3 rounded-xl group-hover:bg-primary/20 transition-colors">
                            <Bell className="text-primary size-6" />
                          </div>
                          <FormLabel className="text-base font-semibold text-slate-700 dark:text-slate-200 cursor-pointer mb-0">
                            Aktifkan Notifikasi Jemputan & Poin
                          </FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </StepContent>

              {/* Form Actions / Navigation */}
              <FormNavigation />
            </form>
          </Form>
        </div>
      </MultiStepFormProvider>
    </div>
  );

  function FormNavigation() {
    const { currentStep } = useMultiStepForm();

    const validateStep = async () => {
      if (currentStep === 0) {
        return await form.trigger(["name", "appGoal"]);
      }
      if (currentStep === 1) {
        return await form.trigger(["area", "address"]);
      }
      return true;
    };

    return (
      <StepNavigation
        onValidate={validateStep}
        onSubmit={form.handleSubmit(onSubmit)}
        isSubmitting={completeMutation.isPending}
        submitLabel="Mulai Eksplorasi Runtah"
      />
    );
  }
}
