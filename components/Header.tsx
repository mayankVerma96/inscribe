"use client";

import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { removeBackground } from "@imgly/background-removal";
import { useSelectedImage } from "@/context/SelectedImageContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import heic2any from "heic2any";

const logoFont = "league spartan";

const Header = () => {
  const pathname = usePathname();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    imageUrl,
    setImageUrl,
    setIsImageSetupDone,
    setRemovedBgImageUrl,
    setImageUploadError,
  } = useSelectedImage();

  const handleUploadImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    console.log("file ==", file);
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setImageUrl(fileUrl);
      await setupImage(fileUrl, file);
    }
  };

  // const setupImage = async (fileUrl: string, file: File) => {
  //   setRemovedBgImageUrl(null);
  //   setIsImageSetupDone(false);

  //   try {
  //     const imageBlob = await removeBackground(fileUrl);
  //     const url = URL.createObjectURL(imageBlob);
  //     setRemovedBgImageUrl(url);
  //     setIsImageSetupDone(true);
  //   } catch (e) {
  //     console.log("setup image eror", e);
  //   }
  // };

  const setupImage = async (fileUrl: string, file: File): Promise<void> => {
    setRemovedBgImageUrl(null);
    setIsImageSetupDone(false);
    setImageUploadError(false);

    try {
      let imageBlob: Blob | Blob[];

      // Ensure this code runs only in the browser (not during SSR)
      if (typeof window !== "undefined") {
        console.log("file url", file.name);

        // Check if the file is in HEIC format
        if (file.name.endsWith(".heic") || file.name.endsWith(".HEIC")) {
          const heicResponse = await fetch(fileUrl);
          const heicBlob = await heicResponse.blob();

          // Dynamically import `heic2any` only when it's needed
          const heic2any = (await import("heic2any")).default;

          // Convert HEIC to PNG using the dynamically loaded `heic2any` library
          imageBlob = await heic2any({ blob: heicBlob, toType: "image/png" });
          // Check if `imageBlob` is an array (multiple blobs), and handle accordingly
          if (Array.isArray(imageBlob)) {
            // If it's an array, use the first Blob in the array
            imageBlob = imageBlob[0];
          }
        } else {
          // If not HEIC, proceed with the original file
          const response = await fetch(fileUrl);
          imageBlob = await response.blob();
        }

        const url = URL.createObjectURL(imageBlob);
        setRemovedBgImageUrl(url);

        setIsImageSetupDone(true);
      }
    } catch (e) {
      console.error("Setup image error:", e);
      setImageUploadError(true);
      window.alert(`Image upload error: ${e}`);
    }
  };

  return (
    <header className="w-full  p-4 flex justify-between items-center shadow-slate-800 shadow-md">
      <div
        className={`${
          pathname === "/" && "max-w-[1400px]"
        } w-full m-auto flex items-center justify-between`}
      >
        <Link href="/">
          <p
            className="text-2xl md:text-4xl font-semibold font-serif"
            style={{ fontFamily: logoFont }}
          >
            inscribe.
          </p>
        </Link>

        {pathname === "/edit" && (
          <div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              accept=".jpg, .jpeg, .png .heic"
            />
            <Button
              className="dark bg-blue-700 hover:bg-blue-800 text-white font-semibold font-mono p-6 text-xs md:text-base"
              onClick={handleUploadImage}
            >
              {imageUrl ? "Select Other Image" : "Add Image"}
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
