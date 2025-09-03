export const CompareButtonSkeleton = () => {
  return (
    <div className="grid grid-cols-2 my-2 h-full py-2">
      {/* Left side - Text skeleton */}
      <div className="p-0 mt-2 pt-4 flex items-end mb-0 pb-0">
        <div className="h-3 sm:h-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse w-48"></div>
      </div>

      {/* Right side - Button skeleton */}
      <div className="sm:p-3 bg-gray-200 dark:bg-gray-700 flex items-center gap-1 rounded-xs justify-self-end h-full w-[12em] max-h-[5vh]">
        <div className="w-4 h-4 bg-gray-400 dark:bg-gray-500 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-400 dark:bg-gray-500 rounded animate-pulse w-16"></div>
      </div>
    </div>
  );
};
