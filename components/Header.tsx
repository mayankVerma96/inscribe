"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { removeBackground } from "@imgly/background-removal";
import { useSelectedImage } from "@/context/SelectedImageContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

const logoFont = "league spartan";

const Header = () => {
  const pathname = usePathname();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { imageUrl, setImageUrl, setIsImageSetupDone, setRemovedBgImageUrl } =
    useSelectedImage();

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
      await setupImage(fileUrl);
    }
  };

  const setupImage = async (fileUrl: string) => {
    setRemovedBgImageUrl(null);
    setIsImageSetupDone(false);

    try {
      const imageBlob = await removeBackground(fileUrl);
      const url = URL.createObjectURL(imageBlob);
      setRemovedBgImageUrl(url);
      setIsImageSetupDone(true);
    } catch (e) {
      console.log("setup image eror", e);
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
              accept=".jpg, .jpeg, .png"
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
