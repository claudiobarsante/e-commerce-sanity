import { useState } from 'react';

export default function useProductQty() {
  const [qty, setQty] = useState<number>(1);

  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decreaseQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 0;

      return prevQty - 1;
    });
  };

  return { qty, increaseQty, decreaseQty };
}
