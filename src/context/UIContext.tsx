"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ServiceData {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string;
  price?: string;
}

interface UIContextType {
  isBottomSheetOpen: boolean;
  bottomSheetContent: ServiceData | null;
  openBottomSheet: (content: ServiceData) => void;
  closeBottomSheet: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [bottomSheetContent, setBottomSheetContent] = useState<ServiceData | null>(null);

  const openBottomSheet = (content: ServiceData) => {
    setBottomSheetContent(content);
    setIsBottomSheetOpen(true);
  };

  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
    setTimeout(() => setBottomSheetContent(null), 300);
  };

  return (
    <UIContext.Provider
      value={{
        isBottomSheetOpen,
        bottomSheetContent,
        openBottomSheet,
        closeBottomSheet,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
}

