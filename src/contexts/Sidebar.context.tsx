import { FC, ReactNode, createContext, useContext, useEffect, useState } from 'react';

type Props = {
  children: ReactNode;
};

type SideBarContextType = {
  isLargeOpen: boolean;
  isSmallOpen: boolean;
  toggle: () => void;
  close: () => void;
};

const SideBarContext = createContext<SideBarContextType | null>(null);

export const useSideBarContext = () => {
  const value = useContext(SideBarContext);
  if (value === null) throw new Error('cannot use side bar context');
  return value;
};

export const SideBarProvider: FC<Props> = ({ children }) => {
  const [isLargeOpen, setIsLargeOpen] = useState(true);
  const [isSmallOpen, setIsSmallOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (!isScreenSmall()) setIsSmallOpen(false);
    };

    window.addEventListener('resize', handler);

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

  const isScreenSmall = () => window.innerWidth < 1024;

  const toggle = () => {
    if (isScreenSmall()) {
      setIsSmallOpen((e) => !e);
    } else {
      setIsLargeOpen((e) => !e);
    }
  };

  const close = () => {
    if (isScreenSmall()) {
      setIsSmallOpen(false);
    } else {
      setIsLargeOpen(false);
    }
  };

  return (
    <SideBarContext.Provider value={{ isLargeOpen, isSmallOpen, toggle, close }}>{children}</SideBarContext.Provider>
  );
};
