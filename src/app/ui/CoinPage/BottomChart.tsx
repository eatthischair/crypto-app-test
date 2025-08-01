'use client';
import { LineChart } from './LineChart';
import { useState, useEffect } from 'react';
import { RadioGroupForChart } from './RadioGroupForChart';
import { changeChartTimeline } from './changeChartTimeline';

export const BottomChart = ({ allPrices }) => {
  const [prices, setPrices] = useState(allPrices);
  const [radioSelect, setRadioSelect] = useState(3);

  useEffect(() => {
    setPrices(changeChartTimeline(allPrices, radioSelect));
  }, [radioSelect, allPrices]);

  return (
    <>
      <RadioGroupForChart setRadioSelect={setRadioSelect} />
      <LineChart prices={prices} />
    </>
  );
};
