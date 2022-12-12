import { useEffect, useState } from "react";

import closeBtn from "../assets/closeBtn.png";

import { GiftInput } from "./GiftInput";
import { GiftList } from "./GiftList";

export type Gift = {
  id: number;
  desc: string;
  amount: number;
  unitPrice?: number;
  urlImg?: string;
  recipient: string;
};

function replacer(key: string, value: any) {
  if (value instanceof Map) {
    return {
      dataType: "Map",
      value: Array.from(value.entries()),
    };
  } else {
    return value;
  }
}

function reviver(key: string, value: any) {
  if (typeof value === "object" && value !== null) {
    if (value.dataType === "Map") {
      return new Map(value.value);
    }
  }

  return value;
}

export const GiftContainer = () => {
  const [gifts, setGifts] = useState<Map<string, Gift>>(() => new Map());
  const [isModalOpen, toggleModal] = useState(false);

  useEffect(() => {
    const storedGifts = JSON.parse(localStorage.getItem("gifts")!, reviver);

    if (storedGifts && storedGifts.size > 0) {
      setGifts(storedGifts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("gifts", JSON.stringify(gifts, replacer));
  }, [gifts]);

  const removeAll = () => {
    setGifts(() => new Map());
  };

  const addGift = (newGift: Gift) => {
    const draft = new Map(gifts);
    const key = newGift.desc.toLowerCase();

    if (!draft.has(key)) draft.set(key, newGift);
    else {
      const unitsToAdd = newGift.amount;

      draft.get(key)!.amount += unitsToAdd;
    }

    setGifts(draft);
  };

  const removeGift = (key: string) => {
    const draft = new Map(gifts);

    if (draft.delete(key.toLowerCase())) setGifts(draft);
  };

  return (
    <div className="relative">
      <div
        className={
          "relative flex flex-col gap-10 " + (isModalOpen ? " opacity-10" : "")
        }
      >
        <button
          className="cursor-pointer w-9/12 sm:w-1/2 xl:w-5/12 self-center text-white border-2 py-1 px-2 rounded-md hover:border-primary-purple hover:bg-primary-green transition-colors "
          onClick={() => toggleModal(true)}
        >
          Agregar regalos
        </button>
        <GiftList gifts={[...gifts.values()]} handleRemove={removeGift} />
        {gifts.size > 0 ? (
          <button
            className="cursor-pointer w-9/12 sm:w-1/2 xl:w-5/12 self-center text-white border-2 py-1 px-2 rounded-md hover:border-primary-purple hover:bg-primary-green transition-colors "
            onClick={removeAll}
          >
            Remover todos
          </button>
        ) : (
          <div>
            <hr className="border-1 border-primary-purple -mt-5 mb-7" />
            <p className="text-white text-center font-comforta text-lg my-7">
              <span className="text-primary-gold">❖</span> Vámos, agrega algún
              regalo, es <span className="text-primary-gold">Navidad!</span>
            </p>
          </div>
        )}
      </div>
      {isModalOpen && (
        <dialog
          className="bg-primary-green-dark pt-5 border-2 border-primary-purple absolute w-80 xl:w-96 top-20 left-1/2 -translate-x-1/2 -translate-y-1/2"
          open={isModalOpen}
          onClose={() => toggleModal(false)}
        >
          <GiftInput addGift={addGift} />

          <button
            className="text-white absolute bottom-2 left-2 border-2 border-white hover:border-primary-purple h-8 w-8 rounded-full hover:bg-primary-green  transition-colors"
            onClick={() => toggleModal(false)}
          >
            <img alt="" className="w-full h-full" src={closeBtn} />
          </button>
        </dialog>
      )}
    </div>
  );
};
