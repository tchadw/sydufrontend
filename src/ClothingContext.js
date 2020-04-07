import React, { useState, createContext } from "react";
import { useLocalState } from "./LocalStorageHook";

export const ClothingContext = createContext();

export const ClothingProvider = props => {
  const [topSelected, setTop] = useLocalState("topSelected");
  const [bottomSelected, setBottom] = useLocalState("topBottom");
  return (
    <ClothingContext.Provider
      value={([topSelected, setTop], [bottomSelected, setBottom])}
    >
      {props.children}
    </ClothingContext.Provider>
  );
};
