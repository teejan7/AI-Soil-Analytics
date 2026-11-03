"use client";

// Task: Implement soil image capture, upload, preview, image validation,
// and multilingual support for English, Hindi, and Malayalam.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Camera,
  Upload,
  Image as ImageIcon,
  X,
  RotateCcw,
  AlertCircle,
} from "lucide-react";

// Task: Enable multilingual text on the soil analysis page.
import { useLanguage } from "../translations/LanguageProvider";

export default function AnalyzePage() {
  // Task: Get the selected language and translation function.
  const { t } = useLanguage();

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const cameraInputRef = useRef<HTMLInputElement>(null);

  const [cameraOpen, setCameraOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Task: Track whether the selected image came from camera or upload.
  const [imageSource, setImageSource] = useState<
    "camera" | "upload" | null
  >(null);

  const [cameraError, setCameraError] = useState<string | null>(null);

  // Task: Store image validation errors.
  const [imageError, setImageError] = useState<string | null>(null);

  // Task: Define the maximum allowed image size.
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

  // Task: Validate uploaded image files using translated error messages.
  const validateImage = (file: File): string | null => {
    if (!file.type.startsWith("image/")) {
      return t("invalidImageFile");
    }

    if (file.size > MAX_IMAGE_SIZE) {
      return t("imageSizeError");
    }

    return null;
  };

  // Task: Open the device webcam.
  const openCamera = async () => {
    setCameraError(null);
    setImageError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
        },
        audio: false,
      });

      streamRef.current = stream;

      setCameraOpen(true);

      // Task: Connect webcam stream to video preview.
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (error) {
      console.error("Camera error:", error);

      setCameraError(t("cameraError"));
    }
  };

  // Task: Stop the webcam.
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => {
        track.stop();
      });

      streamRef.current = null;
    }

    setCameraOpen(false);
  };

  // Task: Capture a photo from the webcam.
  const capturePhoto = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const imageUrl = canvas.toDataURL("image/jpeg", 0.9);

    // Task: Store captured camera image.
    setSelectedImage(imageUrl);
    setImageSource("camera");
    setImageError(null);

    stopCamera();
  };

  // Task: Validate and handle uploaded images.
  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    // Task: Validate the selected image before preview.
    const validationError = validateImage(file);

    if (validationError) {
      setSelectedImage(null);
      setImageSource(null);
      setImageError(validationError);

      // Task: Reset input so the user can select another file.
      event.target.value = "";

      return;
    }

    const imageUrl = URL.createObjectURL(file);

    // Task: Store valid uploaded image.
    setSelectedImage(imageUrl);
    setImageSource("upload");
    setImageError(null);

    // Task: Reset input so the same file can be selected again.
    event.target.value = "";
  };

  // Task: Clean up webcam when leaving the page.
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#F7FAF5]">

      {/* HEADER */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-md items-center gap-3 px-5 py-4">

          {/* Task: Navigate directly to Home page. */}
          <Link
            href="/home"
            className="rounded-full bg-gray-100 p-2"
            aria-label={t("back")}
          >
            <ArrowLeft size={19} />
          </Link>

          <div>
            <h1 className="font-bold text-gray-900">
              {t("soilAnalysis")}
            </h1>

            <p className="text-xs text-gray-500">
              {t("analyzeYourSoil")}
            </p>
          </div>

        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="mx-auto max-w-md px-5 pb-10 pt-6">

        {/* PHOTO SELECTION */}
        {!selectedImage && !cameraOpen && (
          <>
            {/* INTRO */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900">
                {t("addSoilPhoto")}
              </h2>

              <p className="mt-2 text-sm leading-5 text-gray-500">
                {t("soilPhotoDescription")}
              </p>
            </section>

            {/* CAMERA / UPLOAD OPTIONS */}
            <section className="mt-7 space-y-4">

              {/* TAKE PHOTO */}
              <button
                type="button"
                onClick={openCamera}
                className="flex w-full items-center gap-4 rounded-3xl bg-green-700 p-5 text-left text-white shadow-sm transition hover:bg-green-800"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                  <Camera size={28} />
                </div>

                <div>
                  <p className="font-bold">
                    {t("takePhoto")}
                  </p>

                  <p className="mt-1 text-xs text-white/80">
                    {t("useCamera")}
                  </p>
                </div>
              </button>

              {/* UPLOAD PHOTO */}
              <button
                type="button"
                onClick={() => {
                  setImageError(null);
                  cameraInputRef.current?.click();
                }}
                className="flex w-full items-center gap-4 rounded-3xl border border-gray-200 bg-white p-5 text-left shadow-sm transition hover:shadow-md"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-green-100">
                  <Upload
                    size={27}
                    className="text-green-700"
                  />
                </div>

                <div>
                  <p className="font-bold text-gray-900">
                    {t("uploadPhoto")}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {t("chooseImage")}
                  </p>
                </div>
              </button>

              {/* FILE INPUT */}
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />

            </section>

            {/* IMAGE VALIDATION ERROR */}
            {imageError && (
              <div className="mt-5 flex gap-3 rounded-2xl border border-red-100 bg-red-50 p-4">

                <AlertCircle
                  size={20}
                  className="mt-0.5 shrink-0 text-red-600"
                />

                <div>
                  <p className="font-semibold text-red-700">
                    {t("invalidImage")}
                  </p>

                  <p className="mt-1 text-sm text-red-600">
                    {imageError}
                  </p>
                </div>

              </div>
            )}

            {/* CAMERA ERROR */}
            {cameraError && (
              <div className="mt-5 flex gap-3 rounded-2xl border border-red-100 bg-red-50 p-4">

                <AlertCircle
                  size={20}
                  className="mt-0.5 shrink-0 text-red-600"
                />

                <p className="text-sm text-red-700">
                  {cameraError}
                </p>

              </div>
            )}

            {/* PHOTO TIPS */}
            <section className="mt-7 rounded-3xl bg-green-50 p-5">

              <div className="flex items-center gap-2">

                <ImageIcon
                  size={19}
                  className="text-green-700"
                />

                <h3 className="font-bold text-gray-900">
                  {t("photoTips")}
                </h3>

              </div>

              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li>• {t("goodLighting")}</li>
                <li>• {t("soilClearlyVisible")}</li>
                <li>• {t("avoidBlurry")}</li>
                <li>• {t("maxImageSize")}</li>
              </ul>

            </section>
          </>
        )}

        {/* WEBCAM */}
        {cameraOpen && (
          <section>

            <div className="flex items-center justify-between">

              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {t("takeAPhoto")}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  {t("cameraPosition")}
                </p>
              </div>

              <button
                type="button"
                onClick={stopCamera}
                className="rounded-full bg-gray-100 p-2"
                aria-label={t("cancel")}
              >
                <X size={20} />
              </button>

            </div>

            {/* CAMERA PREVIEW */}
            <div className="relative mt-6 overflow-hidden rounded-3xl bg-black shadow-lg">

              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-5 rounded-2xl border-2 border-white/80 [background:linear-gradient(#fff_0_0)_left_top/32px_2px_no-repeat,linear-gradient(#fff_0_0)_left_top/2px_32px_no-repeat,linear-gradient(#fff_0_0)_right_top/32px_2px_no-repeat,linear-gradient(#fff_0_0)_right_top/2px_32px_no-repeat,linear-gradient(#fff_0_0)_left_bottom/32px_2px_no-repeat,linear-gradient(#fff_0_0)_left_bottom/2px_32px_no-repeat,linear-gradient(#fff_0_0)_right_bottom/32px_2px_no-repeat,linear-gradient(#fff_0_0)_right_bottom/2px_32px_no-repeat]" />

            </div>

            {/* CAPTURE BUTTON */}
            <button
              type="button"
              onClick={capturePhoto}
              className="mx-auto mt-6 flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-green-700 text-white shadow-lg"
              aria-label={t("takePhoto")}
            >
              <Camera size={28} />
            </button>

            <p className="mt-3 text-center text-xs text-gray-500">
              {t("capturePhoto")}
            </p>

          </section>
        )}

        {/* IMAGE PREVIEW */}
        {selectedImage && (
          <section>

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {t("soilPhoto")}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                {t("checkPhoto")}
              </p>
            </div>

            {/* IMAGE PREVIEW */}
            <div className="mt-6 overflow-hidden rounded-3xl bg-white shadow-sm">

              <img
                src={selectedImage}
                alt={t("soilPhoto")}
                className="h-72 w-full object-cover"
              />

            </div>

            {/* RETAKE / CHOOSE ANOTHER */}
            <button
              type="button"
              onClick={() => {
                // Task: Retake using the same source as the original image.

                setSelectedImage(null);
                setImageError(null);

                if (imageSource === "camera") {
                  openCamera();
                } else {
                  cameraInputRef.current?.click();
                }
              }}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white py-3.5 font-semibold text-gray-700"
            >
              <RotateCcw size={18} />

              {imageSource === "camera"
                ? t("retakePhoto")
                : t("chooseAnotherPhoto")}
            </button>

            {/* CONTINUE */}
            <Link
              href="/soil-test"
              className="mt-3 flex w-full items-center justify-center rounded-2xl bg-green-700 py-4 font-semibold text-white"
            >
              {t("continue")}
            </Link>

          </section>
        )}

      </div>

    </main>
  );
}
