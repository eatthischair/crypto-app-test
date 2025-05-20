import exchangeRates from '../../../../data/exchangeRates.json';

export const convert = (usdPrice, newCurrency) => {
  const ratio =
    exchangeRates.rates[newCurrency].value / exchangeRates.rates.usd.value;

  return {
    currentPrice: usdPrice * ratio,
    unit: exchangeRates.rates[newCurrency].unit,
  };
};
