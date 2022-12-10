import React, { type FC } from "react";

import removeIcon from "../assets/dustbin.png";

import { Gift } from "./GiftContainer";

type props = {
  gifts: Gift[];
  handleRemove: (_: string) => void;
};

function isImage(url: string) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

export const GiftList: FC<props> = ({ gifts, handleRemove }) => {
  return (
    <ul className="font-comforta flex flex-col gap-3">
      {gifts.map((gift, index) => (
        <li key={index} className="text-white font-normal text-lg">
          <div className="bg-primary-green rounded-sm py-2 px-1 flex items-center justify-between gap-2">
            <div className="flex gap-2 items-center">
              <div className="w-14 h-14 border-2 border-primary-gold rounded-md">
                <img
                  className="w-full h-full"
                  src={
                    isImage(gift.urlImg!)
                      ? gift.urlImg
                      : "https://static.vecteezy.com/system/resources/previews/010/263/593/original/round-gift-box-image-with-a-dark-red-color-wrap-paper-and-orange-color-ribbon-christmas-gift-on-a-transparent-background-gift-images-for-birthdays-anniversaries-or-christmas-events-design-free-png.png"
                  }
                  alt=""
                />
              </div>
              <p className="overflow-hidden">
                {gift.desc}{" "}
                <span className="text-primary-gold">×{gift.amount}</span>
              </p>
            </div>
            <button className="w-5 h-5" onClick={() => handleRemove(gift.desc)}>
              <img alt="remove element" className="w-full" src={removeIcon} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
