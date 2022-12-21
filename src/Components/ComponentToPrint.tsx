import React from "react";

import { Gift } from "./GiftContainer";
import { PrevItem } from "./PrevItem";

type props = {
  gifts: Gift[];
};

class ComponentToPrint extends React.Component<props> {
  render() {
    return (
      <div>
        <h2 className="text-4xl font-nerko text-white underline">Comprar:</h2>
        <ul className="flex flex-col gap-2">
          {this.props.gifts.map((gift) => (
            <PrevItem key={gift.id} gift={gift} />
          ))}
        </ul>
      </div>
    );
  }
}

export default ComponentToPrint;
