import { FC } from "react";

import { Gift } from "./GiftContainer";
import { PrevItem } from "./PrevItem";

type props = {
  gifts: Gift[];
};

const Previsualize: FC<props> = ({ gifts }) => {
  return (
    <div className="flex flex-col gap-2 px-12 py-5 text-white">
      <h2 className="text-4xl font-nerko text-white underline">Comprar:</h2>
      <ul className="flex flex-col gap-3">
        {gifts.map((gift) => (
          <PrevItem key={gift.id} gift={gift} />
        ))}
      </ul>
    </div>
  );
};

export default Previsualize;
