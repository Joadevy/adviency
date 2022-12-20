import { FC, ReactNode } from "react";

import closeBtn from "../assets/closeBtn.png";

type props = {
  isModalOpen: boolean;
  toggleModal: (_: boolean) => void;
  children: ReactNode;
};

export const GiftModal: FC<props> = ({
  isModalOpen,
  toggleModal,
  children,
}) => {
  return (
    <dialog
      className="bg-primary-green-dark pt-5 border-2 border-primary-purple absolute w-80 xl:w-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      open={isModalOpen}
      onClose={() => toggleModal(false)}
    >
      {children}
      <button
        className="text-white absolute bottom-2 left-2 border-2 border-white hover:border-primary-purple h-8 w-8 rounded-full hover:bg-primary-green  transition-colors"
        onClick={() => toggleModal(false)}
      >
        <img alt="" className="w-full h-full" src={closeBtn} />
      </button>
    </dialog>
  );
};
