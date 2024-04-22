"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { SetPreviewCard, SpaceItem } from "../../interface";
import type { TimePickerProps } from "antd";
import moment from "moment";
const CardContext = createContext<any>(undefined);

export function CardProvider({ children }: { children: React.ReactNode }) {
  const newCard: SpaceItem = {
    image: "",
    name: "",
    openTime: "",
    closeTime: "",
    address: "",
    remaining: 1,
  };

  const edit: SpaceItem = {
    image: "",
    name: "",
    openTime: "",
    closeTime: "",
    address: "",
    remaining: 1,
  };

  const [card, setCard] = useState<SpaceItem>(newCard);
  const [cardEdit, setCardEdit] = useState<SpaceItem>(edit);

  const [amount, setAmount] = useState<number>(1);
  const [inputValue, setInputValue] = useState("");

  const [isValid, setIsValid] = useState(true);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    /* if (e.target.id === "number") {
      let handleNegative: any = Number(e.target.value);
      handleNegative = (value: number) => {
        if (value < 1) {
          setAmount(1);
        } else {
          setAmount(value);
        }
      };
    } */
    if (e.target.id.substring(0, 5) === "Edit-") {
      const { value } = e.target;
      setCardEdit((prevCard) => ({
        ...prevCard,
        [e.target.id.substring(5)]: value,
      }));
    } else {
      const { id, value } = e.target;
      /* const { id, value } = e.target;
      const isNegative = e.target.value.startsWith("-"); */
      /* if (!isNegative) {
        setInputValue(e.target.value);
        setIsValid(true);
      } else {
        setInputValue("");
        setIsValid(false);
      }
      if (Number(e.target.value) < 1) {
        setAmount(1);
      } else {
        setAmount(Number(e.target.value));
      } */
      setCard((prevCard) => ({
        ...prevCard,
        [id]: value,
      }));
    }

    /* const Value: number = Number(e.target.value);
    if (Value < 1) {
      setAmount(1);
    } else {
      setAmount(Value);
    } */

    /* if (e.target.id === "number") {

    } */

    /* setCard((prevCard) => ({
      ...prevCard,
      number: e.target.value,
    })); */
  };

  const handleOpenChange: TimePickerProps["onChange"] = (time: any) => {
    const hour = time.$H;
    const minute = time.$m;
    const m = moment(`${hour}-${minute}`, "hh:mm a");
    const formattedTime = m.format("hh:mm a");
    setCard((prevCard) => ({
      ...prevCard,
      openTime: formattedTime,
    }));
  };
  const handleEditOpenChange: TimePickerProps["onChange"] = (time: any) => {
    const hour = time.$H;
    const minute = time.$m;
    const m = moment(`${hour}-${minute}`, "hh:mm a");
    const formattedTime = m.format("hh:mm a");
    setCardEdit((prevCard) => ({
      ...prevCard,
      openTime: formattedTime,
    }));
  };
  const handleCloseChange: TimePickerProps["onChange"] = (time: any) => {
    const hour = time.$H;
    const minute = time.$m;
    const m = moment(`${hour}-${minute}`, "hh:mm a");
    const formattedTime = m.format("hh:mm a");
    setCard((prevCard) => ({
      ...prevCard,
      closeTime: formattedTime,
    }));
  };
  const handleEditCloseChange: TimePickerProps["onChange"] = (time: any) => {
    const hour = time.$H;
    const minute = time.$m;
    const m = moment(`${hour}-${minute}`, "hh:mm a");
    const formattedTime = m.format("hh:mm a");
    setCardEdit((prevCard) => ({
      ...prevCard,
      closeTime: formattedTime,
    }));
  };

  /*   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
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
  }; */

  return (
    <CardContext.Provider
      value={{
        card,
        handleFormChange,
        handleOpenChange,
        handleCloseChange,
        handleEditCloseChange,
        handleEditOpenChange,
        inputValue,
        isValid,
        amount,
        cardEdit,
      }}
    >
      {children}
    </CardContext.Provider>
  );
}

export function useCardContext() {
  return useContext(CardContext);
}
