"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type ImageContextType = {
  imageUrl: string | null;
  setImageUrl: (url: string) => void;
  isImageSetupDone: boolean;
  setIsImageSetupDone: (value: boolean) => void;
  removedBgImageUrl: string | null;
  setRemovedBgImageUrl: (url: string | null) => void;
};

const SelectedImageContext = createContext<ImageContextType | undefined>(
  undefined
);

export const SelectedImageProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isImageSetupDone, setIsImageSetupDone] = useState<boolean>(false);
  const [removedBgImageUrl, setRemovedBgImageUrl] = useState<string | null>(
    null
  );

  return (
    <SelectedImageContext.Provider
      value={{
        imageUrl,
        setImageUrl,
        isImageSetupDone,
        setIsImageSetupDone,
        removedBgImageUrl,
        setRemovedBgImageUrl,
      }}
    >
      {children}
    </SelectedImageContext.Provider>
  );
};

export const useSelectedImage = () => {
  const context = useContext(SelectedImageContext);

  if (!context) {
    throw new Error("useFile must be within a FileProvider");
  }

  return context;
};
