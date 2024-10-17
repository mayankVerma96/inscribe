"use client";
import MasonryGallery from "@/components/MansoryGallary";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import "@/app/fonts.css";

export default function Home() {
  return (
    <div className="container">
      <div className="flex flex-col justify-center items-center my-10">
        <p
          className="text-center text-white  text-5xl"
          style={{ fontFamily: "Black Ops One" }}
        >
          Create{" "}
          <span className={`text-black bg-white rounded-lg px-2 font-bold `}>
            text-behind-image
          </span>{" "}
          designs easily
        </p>
        <Link href="/edit" className="mt-10">
          <Button
            variant="outline"
            className="bg-blue-600 rounded-2xl"
            size="lg"
            style={{ height: "auto" }}
          >
            <p className="font-semibold text-xl p-2 tracking-wide font-mono">
              Open the App
            </p>
          </Button>
        </Link>
      </div>
      <div className="images-grid">
        <MasonryGallery />
      </div>
    </div>
  );
}
