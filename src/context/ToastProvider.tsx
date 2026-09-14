"use client";
import { Toast } from "@/utilities/types";
import { useState } from "react";
import { ToastContext } from "./ToastContext";

interface ToastProviderProps {
  children: React.ReactNode;
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  const id = sessionStorage.getItem("toast")
  const [toast, setToast] = useState<Toast | null>(id ? JSON.parse(id) : null);
  
  const setToastContext = (t: Toast | null) => {
    setToast(t);
    if (t) sessionStorage.setItem("toast", JSON.stringify(t));
    else sessionStorage.removeItem("toast");
  };

  return (
    <ToastContext.Provider
      value={{
        toast,
        setToast: setToastContext,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
