import { useState } from "react";

import { GiftInput } from "./GiftInput";
import { GiftList } from "./GiftList";

export type Regalo = {
  id: number;
  desc: string;
  cant: number;
};

export const GiftContainer = () => {
  const [regalos, setRegalos] = useState<Regalo[]>([
    {
      id: 0,
      desc: "Fernet",
      cant: 1,
    },
    {
      id: 1,
      desc: "Notebook",
      cant: 1,
    },
    {
      id: 2,
      desc: "Aire acondicionado",
      cant: 1,
    },
  ]);

  return (
    <div className="flex flex-col gap-6">
      <GiftList regalos={regalos} setRegalos={setRegalos} />
      <GiftInput setRegalos={setRegalos} />
    </div>
  );
};
