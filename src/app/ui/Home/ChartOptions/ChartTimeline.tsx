import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

export const ChartTimeline = ({
  setChartTimeline,
  days,
  setChartTimelineForSecondChart,
  compareToggled,
}) => {
  const timelineArr = ['1D', '7D', '14D', '1M', '3M', '1Y'];
  const timelineInDays = [1, 7, 14, 30, 90, 365];

  const { theme } = useTheme();

  let selectedClassName =
    theme === 'dark'
      ? 'bg-gradient-to-b from-indigo-700 to-indigo-800'
      : 'bg-gradient-to-b from-indigo-400 to-indigo-500';
  selectedClassName += 'shadow-indigo-900 shadow-[0_0_1px] border';

  const toggleState = (days) => {
    if (compareToggled) {
      setChartTimelineForSecondChart(days);
      setChartTimeline(days);
    } else {
      setChartTimeline(days);
    }
  };

  return (
    <div className="w-full py-1 sm:w-auto bg-muted-foreground px-1 sm:px-2 rounded-[5px] mb-4 sm:mb-12 sm:mt-4 flex sm:block gap-1 sm:gap-0">
      {timelineArr.map((option, index) => (
        <Button
          key={option}
          className={`cursor-pointer flex-1 sm:flex-grow sm:min-w-auto min-w-0 rounded-sm bg-opacity-0
             hover:bg-inherit
             hover:text-indigo-400
              dark:hover:text-indigo-400
              px-2 py-4 sm:m-1 sm:p-6 text-indigo-900 dark:text-indigo-100 text-sm sm:text-md ${
                days == timelineInDays[index]
                  ? 'bg-gradient-to-b from-indigo-700 to-indigo-800 shadow-indigo-500 shadow-[0_0_1px] border text-indigo-100 hover:text-white dark:hover:text-white'
                  : ''
              }`}
          onClick={() => toggleState(timelineInDays[index])}
        >
          {option}
        </Button>
      ))}
    </div>
  );
};
