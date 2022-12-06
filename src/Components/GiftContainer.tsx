import { useState } from "react";

import { GiftInput } from "./GiftInput";
import { GiftList } from "./GiftList";

export type Regalo = {
  id: number;
  desc: string;
  cant: number;
};

export const GiftContainer = () => {
  const [regalos, setRegalos] = useState<Regalo[]>([
    {
      id: 0,
      desc: "Fernet",
      cant: 1,
    },
    {
      id: 1,
      desc: "Notebook",
      cant: 1,
    },
    {
      id: 2,
      desc: "Aire acondicionado",
      cant: 1,
    },
  ]);

  const removeAll = () => {
    setRegalos([]);
  };

  const addGift = (newGift: Regalo) => {
    setRegalos((prev: Regalo[]) => [...prev, newGift]);
  };

  const removeGift = (id: number) => {
    setRegalos(regalos.filter((regalo) => regalo.id !== id));
  };

  return (
    <div className="flex flex-col gap-4">
      <GiftInput addRegalo={addGift} />
      <GiftList regalos={regalos} handleRemove={removeGift} />
      {regalos.length > 0 ? (
        <button
          onClick={removeAll}
          className="cursor-pointer mt-2 w-9/12  sm:w-1/2 xl:w-1/3 self-center text-white border-2 py-1 px-2 rounded-md hover:border-primary-purple hover:bg-primary-green transition-colors "
        >
          Remover todos
        </button>
      ) : (
        <div className="self-center">
          <p className="text-white font-comforta">
            <span className="text-primary-gold">❖</span> Vamos, agrega algun
            regalo, es <span className="text-primary-gold">Navidad!</span>
          </p>
        </div>
      )}
    </div>
  );
};
