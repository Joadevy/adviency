import { FC, useRef } from "react";
import ReactToPrint from "react-to-print";

import { Gift } from "./GiftContainer";
import ComponentToPrint from "./ComponentToPrint";

type props = {
  gifts: Gift[];
};

const Previsualize: FC<props> = ({ gifts }) => {
  let componentRef: any = useRef();

  return (
    <div className="flex flex-col gap-4 px-12 py-5 text-white">
      <ComponentToPrint ref={(el) => (componentRef = el)} gifts={gifts} />
      <ReactToPrint
        content={() => componentRef}
        trigger={() => (
          <button
            className="cursor-pointer w-9/12 sm:w-1/2 xl:w-5/12 self-center text-white border-2  py-1 px-2 rounded-md hover:border-primary-purple hover:bg-primary-green transition-colors"
            onClick={() => {}}
          >
            Imprimir
          </button>
        )}
      />
    </div>
  );
};

export default Previsualize;
