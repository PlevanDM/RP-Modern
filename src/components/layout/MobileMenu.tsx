"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";
import { Button } from "../ui/button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  headerHeight?: number;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  children,
  headerHeight = 80,
}) => {

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - повний екран */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] md:hidden"
            onClick={onClose}
          />

          {/* Menu Panel - повний екран з прозорою верхньою частиною для header */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 right-0 bottom-0 z-[201] md:hidden flex flex-col bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-hidden"
            style={{ paddingTop: `${headerHeight}px` }}
          >
            {/* Закрити кнопка */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-10 p-4 bg-white rounded-full shadow-xl hover:bg-gray-100 active:bg-gray-200 transition-all min-h-[56px] min-w-[56px] flex items-center justify-center border-2 border-gray-200"
              aria-label="Close menu"
            >
              <X className="h-7 w-7 text-gray-700" />
            </button>

            {/* Контент меню */}
            <div className="flex-1 overflow-y-auto pb-8 px-5">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

interface MobileMenuButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
  onClick,
  isOpen,
}) => {
  return (
    <Button
      variant="outline"
      size="icon"
      className="md:hidden h-10 w-10 sm:h-10 sm:w-10 rounded-lg bg-white shadow-sm border border-gray-300 hover:bg-gray-50 active:bg-gray-100 transition-all shrink-0"
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      {isOpen ? (
        <X className="h-5 w-5 text-gray-800" />
      ) : (
        <Menu className="h-5 w-5 text-gray-800" />
      )}
    </Button>
  );
};

