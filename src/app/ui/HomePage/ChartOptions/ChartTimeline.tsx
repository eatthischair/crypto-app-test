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
    <>
      {timelineArr.map((option, index) => (
        <Button
          key={option}
          className={`cursor-pointer flex-grow h-full text-[var(--foreground)] rounded-sm bg-opacity-0 hover:bg-indigo-200 dark:hover:bg-indigo-600 mx-1 ${
            days == timelineInDays[index]
              ? // ? 'bg-gradient-to-b from-indigo-700 to-indigo-800 shadow-indigo-500 shadow-[0_0_1px] border'
                selectedClassName
              : ''
          }`}
          onClick={() => toggleState(timelineInDays[index])}
        >
          {option}
        </Button>
      ))}
    </>
  );
};
