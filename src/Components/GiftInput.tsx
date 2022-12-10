import React, { useState, FC } from "react";

import { Gift } from "./GiftContainer";

type props = {
  addGift: (_: Gift) => void;
};

export const GiftInput: FC<props> = ({ addGift }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [giftImg, setGiftImg] = useState<string>("");
  const [amount, setAmount] = useState<number>(1);

  const handleEnter = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" && amount > 0) handleAdd();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAdd();
  };

  const handleAdd = () => {
    if (!inputValue.trim()) return;

    const newGift: Gift = {
      id: new Date().getTime(),
      desc:
        inputValue.charAt(0).toUpperCase() + inputValue.slice(1).toLowerCase(),
      amount: amount,
      urlImg: giftImg,
    };

    addGift(newGift);
    clearInputs();
  };

  const clearInputs = () => {
    setInputValue("");
    setGiftImg("");
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <form
      className="flex flex-col gap-4 md:gap-3 self-center justify-center"
      onSubmit={handleSubmit}
    >
      <div className="flex gap-3 md:gap-2">
        <input
          className="w-3/4 rounded-md bg-white p-2 shadow outline-none focus:outline-primary-purple"
          placeholder="Agrega tu regalo..."
          type="text"
          value={inputValue}
          onChange={handleInput}
          onKeyDown={handleEnter}
        />
        <input
          className="w-1/6 text-center rounded-md bg-white p-2 shadow outline-none focus:outline-primary-purple"
          defaultValue={amount}
          min="1"
          name="quantity"
          type="number"
          onChange={(e) => setAmount(Math.floor(+e.target.value))}
        />
      </div>
      <input
        className="w-3/4 self-center rounded-md bg-white p-2 shadow outline-none focus:outline-primary-purple"
        placeholder="Imagen del regalo (opcional)"
        type="text"
        value={giftImg}
        onChange={(e) => setGiftImg(e.target.value)}
      />
      <input
        className="cursor-pointer text-white w-9/12 sm:w-1/2 xl:w-1/3 self-center border-2 py-1 px-2 rounded-md hover:border-primary-purple hover:bg-primary-green transition-colors"
        type="submit"
        value="Agregar"
      />
    </form>
  );
};
