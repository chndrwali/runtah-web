"use client";

import PageContainer from "@/components/custom/page-container";
import { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUploadThing } from "@/components/uploadthing";
import { useMutation } from "@tanstack/react-query";
import { appToast } from "@/components/custom/app-toast";
import { CLASS_NAMES } from "@/lib/utils";
import {
  ScanCameraFeed,
  ScanControls,
  ScanInfoSidebar,
} from "@/modules/public/ui/components/scan-ai";

export const ScanAISection = () => {
  const trpc = useTRPC();
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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
        appToast.error("Gagal memuat model AI");
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
          appToast.error("Gagal mengakses kamera");
        }
      }
    };
    setupCamera();

    const videoElement = videoRef.current;

    return () => {
      if (videoElement && videoElement.srcObject) {
        const stream = videoElement.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const processAndPredict = async (
    imageSource: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement,
    fileToUpload: File,
  ) => {
    if (!model || isScanning) return;
    setIsScanning(true);

    try {
      const tensor = tf.browser
        .fromPixels(imageSource)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .expandDims();

      const prediction = (await model.predict(tensor)) as tf.Tensor;
      const scores = await prediction.data();

      const maxScore = Math.max(...Array.from(scores));
      const maxIndex = Array.from(scores).indexOf(maxScore);

      const category = CLASS_NAMES[maxIndex];
      const accuracy = maxScore * 100;

      toast.loading("Menyimpan hasil scan...", {
        id: "saving",
        position: "top-center",
      });

      const uploadRes = await startUpload([fileToUpload]);
      const imageUrl = uploadRes?.[0]?.url;

      const result = await saveScan({
        imageUrl,
        aiCategory: category,
        aiAccuracy: accuracy,
      });

      toast.success("Berhasil di-scan!", {
        id: "saving",
        position: "top-center",
      });
      router.push(`/user/ai/${result.id}`);
    } catch (error) {
      console.error("Prediction error:", error);
      toast.error("Gagal melakukan klasifikasi", {
        id: "saving",
        position: "top-center",
      });
    } finally {
      setIsScanning(false);
    }
  };

  const captureAndPredict = async () => {
    if (!videoRef.current) return;

    try {
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");

      if (!ctx) throw new Error("Could not get canvas context");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/jpeg"),
      );
      if (!blob) throw new Error("Could not create image blob");

      const file = new File([blob], "scan.jpg", { type: "image/jpeg" });

      // Predict from canvas directly for better consistency
      await processAndPredict(canvas, file);
    } catch (error) {
      console.error("Capture error:", error);
    }
  };

  const handleGallerySelect = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imgUrl = URL.createObjectURL(file);
    const imgElement = new Image();
    imgElement.src = imgUrl;
    imgElement.onload = async () => {
      await processAndPredict(imgElement, file);
      URL.revokeObjectURL(imgUrl);
    };
  };

  return (
    <PageContainer
      pageTitle="AI Trash Scanner"
      pageDescription="Identifikasi sampah Anda dengan teknologi kecerdasan buatan"
      scrollable={false}
    >
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
        {/* Left Column: Camera Feed & Controls */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <ScanCameraFeed videoRef={videoRef} isModelLoading={isModelLoading} />

          <ScanControls
            fileInputRef={fileInputRef}
            onGallerySelect={handleGallerySelect}
            onCapture={captureAndPredict}
            isModelLoading={isModelLoading}
            isScanning={isScanning}
          />
        </div>

        {/* Right Column: Info Sidebar */}
        <div className="lg:col-span-3">
          <ScanInfoSidebar />
        </div>
      </div>
    </PageContainer>
  );
};
