"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import "@/app/fonts.css";

import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import TextCustomizer from "@/components/editor/TextCustomizer";
import { useSelectedImage } from "@/context/SelectedImageContext";
import { ReloadIcon } from "@radix-ui/react-icons";

import PlusIcon from "../../public/assets/icons/plus.svg";
import DownloadIcon from "../../public/assets/icons/download.svg";
import DeleteIcon from "../../public/assets/icons/delete.svg";
import DuplicateIcon from "../../public/assets/icons/duplicate.svg";

const EditImagePage = () => {
  const [textSets, setTextSets] = useState<Array<any>>([]);
  const {
    imageUrl,
    isImageSetupDone,
    removedBgImageUrl,
    setImageUrl,
    setRemovedBgImageUrl,
  } = useSelectedImage();
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [containerHeight, setContainerHeight] = useState<number>(500);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const addNewTexts = () => {
    const newId = Math.max(...textSets.map((set) => set.id), 0) + 1;
    setTextSets((prev) => [
      ...prev,
      {
        id: newId,
        text: "Text",
        fontFamily: "Inter",
        top: 40,
        left: 0,
        color: "white",
        fontSize: 200,
        fontWeight: 800,
        opacity: 1,
        shadowColor: "transparent",
        shadowSize: "4",
        shadowBlur: "4",
        rotation: 0,
      },
    ]);
  };

  const handlePropertyChange = ({
    id,
    property,
    value,
  }: {
    id: number;
    property: string;
    value: any;
  }) => {
    setTextSets((prev) =>
      prev.map((set) => (set.id === id ? { ...set, [property]: value } : set))
    );
  };

  const duplicateText = (textSet: any) => {
    const newId = Math.max(...textSets.map((set) => set.id), 0) + 1;
    setTextSets((prev) => [...prev, { ...textSet, id: newId }]);
  };

  const removeText = (id: number) => {
    setTextSets((prev) => prev.filter((set) => set.id !== id));
  };

  const saveEditedImage = () => {
    if (!canvasRef.current || !isImageSetupDone) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bgImg = new (window as any).Image();
    bgImg.crossOrigin = "anonymous";

    bgImg.onload = () => {
      const imageAspectRatio = bgImg.width / bgImg.height;

      canvas.width = bgImg.width;
      canvas.height = bgImg.height;

      ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

      textSets.forEach((textSet) => {
        ctx.save(); // Save the current state
        const calculatedFontSize =
          imageAspectRatio > 1
            ? (canvas.width / 400) * textSet.fontSize
            : (canvas.height / 1400) * textSet.fontSize;

        ctx.font = `${textSet.fontWeight} ${calculatedFontSize}px ${textSet.fontFamily}`;

        ctx.fillStyle = textSet.color;
        ctx.globalAlpha = textSet.opacity;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Apply shadow properties from textSet
        ctx.shadowOffsetX = textSet.shadowSize;
        ctx.shadowOffsetY = textSet.shadowSize;
        ctx.shadowBlur = textSet.shadowBlur || 0;
        ctx.shadowColor = textSet.shadowColor;

        const x = (canvas.width * (textSet.left + 50)) / 100;
        const y = (canvas.height * (50 - textSet.top)) / 100;

        // Move the context to the text position and rotate
        ctx.translate(x, y);
        ctx.rotate((textSet.rotation * Math.PI) / 180); // Convert degrees to radians
        ctx.fillText(textSet.text, 0, 0); // Draw text at the origin (0, 0)
        ctx.restore(); // Restore the original state
      });

      if (removedBgImageUrl) {
        const removedBgImg = new (window as any).Image();
        removedBgImg.crossOrigin = "anonymous";
        removedBgImg.onload = () => {
          ctx.drawImage(removedBgImg, 0, 0, canvas.width, canvas.height);
          triggerDownload();
        };
        removedBgImg.src = removedBgImageUrl;
      } else {
        triggerDownload();
      }
    };
    bgImg.src = imageUrl || "";

    function triggerDownload() {
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "inscribe-image.png";
      link.href = dataUrl;
      link.click();
    }
  };

  const onImageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    const aspectRatio = naturalWidth / naturalHeight;

    setImageDimensions({ width: naturalWidth, height: naturalHeight });

    // Update container height based on the aspect ratio
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const newHeight = containerWidth / aspectRatio;
      setContainerHeight(newHeight);
    }
  };

  useEffect(() => {
    // Resize the container when the window is resized to maintain the aspect ratio
    const handleResize = () => {
      if (containerRef.current && imageDimensions) {
        const aspectRatio = imageDimensions.width / imageDimensions.height;
        const containerWidth = containerRef.current.offsetWidth;
        setContainerHeight(containerWidth / aspectRatio);
      }
    };
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [imageDimensions]);

  useEffect(() => {
    setTextSets([]);
  }, [imageUrl]);

  useEffect(() => {
    return () => {
      setTextSets([]);
      setImageUrl("");
      setRemovedBgImageUrl(null);
    };
  }, []);

  if (!imageUrl) {
    return (
      <div className="flex-1 flex items-center justify-center h-full w-full">
        <h2 className="text-md md:text-xl font-semibold text-center mx-5">
          Welcome, get started by uploading an image!
        </h2>
      </div>
    );
  }

  return (
    <section className="flex m-8 gap-6 max-md:flex-col">
      <div className=" flex-1 sticky top-2 z-20">
        <div className="relative h-full">
          <div
            ref={containerRef}
            id="edited-image"
            style={{ height: containerHeight }}
            className="sticky md:w-[80%] h-[500px] top-2  flex border border-border rounded-lg overflow-hidden bg-black"
          >
            {isImageSetupDone ? (
              <Image
                src={imageUrl}
                alt="uploaded"
                layout="fill"
                objectFit="contain"
                objectPosition="center"
                onLoad={onImageLoaded}
              />
            ) : (
              <span className="flex items-center justify-center w-full gap-2">
                <ReloadIcon className="animate-spin" /> Loading, please wait
              </span>
            )}

            {isImageSetupDone &&
              textSets.map(
                ({
                  top,
                  left,
                  id,
                  rotation,
                  color,
                  fontSize,
                  fontWeight,
                  fontFamily,
                  opacity,
                  shadowBlur,
                  shadowColor,
                  shadowSize,
                  text,
                }) => {
                  if (!containerRef.current) return;
                  const aspectRatio =
                    containerRef.current.offsetWidth /
                    containerRef.current.offsetHeight;
                  return (
                    <div
                      key={id}
                      style={{
                        position: "absolute",
                        top: `${50 - top}%`,
                        left: `${left + 50}%`,
                        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                        color: color,
                        textAlign: "center",
                        fontSize: `${aspectRatio * fontSize}px`,
                        fontWeight: fontWeight,
                        fontFamily: fontFamily,
                        opacity: opacity,
                        textShadow: `${shadowSize}px ${shadowSize}px ${shadowBlur}px ${shadowColor}`,
                      }}
                    >
                      {text}
                    </div>
                  );
                }
              )}
            {removedBgImageUrl && (
              <Image
                src={removedBgImageUrl}
                alt="Removed bg"
                layout="fill"
                objectFit="contain"
                objectPosition="center"
                className="absolute top-0 left-0 w-full h-full"
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex gap-4">
          <Button
            className="flex-1"
            variant={"secondary"}
            onClick={addNewTexts}
          >
            <PlusIcon style={{ fill: "white" }} />
            Add Text
          </Button>

          <canvas ref={canvasRef} style={{ display: "none" }} />
          <Button
            className="flex-1"
            variant={"destructive"}
            onClick={saveEditedImage}
          >
            <DownloadIcon style={{ height: "14px" }} />
            Save Image
          </Button>
        </div>

        <div className="mt-4">
          {textSets.map((textSet) => (
            <div className="flex justify-between ">
              <Accordion
                key={`text-set-${textSet.id}`}
                type="single"
                collapsible
                className="flex-1"
              >
                <TextCustomizer
                  textSet={textSet}
                  handlePropertyChange={handlePropertyChange}
                />
              </Accordion>
              <div className="mt-5 ml-2 cursor-pointer flex gap-2">
                <DuplicateIcon
                  style={{ height: "18px" }}
                  onClick={() => duplicateText(textSet)}
                />
                <DeleteIcon
                  style={{ height: "18px" }}
                  onClick={() => removeText(textSet.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EditImagePage;
