export const changeChartTimeline = (allPrices, radioSelect) => {
  let unixTimeStampLowerEnd;
  const latestDateInUnix = allPrices.slice(-1)[0][0];
  const oneDay = 86400 * 1000;
  const sevenDays = 7 * oneDay;
  const thirtyDays = 30 * oneDay;
  const ninetyDays = 90 * oneDay;
  const oneYear = 365 * oneDay;
  const max = oneYear * 10;

  if (radioSelect === 1) {
    unixTimeStampLowerEnd = latestDateInUnix - oneDay;
  } else if (radioSelect === 2) {
    unixTimeStampLowerEnd = latestDateInUnix - sevenDays;
  } else if (radioSelect === 3) {
    unixTimeStampLowerEnd = latestDateInUnix - thirtyDays;
  } else if (radioSelect === 4) {
    unixTimeStampLowerEnd = latestDateInUnix - ninetyDays;
  } else if (radioSelect === 5) {
    unixTimeStampLowerEnd = latestDateInUnix - oneYear;
  } else if (radioSelect === 6) {
    unixTimeStampLowerEnd = latestDateInUnix - max;
  }

  for (let i = allPrices.length - 1; i >= 0; i--) {
    const timeStamp = allPrices[i][0];
    if (timeStamp <= unixTimeStampLowerEnd) {
      return allPrices.slice(i);
    }
  }
  return allPrices;
};
