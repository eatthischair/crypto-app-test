import { Button } from '@/components/ui/button';
import { ChartLine, X } from 'lucide-react';

export const CompareButton = ({ compareToggled, setCompareToggled }) => {
  const handleToggle = () => {};
  return (
    <div className="grid grid-cols-2 my-2 mx-6 h-full py-2 ">
      <a className="p-2 m-2 mt-2 pt-4 -ml-1 flex items-end font-xs text-gray-400 mb-0 pb-0">
        Select the currency to view statistics
      </a>
      <Button
        className="sm:p-3 bg-[var(--card)] flex items-center gap-1 text-[var(--foreground)] rounded-sm justify-self-end h-full w-[12em] max-h-[5vh] border"
        onClick={() => setCompareToggled(!compareToggled)}
      >
        {!compareToggled ? (
          <>
            <ChartLine size={16} /> Compare
          </>
        ) : (
          <>
            <X size={13} />
            Exit Compare
          </>
        )}
      </Button>
    </div>
  );
};
