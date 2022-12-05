import React, { useState, FC } from "react";

import { Regalo } from "./GiftContainer";

type props = {
  addRegalo: (_: Regalo) => void;
};

export const GiftInput: FC<props> = ({ addRegalo }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleEnter = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") addGift();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addGift();
  };

  const addGift = () => {
    if (!inputValue.trim()) return;

    const newGift: Regalo = {
      id: new Date().getTime(),
      desc: inputValue.charAt(0).toUpperCase() + inputValue.slice(1),
      cant: 1,
    };

    addRegalo(newGift);
    clearInput();
  };

  const clearInput = () => {
    setInputValue("");
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <form
      className="flex gap-3 self-center justify-center"
      onSubmit={handleSubmit}
    >
      <input
        className="w-3/4 rounded-md bg-white p-1 shadow outline-none focus:outline-primary-purple"
        placeholder="Agrega tu regalo..."
        type="text"
        value={inputValue}
        onChange={handleInput}
        onKeyDown={handleEnter}
      />
      <input
        className="cursor-pointer text-white border-2 py-1 px-2 rounded-md hover:border-primary-purple hover:bg-primary-green transition-colors"
        type="submit"
        value="Agregar"
      />
    </form>
  );
};
