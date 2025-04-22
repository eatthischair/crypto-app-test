export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center">
      <svg
        className="flex justify-center mr-3 size-7 border-4 border-t-[var(--ring)] border-[var(--foreground) rounded-full animate-[spin_1s_linear_infinite] animate-infinite"
        viewBox="0 0 24 24"
      ></svg>
    </div>
  );
};
