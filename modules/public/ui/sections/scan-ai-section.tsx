"use client";

import PageContainer from "@/components/custom/page-container";
import { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/navigation";
import {
  Camera,
  Package,
  Droplet,
  GlassWater,
  Battery,
  Wrench,
  MonitorSmartphone,
  FileText,
  Shirt,
  Leaf,
  Utensils,
  Settings,
  HelpCircle,
  Lightbulb,
  Video,
} from "lucide-react";
import { toast } from "sonner";
import { useUploadThing } from "@/components/uploadthing";
import { useMutation } from "@tanstack/react-query";

const CLASS_NAMES = [
  "Baterai",
  "Elektronik",
  "Kaca",
  "Kardus",
  "Karet",
  "Kertas",
  "Logam",
  "Minyak Jelantah",
  "Organik",
  "Plastik",
  "Sisa Makanan",
  "Tekstil",
];

export const ScanAISection = () => {
  const trpc = useTRPC();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [model, setModel] = useState<tf.GraphModel | null>(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [isScanning, setIsScanning] = useState(false);
  const router = useRouter();

  const { mutateAsync: saveScan } = useMutation(
    trpc.trash.saveScan.mutationOptions(),
  );
  const { startUpload } = useUploadThing("productImage");

  useEffect(() => {
    // Load Model
    const loadModel = async () => {
      try {
        await tf.setBackend("webgl");
        await tf.ready();
        const loadedModel = await tf.loadGraphModel("/model/json/model.json");
        setModel(loadedModel);
        setIsModelLoading(false);
      } catch (error) {
        console.error("Error loading model:", error);
        toast.error("Gagal memuat model AI");
        setIsModelLoading(false);
      }
    };
    loadModel();

    // Start Webcam
    const setupCamera = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" },
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error("Error accessing camera:", error);
          toast.error("Gagal mengakses kamera");
        }
      }
    };
    setupCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const captureAndPredict = async () => {
    if (!model || !videoRef.current || isScanning) return;
    setIsScanning(true);

    try {
      // Create a canvas to capture the image
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");

      if (!ctx) throw new Error("Could not get canvas context");

      // Draw video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Crop to square for prediction (assuming model expects 150x150 or similar)
      // Standard image classification models usually take square inputs.
      const tensor = tf.browser
        .fromPixels(canvas)
        .resizeNearestNeighbor([224, 224]) // typical size, check model specifics if needed
        .toFloat()
        .expandDims(0); // [1, 150, 150, 3]

      // Predict
      const prediction = (await model.predict(tensor)) as tf.Tensor;
      const scores = await prediction.data();

      const maxScore = Math.max(...Array.from(scores));
      const maxIndex = Array.from(scores).indexOf(maxScore);

      const category = CLASS_NAMES[maxIndex];
      const accuracy = maxScore * 100;

      // Prepare image for upload
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/jpeg"),
      );
      if (!blob) throw new Error("Could not create image blob");

      const file = new File([blob], "scan.jpg", { type: "image/jpeg" });

      toast.loading("Menyimpan hasil scan...", { id: "saving" });

      // Upload image
      const uploadRes = await startUpload([file]);
      const imageUrl = uploadRes?.[0]?.url;

      // Save to TRPC
      const result = await saveScan({
        imageUrl,
        aiCategory: category,
        aiAccuracy: accuracy,
      });

      toast.success("Berhasil di-scan!", { id: "saving" });
      router.push(`/user/ai/${result.id}`);
    } catch (error) {
      console.error("Prediction error:", error);
      toast.error("Gagal melakukan klasifikasi", { id: "saving" });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <PageContainer
      pageTitle="AI Trash Scanner"
      pageDescription="Identifikasi sampah Anda dengan teknologi kecerdasan buatan"
      scrollable={false}
    >
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        {/* Camera Feed Column */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="relative w-full aspect-4/3 sm:aspect-video bg-slate-900 dark:bg-black rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center border-4 border-white dark:border-slate-800">
            {/* The actual video feed */}
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Scanning Reticle Overlay */}
            <div className="relative z-10 w-48 h-48 sm:w-64 sm:h-64 border-2 border-primary/50">
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
              <div className="px-4 py-2 bg-primary/90 text-white rounded-xl text-sm font-bold shadow-lg backdrop-blur-sm">
                {isModelLoading ? "Memuat AI..." : "Ready to Scan"}
              </div>
            </div>
          </div>

          {/* Capture Control */}
          <div className="flex justify-center">
            <button
              onClick={captureAndPredict}
              disabled={isModelLoading || isScanning}
              className="group flex flex-col items-center gap-3 disabled:opacity-50"
            >
              <div className="size-20 bg-primary hover:bg-primary/90 rounded-full flex items-center justify-center shadow-lg shadow-primary/40 ring-4 ring-primary/20 transition-all active:scale-95">
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
          </div>
        </div>

        {/* Info Column */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 h-fit">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <HelpCircle className="size-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Cara Scan
              </h3>
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Arahkan kamera ke sampah Anda. AI kami akan mendeteksi salah satu
              kategori di bawah ini:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 mb-8 h-64 overflow-y-auto pr-2">
              <CategoryItem icon={Package} label="Kardus" />
              <CategoryItem icon={Droplet} label="Plastik" />
              <CategoryItem icon={GlassWater} label="Kaca" />
              <CategoryItem icon={Battery} label="Baterai" />
              <CategoryItem icon={Wrench} label="Logam" />
              <CategoryItem icon={MonitorSmartphone} label="Elektronik" />
              <CategoryItem icon={FileText} label="Kertas" />
              <CategoryItem icon={Shirt} label="Tekstil" />
              <CategoryItem icon={Leaf} label="Organik" />
              <CategoryItem icon={Utensils} label="Sisa Makanan" />
              <CategoryItem icon={Droplet} label="Minyak Jelantah" />
              <CategoryItem icon={Settings} label="Karet" />
            </div>

            <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl flex gap-3">
              <Lightbulb className="text-primary shrink-0 size-5" />
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                <strong>Tips:</strong> Pastikan pencahayaan terang untuk akurasi
                maksimal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CategoryItem({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex items-center gap-3 p-2.5 rounded-xl border border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
      <Icon className="text-primary size-4" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
