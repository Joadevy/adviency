import { useEffect, useState } from "react";

import api from "../utils/api";

import { GiftList } from "./GiftList";
import { GiftModal } from "./GiftModal";
import { GiftInput } from "./GiftInput";
import Previsualize from "./Previsualize";
import XmasSong from "../assets/XmasCarol.mp3";
import ReactAudioPlayer from "react-audio-player";
import volumenOn from "../assets/volumen.png";
import volumenOff from "../assets/novolume.png";

export type Gift = {
  id: number;
  desc: string;
  amount: number;
  unitPrice: number;
  urlImg?: string;
  recipient: string;
};

type giftAPI = {
  status: string;
  data: Map<string, Gift>;
};

const totalForGifts = (arrGifts: Gift[]) => {
  return arrGifts.reduce((total, gift) => {
    total += gift.unitPrice * gift.amount;

    return total;
  }, 0);
};

export const GiftContainer = () => {
  const [gifts, setGifts] = useState<Map<string, Gift>>(() => new Map());
  const [isAddModalOpen, toggleAddModal] = useState(false);
  const [isPrevModalOpen, togglePrevModal] = useState(false);
  const [isMuted, toggleMuted] = useState(true);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGifts();
  }, []);

  useEffect(() => {
    saveGifts();
  }, [gifts]); //eslint-disable-line

  const getGifts = async () => {
    try {
      const req: giftAPI = await api.gifts();
      const gifts = req.data;

      if (gifts.size > 0) setGifts(gifts);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const saveGifts = async () => {
    try {
      await api.save(gifts);
    } catch (error) {
      console.error(error);
    }
  };

  const removeAll = () => {
    setGifts(() => new Map());
  };

  const addGift = (newGift: Gift) => {
    const draft = new Map(gifts);
    let key = newGift.id.toString();
    let exist = false;

    draft.forEach((e) =>
      e.desc === newGift.desc && e.recipient === newGift.recipient
        ? ((exist = true), (key = e.id.toString()))
        : null
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

  if (loading)
    return (
      <div>
        <h2 className="text-xl text-white font-nerko">
          Cargando <span className="text-md">cargando</span>{" "}
          <span className="text-sm">cargando</span>{" "}
          <span className="text-xs">cargando</span>
          ...
        </h2>
      </div>
    );

  return (
    <div className="relative">
      <div
        className={
          "relative flex flex-col gap-12 lg:gap-14 " +
          (isAddModalOpen || isPrevModalOpen ? "opacity-10" : "")
        }
      >
        <header className="flex items-center justify-center">
          <h1 className="text-white text-5xl font-nerko text-center underline">
            Regalos
          </h1>
          <button
            className="w-10 h-10 absolute top-0 right-0 border-2 p-2 rounded-full"
            onClick={() => toggleMuted(!isMuted)}
          >
            <img
              src={isMuted ? volumenOff : volumenOn}
              alt="Mute or unmute the background christmas song!"
            />
            <ReactAudioPlayer
              autoPlay={true}
              src={XmasSong}
              muted={isMuted}
              loop
            />
          </button>
        </header>
        <button
          className="cursor-pointer w-9/12 sm:w-1/2 xl:w-5/12 self-center text-white border-2 py-1 px-2 rounded-md hover:border-primary-purple hover:bg-primary-green transition-colors "
          onClick={() => toggleAddModal(true)}
        >
          Agregar regalos
        </button>
        <GiftList
          addGift={addGift}
          editGift={editGift}
          gifts={[...gifts.values()]}
          handleRemove={removeGift}
        />
        {gifts.size > 0 ? (
          <div className="flex flex-col items-center justify-center gap-7">
            <p className="text-white">
              Total:{" "}
              {totalForGifts(Array.from(gifts.values())).toLocaleString(
                "es-AR",
                { style: "currency", currency: "ARS" }
              )}
            </p>
            <button
              className="cursor-pointer w-9/12 sm:w-1/2 xl:w-5/12 self-center text-white border-2 py-1 px-2 rounded-md hover:border-primary-purple hover:bg-primary-green transition-colors -mt-5 "
              onClick={removeAll}
            >
              Remover todos
            </button>
            <button
              className="cursor-pointer w-9/12 sm:w-1/2 xl:w-5/12 self-center text-white border-2  py-1 px-2 rounded-md hover:border-primary-purple hover:bg-primary-green transition-colors -mt-5"
              onClick={() => togglePrevModal(true)}
            >
              Previsualizar
            </button>
          </div>
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
      {isAddModalOpen && (
        <GiftModal isModalOpen={isAddModalOpen} toggleModal={toggleAddModal}>
          <GiftInput addGift={addGift} />
        </GiftModal>
      )}
      {isPrevModalOpen && (
        <GiftModal isModalOpen={isPrevModalOpen} toggleModal={togglePrevModal}>
          <Previsualize gifts={[...gifts.values()]} />
        </GiftModal>
      )}
    </div>
  );
};
