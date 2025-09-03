export const ChartTimelineSkeleton = () => {
  return (
    <div className="bg-gray-200 dark:bg-gray-700 p-1 rounded-xs">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="cursor-pointer flex-grow rounded-sm bg-gray-100 dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500 m-1 p-4 inline-block"
        >
          <div className="h-4 bg-gray-300 dark:bg-gray-500 rounded animate-pulse w-6 mx-auto"></div>
        </div>
      ))}
    </div>
  );
};
