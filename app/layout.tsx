import type { Metadata } from "next";
import "./globals.css";
import "@/app/fonts.css";
import Header from "@/components/Header";
import { SelectedImageProvider } from "@/context/SelectedImageContext";

export const metadata: Metadata = {
  title: "Inscribe",
  description: "Add text behind images",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark">
        <SelectedImageProvider>
          <Header />
          {children}
          <footer className="my-9">
            <p className="text-center text-md md:text-xl">
              Created by{" "}
              <a
                className=" text-red-300 text-lg md:text-2xl"
                rel="author"
                target="_blank"
                href="https://mayankverma.dev"
              >
                Mayank Verma
              </a>
            </p>
          </footer>
        </SelectedImageProvider>
      </body>
    </html>
  );
}
