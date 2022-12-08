import React, { type FC } from "react";

import removeIcon from "../assets/dustbin.png";

import { Gift } from "./GiftContainer";

type props = {
  gifts: Gift[];
  handleRemove: (_: string) => void;
};

export const GiftList: FC<props> = ({ gifts, handleRemove }) => {
  return (
    <ul className="font-comforta flex flex-col gap-3">
      {gifts.map((gift, index) => (
        <li key={index} className="text-white font-normal text-lg">
          <div className="bg-primary-green rounded-sm py-2 px-1 flex items-center justify-between gap-2">
            <p className="overflow-hidden">
              <span className="text-primary-gold">☀</span> {gift.desc} ×
              {gift.amount}
            </p>
            <button className="w-5 h-5" onClick={() => handleRemove(gift.desc)}>
              <img alt="remove element" className="w-full" src={removeIcon} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
