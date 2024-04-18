"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { SetPreviewCard } from "../../interface";
import type { TimePickerProps } from "antd";
import moment from "moment";
const CardContext = createContext<any>(undefined);

export function CardProvider({ children }: { children: React.ReactNode }) {
  const newCard: SetPreviewCard = {
    img: "",
    name: "",
    open: "",
    close: "",
    desc: "",
    seat: "",
  };

  const [card, setCard] = useState<SetPreviewCard>(newCard);
  const [previewImage, setPreviewImage] = useState<any>(null);

  /*   const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [num, setNum] = useState<string>(""); */

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    if (e.target.id === "inputName") {
      setCard((prevCard) => ({
        ...prevCard,
        name: e.target.value,
      }));
    }
    if (e.target.id === "inputDesc") {
      setCard((prevCard) => ({
        ...prevCard,
        desc: e.target.value,
      }));
    }
    if (e.target.id === "inputNumber") {
      setCard((prevCard) => ({
        ...prevCard,
        seat: e.target.value,
      }));
    }
  };
  const handleOpenChange: TimePickerProps["onChange"] = (time: any) => {
    const hour = time.$H;
    const minute = time.$m;
    const m = moment(`${hour}-${minute}`, "hh:mm a");
    const formattedTime = m.format("hh:mm a");
    console.log(formattedTime);
    setCard((prevCard) => ({
      ...prevCard,
      open: formattedTime,
    }));
  };

  const handleCloseChange: TimePickerProps["onChange"] = (time: any) => {
    const hour = time.$H;
    const minute = time.$m;
    const m = moment(`${hour}-${minute}`, "hh:mm a");
    const formattedTime = m.format("hh:mm a");
    console.log(formattedTime);
    setCard((prevCard) => ({
      ...prevCard,
      close: formattedTime,
    }));
  };

  /*   const [file, setFile] = useState<any>();
  function getfile(e: any) {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  } */

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setCard((prevCard) => ({
          ...prevCard,
          img: reader.result,
        }));
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  /* 
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(event.target.value);
  };

  const handleNumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setNum(event.target.value);
  }; */

  return (
    <CardContext.Provider
      value={{
        card,
        handleFormChange,
        handleOpenChange,
        handleCloseChange,
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
