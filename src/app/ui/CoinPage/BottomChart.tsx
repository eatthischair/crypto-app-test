'use client';
import { LineChart } from './LineChart';
import { useState, useEffect } from 'react';
import { RadioGroupForChart } from './RadioGroupForChart';
import pricesData from '../../data/prices.json';
import { changeChartTimeline } from './changeChartTimeline';

export const BottomChart = () => {
  const allPrices = pricesData.prices;
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
