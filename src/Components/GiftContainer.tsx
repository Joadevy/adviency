import { useEffect, useState } from "react";

import { GiftInput } from "./GiftInput";
import { GiftList } from "./GiftList";

export type Gift = {
  id: number;
  desc: string;
  amount: number;
  unitPrice?: number;
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
    <div className="flex flex-col gap-8">
      <GiftInput addGift={addGift} />
      <GiftList gifts={[...gifts.values()]} handleRemove={removeGift} />
      {gifts.size > 0 ? (
        <button
          className="cursor-pointer w-9/12 sm:w-1/2 xl:w-1/3 self-center text-white border-2 py-1 px-2 rounded-md hover:border-primary-purple hover:bg-primary-green transition-colors "
          onClick={removeAll}
        >
          Remover todos
        </button>
      ) : (
        <div className="self-center -mt-10">
          <p className="text-white font-comforta">
            <span className="text-primary-gold">❖</span> Vámos, agrega algún
            regalo, es <span className="text-primary-gold">Navidad!</span>
          </p>
        </div>
      )}
    </div>
  );
};
