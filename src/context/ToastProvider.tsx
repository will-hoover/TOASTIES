"use client";
import { Toast } from "@/utilities/types";
import { useEffect, useState } from "react";
import { ToastContext } from "./ToastContext";
import { getLiveToast } from "@/utilities/toastiesActions";

interface ToastProviderProps {
  children: React.ReactNode;
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    const loadToast = async () => {
      const t = await getLiveToast();
      if (t) setToastContext(t);
    };
    const t = sessionStorage.getItem("toast");
    if (t) setToastContext(JSON.parse(t));
    else loadToast();
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
