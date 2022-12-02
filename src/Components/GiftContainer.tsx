import { useState } from "react";

import { GiftInput } from "./GiftInput";
import { GiftList } from "./GiftList";

// type Regalo = {
//   id?: number;
//   desc: string;
// };

export const GiftContainer = () => {
  const [regalos, setRegalos] = useState<string[]>([
    "Fernet",
    "Notebook",
    "Aire acondicionado",
  ]);

  return (
    <div className="flex flex-col gap-4">
      <GiftList regalos={regalos} />
      <GiftInput setRegalos={setRegalos} />
    </div>
  );
};
