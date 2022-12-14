import { useEffect, useState } from "react";

import { GiftList } from "./GiftList";
import { GiftModal } from "./GiftModal";
import { GiftInput } from "./GiftInput";

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
    let key = newGift.id.toString();
    let exist = false;

    draft.forEach((e) =>
      e.desc === newGift.desc ? ((exist = true), (key = e.id.toString())) : null
    );

    if (!exist) draft.set(key, newGift);
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

  const editGift = (editedGift: Gift) => {
    const draft = new Map(gifts);
    const key = editedGift.id.toString();

    if (draft.has(key)) draft.set(key, editedGift);
    setGifts(draft);
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
        <GiftList
          editGift={editGift}
          gifts={[...gifts.values()]}
          handleRemove={removeGift}
        />
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
        <GiftModal isModalOpen={isModalOpen} toggleModal={toggleModal}>
          <GiftInput addGift={addGift} />
        </GiftModal>
      )}
    </div>
  );
};
