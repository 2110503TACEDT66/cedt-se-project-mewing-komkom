"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

const CardContext = createContext<any>(undefined);

export function CardProvider({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<any>(null);
  const handleFileChange = (e: any) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(event.target.value);
  };

  return (
    <CardContext.Provider
      value={{
        name,
        handleNameChange,
        desc,
        handleDescChange,
        previewImage,
        handleFileChange,
      }}
    >
      {children}
    </CardContext.Provider>
  );
}

export function useCardContext() {
  return useContext(CardContext);
}
