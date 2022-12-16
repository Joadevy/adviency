import React, { useState, FC } from "react";

import { Gift } from "./GiftContainer";

type props = {
  addGift?: (_: Gift) => void;
  editGift?: (_: Gift) => void;
  toEdit?: Gift;
  closeModal?: (_: boolean) => void;
};

const normalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const randomGifts: string[] = [
  "Fernet",
  "Notebook",
  "Aire acondicionado",
  "Medias",
  "Auriculares",
  "Ventilador Liliana",
  "Pelopincho",
  "1kg de yerba",
  "Vino",
  "Camisa",
  "Vestido",
  "Paltas",
];

const getRandomGift = () => {
  return randomGifts[Math.floor(Math.random() * randomGifts.length)];
};

export const GiftInput: FC<props> = ({
  addGift,
  editGift,
  toEdit,
  closeModal,
}) => {
  const [inputValue, setInputValue] = useState<string>(toEdit?.desc ?? "");
  const [giftImg, setGiftImg] = useState<string>(toEdit?.urlImg ?? "");
  const [recipient, setRecipient] = useState<string>(toEdit?.recipient ?? "");

  const [amount, setAmount] = useState<number>(toEdit?.amount ?? 1);
  let editing = false;

  if (toEdit) editing = true;

  const handleEnter = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key !== "Enter" || amount <= 0 || !recipient.trim()) return;
    if (editing) return handleEdit();
    handleAdd();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editing) return handleEdit();
    handleAdd();
  };

  const handleAdd = () => {
    if (!inputValue.trim()) return;

    const newGift: Gift = {
      id: new Date().getTime(),
      desc: normalize(inputValue),
      amount: amount,
      urlImg: giftImg,
      recipient: normalize(recipient),
    };

    addGift!(newGift);
    clearInputs();
  };

  const handleEdit = () => {
    if (!inputValue.trim()) return;

    const editedGift: Gift = {
      id: toEdit!.id,
      desc: normalize(inputValue),
      amount: amount,
      urlImg: giftImg,
      recipient: normalize(recipient),
    };

    editGift!(editedGift);
    closeModal!(false);
  };

  const clearInputs = () => {
    setInputValue("");
    setGiftImg("");
    setRecipient("");
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleRandomGift = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let rGift: string = getRandomGift();

    while (rGift === inputValue) {
      rGift = getRandomGift();
    }

    setInputValue(rGift);
  };

  return (
    <form
      className="flex flex-col gap-4 md:gap-3 self-center items-start justify-center"
      onSubmit={handleSubmit}
    >
      <div className="flex gap-3 md:gap-2">
        <input
          className="w-3/4 rounded-md bg-white p-2 shadow outline-none focus:outline-primary-purple"
          placeholder="Nombre de tu regalo"
          tabIndex={0}
          type="text"
          value={inputValue}
          onChange={handleInput}
          onKeyDown={handleEnter}
        />
        <button
          className="cursor-pointer text-white text-sm w-9/12 sm:w-1/2 xl:w-1/3 border-2 py-1 px-2 rounded-md hover:border-primary-purple hover:bg-primary-green transition-colors"
          onClick={handleRandomGift}
        >
          Sorprendeme!
        </button>
      </div>
      <input
        className="w-1/6 text-center rounded-md bg-white p-2 shadow outline-none focus:outline-primary-purple"
        defaultValue={amount}
        min="1"
        name="quantity"
        type="number"
        onChange={(e) => setAmount(Math.floor(+e.target.value))}
      />
      <input
        required
        className="w-3/4 rounded-md bg-white p-2 shadow outline-none focus:outline-primary-purple"
        placeholder="Destinatario"
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        className="w-3/4 rounded-md bg-white p-2 shadow outline-none focus:outline-primary-purple"
        placeholder="Link a una imagen (opcional)"
        type="text"
        value={giftImg}
        onChange={(e) => setGiftImg(e.target.value)}
      />
      <input
        className="cursor-pointer self-center text-white w-9/12 sm:w-1/2 xl:w-1/3 border-2 py-1 px-2 rounded-md hover:border-primary-purple hover:bg-primary-green transition-colors"
        type="submit"
        value={editing ? "Editar" : "Agregar"}
      />
    </form>
  );
};
