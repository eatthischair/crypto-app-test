'use client';
import { useState } from 'react';
import { FaCopy } from 'react-icons/fa';
import { Tooltip, TooltipProvider } from '@/components/ui/tooltip';

export const CopyButton = ({ textToCopy }) => {
  const [open, setOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setOpen(true);
      setTimeout(() => setOpen(false), 1000);
    });
  };

  return (
    <TooltipProvider>
      <div className="relative ">
        <Tooltip open={open} onOpenChange={setOpen}>
          <button
            onClick={handleCopy}
            className="p-1 focus:outline-none"
            aria-label="Copy to clipboard"
          >
            <FaCopy />
          </button>
          {open && (
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-2 py-1 rounded z-50">
              <div>Copied!</div>
            </div>
          )}
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};
