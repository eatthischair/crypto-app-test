import { Button } from '@/components/ui/button';

export const ChartTimeline = ({ setChartTimeline, days }) => {
  const timelineArr = ['1D', '7D', '14D', '1M', '3M', '1Y'];
  const timelineInDays = [1, 7, 14, 30, 90, 365];

  return (
    <>
      {timelineArr.map((option, index) => (
        <Button
          key={option}
          className={`flex-grow h-full rounded-sm bg-opacity-0 hover:bg-gradient-to-b from-indigo-700 to-indigo-800 mx-1 ${
            days == timelineInDays[index]
              ? 'bg-gradient-to-b from-indigo-700 to-indigo-800 text-white shadow-indigo-500 shadow-[0_0_1px] border'
              : ''
          }`}
          onClick={() => setChartTimeline(timelineInDays[index])}
        >
          {option}
        </Button>
      ))}
    </>
  );
};
