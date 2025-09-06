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
    <div className="bg-muted-foreground px-2  rounded-[5px] mb-12 mt-4">
      {timelineArr.map((option, index) => (
        <Button
          key={option}
          className={`cursor-pointer flex-grow rounded-sm bg-opacity-0 hover:bg-indigo-200/50 dark:hover:bg-indigo-600/20 m-1 p-6 text-indigo-900 dark:text-indigo-100 text-md ${
            days == timelineInDays[index]
              ? 'bg-gradient-to-b from-indigo-700 to-indigo-800 shadow-indigo-500 shadow-[0_0_1px] border text-indigo-100'
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
