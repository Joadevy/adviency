import React, { useState, type FC } from "react";

import removeIcon from "../assets/dustbin.png";
import editIcon from "../assets/edit.png";

import { Gift } from "./GiftContainer";
import { GiftInput } from "./GiftInput";
import { GiftModal } from "./GiftModal";

type props = {
  gifts: Gift[];
  handleRemove: (_: string) => void;
  editGift: (_: Gift) => void;
};

function isImage(url: string) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

export const GiftList: FC<props> = ({ gifts, handleRemove, editGift }) => {
  const [isModalOpen, toggleModal] = useState(false);
  const [editedGift, setEditedGift] = useState<Gift>();

  const handleEdit = (gift: Gift) => {
    toggleModal(true);
    setEditedGift(gift);
  };

  return (
    <div>
      <ul
        className={
          "font-comforta flex flex-col gap-3" +
          (isModalOpen ? " opacity-10" : "")
        }
      >
        {gifts.map((gift, index) => (
          <li key={index} className="text-white font-normal text-lg">
            <div className="bg-primary-green rounded-sm py-2 px-1 flex items-center justify-between gap-2">
              <div className="flex gap-2 items-center">
                <div className="w-14 h-14 border-2 border-primary-gold rounded-md">
                  <img
                    alt=""
                    className="w-full h-full"
                    src={
                      isImage(gift.urlImg!)
                        ? gift.urlImg
                        : "https://static.vecteezy.com/system/resources/previews/010/263/593/original/round-gift-box-image-with-a-dark-red-color-wrap-paper-and-orange-color-ribbon-christmas-gift-on-a-transparent-background-gift-images-for-birthdays-anniversaries-or-christmas-events-design-free-png.png"
                    }
                  />
                </div>
                <div className="flex flex-col md:flex-row md:gap-2">
                  <p className="overflow-hidden">
                    {gift.desc}
                    <span className="text-primary-gold ml-2">
                      ×{gift.amount}
                    </span>
                  </p>
                  <p className="overflow-hidden">
                    ↪ para:
                    <span className="text-primary-purple">
                      {" "}
                      {gift.recipient}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="w-5 h-5" onClick={() => handleEdit(gift)}>
                  <img alt="remove element" className="w-full" src={editIcon} />
                </button>
                <button
                  className="w-5 h-5"
                  onClick={() => handleRemove(gift.id.toString())}
                >
                  <img
                    alt="remove element"
                    className="w-full"
                    src={removeIcon}
                  />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <GiftModal isModalOpen={isModalOpen} toggleModal={toggleModal}>
          <GiftInput
            closeModal={toggleModal}
            editGift={editGift}
            toEdit={editedGift}
          />
        </GiftModal>
      )}
    </div>
  );
};
