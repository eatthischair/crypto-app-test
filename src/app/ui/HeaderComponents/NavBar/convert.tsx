export const convert = (usdPrice, newCurrencyObj, usdObj) => {
  const ratio = newCurrencyObj.value / usdObj.value;

  return {
    currentPrice: usdPrice * ratio,
    unit: newCurrencyObj.unit,
  };
};
