// src/context/ToastContext.tsx
"use client";

import { createContext, useContext, useRef } from "react";
import { Toast } from "primereact/toast";
import type { ToastMessage } from "primereact/toast";

type ToastContextType = {
    showToast: (options: ToastMessage) => void;
    showSuccess: (summary: string, detail?: string, life?: number) => void;
    showError: (summary: string, detail?: string, life?: number) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const toastRef = useRef<Toast>(null);

    const showToast = (options: ToastMessage) => {
        toastRef.current?.show(options);
    };

    const showSuccess = (summary: string, detail?: string, life = 3000) => {
        showToast({ severity: "success", summary, detail, life });
    };

    const showError = (summary: string, detail?: string, life = 3000) => {
        showToast({ severity: "error", summary, detail, life });
    };

    return (
        <ToastContext.Provider value={{ showToast, showSuccess, showError }}>
            <Toast ref={toastRef} />
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within ToastProvider");
    }
    return context;
};
