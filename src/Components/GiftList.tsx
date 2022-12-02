import { type FC } from "react";

type props = {
  regalos: string[];
};

export const GiftList: FC<props> = ({ regalos }) => {
  return (
    <ul className="font-comforta">
      {regalos.map((regalo, index) => (
        <li key={index} className="text-white font-normal text-lg">
          <span className="text-primary-gold">☀</span> {regalo}
        </li>
      ))}
    </ul>
  );
};
