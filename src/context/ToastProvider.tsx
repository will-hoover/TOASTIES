"use client";
import { Toast } from "@/utilities/types";
import { useEffect, useState } from "react";
import { ToastContext } from "./ToastContext";

interface ToastProviderProps {
  children: React.ReactNode;
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    const t = sessionStorage.getItem("toast");
    if (t) setToast(JSON.parse(t));
  }, []);

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
