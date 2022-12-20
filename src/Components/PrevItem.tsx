import { FC } from "react";

import { Gift } from "./GiftContainer";
import { isImage } from "./GiftList";

type props = {
  gift: Gift;
};

export const PrevItem: FC<props> = ({ gift }) => {
  return (
    <li className="flex gap-2 items-center bg-primary-green p-2 rounded-md">
      {" "}
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
      <div>
        <div className="flex flex-col">
          <p className="overflow-hidden text-md">
            {gift.desc}
            <span className="text-primary-gold ml-2">×{gift.amount}</span>
          </p>
          <p className="overflow-hidden ">
            ↪ para:
            <span className="text-primary-purple "> {gift.recipient}</span>
          </p>
        </div>
      </div>
    </li>
  );
};
