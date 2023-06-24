import { useState, type FC } from "react";

import removeIcon from "../assets/dustbin.png";
import editIcon from "../assets/edit.png";
import duplicateIcon from "../assets/duplication.png";

import { Gift } from "./GiftContainer";
import { GiftInput } from "./GiftInput";
import { GiftModal } from "./GiftModal";

type props = {
  gifts: Gift[];
  handleRemove: (_: string) => void;
  editGift: (_: Gift) => void;
  addGift: (_: Gift) => void;
};

export function isImage(url: string) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

export const GiftList: FC<props> = ({
  gifts,
  handleRemove,
  editGift,
  addGift,
}) => {
  const [isEditModalOpen, toggleEditModal] = useState(false);
  const [editedGift, setEditedGift] = useState<Gift>();
  const [isDuplicateModalOpen, toggleDuplicateModal] = useState(false);
  const [duplicatedGift, setDuplicatedGift] = useState<Gift>();

  const handleEdit = (gift: Gift) => {
    toggleEditModal(true);
    setEditedGift(gift);
  };
  const handleDuplicate = (gift: Gift) => {
    toggleDuplicateModal(true);
    setDuplicatedGift(gift);
  };

  return (
    <div>
      <ul
        className={
          "font-comforta flex flex-col gap-3 -mt-5" +
          (isEditModalOpen || isDuplicateModalOpen ? " opacity-10" : "")
        }
      >
        {gifts.map((gift, index) => (
          <li key={index} className="text-white font-normal text-md">
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
                <div>
                  <div className="flex flex-col mb-1">
                    <p className="overflow-hidden text-md">
                      {gift.desc}
                      <span className="text-primary-gold ml-2">
                        ×{gift.amount}
                      </span>
                    </p>
                    <p className="overflow-hidden ">
                      <span className="hidden md:inline">↪</span> para:
                      <span className="text-primary-purple ">
                        {" "}
                        {gift.recipient}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-light text-gray-300">
                      Precio:{" "}
                      {(gift.unitPrice * gift.amount ?? 0).toLocaleString(
                        "es-AR",
                        { style: "currency", currency: "ARS" }
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 flex-col xs:flex-row">
                <button
                  className="w-5 h-5 hover:opacity-75 transition-opacity order-3 xs:order-1"
                  onClick={() => handleDuplicate(gift)}
                >
                  <img
                    alt="duplicate element"
                    className="w-full"
                    src={duplicateIcon}
                  />
                </button>
                <button
                  className="w-5 h-5 hover:opacity-75 transition-opacity order-2 xs:order-2"
                  onClick={() => handleEdit(gift)}
                >
                  <img alt="edit element" className="w-full" src={editIcon} />
                </button>
                <button
                  className="w-5 h-5 hover:opacity-75 transition-opacity order-1 xs:order-3"
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
      {isEditModalOpen && (
        <GiftModal isModalOpen={isEditModalOpen} toggleModal={toggleEditModal}>
          <GiftInput
            closeModal={toggleEditModal}
            editGift={editGift}
            toEdit={editedGift}
          />
        </GiftModal>
      )}
      {isDuplicateModalOpen && (
        <GiftModal
          isModalOpen={isDuplicateModalOpen}
          toggleModal={toggleDuplicateModal}
        >
          <GiftInput
            addGift={addGift}
            closeModal={toggleDuplicateModal}
            toDuplicate={duplicatedGift}
          />
        </GiftModal>
      )}
    </div>
  );
};
