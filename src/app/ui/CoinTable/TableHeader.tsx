export const TableHeader = () => {
  return (
    <div className="grid grid-cols-[5%_20%_10%_5%_5%_5%_12%_12%_15%] gap-4 m-4">
      <div>#</div>
      <div>Name</div>
      <div>Price</div>
      <div>1h%</div>
      <div>24%</div>
      <div>7d%</div>
      <div>24h Volume/Market Cap</div>
      <div>Circulating/Total Supply</div>
      <div>Last 7d</div>
    </div>
  );
};
