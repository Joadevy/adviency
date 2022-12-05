import React, { Dispatch, type FC } from "react";

import removeIcon from "../assets/dustbin.png";

import { Regalo } from "./GiftContainer";

type props = {
  regalos: Regalo[];
  handleRemove: (_: number) => void;
};

export const GiftList: FC<props> = ({ regalos, handleRemove }) => {
  return (
    <ul className="font-comforta flex flex-col gap-3">
      {regalos.map((regalo, index) => (
        <li key={index} className="text-white font-normal text-lg">
          <div className="bg-primary-green rounded-sm py-2 px-1 flex items-center justify-between gap-2">
            <p>
              <span className="text-primary-gold">☀</span> {regalo.desc}
            </p>
            <button className="w-5 h-5" onClick={() => handleRemove(regalo.id)}>
              <img alt="remove element" className="w-full" src={removeIcon} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};
