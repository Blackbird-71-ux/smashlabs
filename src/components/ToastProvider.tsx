'use client';

import { ToastContainer } from '@/components/ui/Toast';

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}; 