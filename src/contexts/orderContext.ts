import { createContext } from "react";

export const OrderContext = createContext({
  isLoading: false,
  setIsLoading: (param: boolean) => {},
});

OrderContext.displayName = "OrderContext";
