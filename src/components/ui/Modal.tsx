import React from 'react';
import { colors, spacing } from './DesignSystem';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      zIndex: 10,
      inset: 0,
      overflowY: 'auto',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: `${spacing.xs} ${spacing.xs} ${spacing.xl} ${spacing.xs}`,
        textAlign: 'center',
      }}>
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: colors.secondary,
          opacity: 0.75,
        }} aria-hidden="true"></div>
        <span style={{
          display: 'none',
        }} aria-hidden="true">&#8203;</span>
        <div style={{
          display: 'inline-block',
          verticalAlign: 'bottom',
          backgroundColor: colors.surface,
          borderRadius: '0.5rem',
          textAlign: 'left',
          overflow: 'hidden',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          transform: 'translate(0, 0)',
          transition: 'all 0.3s ease-out',
          margin: '2rem 0',
          maxWidth: '50vw',
          width: '100%',
        }}>
          <div style={{
            backgroundColor: colors.surface,
            padding: `${spacing.lg} ${spacing.xl}`,
          }}>
            {children}
          </div>
          <div style={{
            backgroundColor: colors.background,
            padding: `${spacing.md} ${spacing.lg}`,
            textAlign: 'right',
          }}>
            <button
              onClick={onClose}
              type="button"
              style={{
                display: 'inline-flex',
                justifyContent: 'center',
                borderRadius: '0.375rem',
                border: '1px solid transparent',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                padding: `${spacing.sm} ${spacing.md}`,
                backgroundColor: colors.primary,
                fontSize: '1rem',
                fontWeight: '500',
                color: 'white',
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
