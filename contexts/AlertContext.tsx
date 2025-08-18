import { CustomAlert } from '@/components/ui/CustomAlert';
import React, { createContext, useContext, useState } from 'react';

type AlertContextType = {
  showAlert: (title: string, message: string, onClose?: () => void) => void;
  hideAlert: () => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [customOnClose, setCustomOnClose] = useState<(() => void) | undefined>(undefined);

  const showAlert = (title: string, message: string, onClose?: () => void) => {
    setTitle(title);
    setMessage(message);
    setCustomOnClose(onClose);
    setVisible(true);
  };

  const hideAlert = () => {
    setVisible(false);
    if (customOnClose) {
      customOnClose();
      setCustomOnClose(undefined);
    }
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      <CustomAlert
        visible={visible}
        title={title}
        message={message}
        onClose={hideAlert}
      />
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  
  return context;
} 