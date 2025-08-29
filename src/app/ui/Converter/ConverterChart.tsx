'use client';

const ConverterChartContainer = ({}) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return (
    // <Card className="p-4 lg:p-6 xl:p-8 dark:text-white font-light md:rounded-lg lg:rounded-xl xl:rounded-2xl">
    //   <p className="md:text-lg lg:text-xl">
    //     {fromCurrency.coin.name} ({fromCurrency.coin.symbol.toUpperCase()}) to{" "}
    //     {toCurrency.coin.name} ({toCurrency.coin.symbol.toUpperCase()})
    //   </p>
    //   {fromCurrencyHistoricalData && toCurrencyHistoricalData ? <ConverterChart
    //     title={
    //       fromCurrency.coin.symbol.toUpperCase() +
    //       " to " +
    //       toCurrency.coin.symbol.toUpperCase()
    //     }
    //     fromCurrencyData={fromCurrencyHistoricalData}
    //     toCurrencyData={toCurrencyHistoricalData}
    //   /> : ''}
    <div className="grid grid-cols-12 text-xs md:text-sm gap-1 p-1">
      {monthOrder.map((month) => (
        <p key={months[month]} className="text-center">
          {months[month]}
        </p>
      ))}
    </div>
    // </Card>
  );
};

export default ConverterChartContainer;
