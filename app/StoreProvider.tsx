"use client";

import React, { useRef } from "react";
import { Provider } from "react-redux";
import { store, AppStore } from "@/lib/store/store";


const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = store();
  }
  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
