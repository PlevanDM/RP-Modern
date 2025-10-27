import { X } from 'lucide-react';
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
  wrapperClassName?: string;
}

export function Modal({ isOpen, onClose, title, children, className = '', wrapperClassName = '' }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-x-hidden ${wrapperClassName}`}>
      <div className={`bg-white rounded-lg p-6 max-w-md w-full mx-4 ${className}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
