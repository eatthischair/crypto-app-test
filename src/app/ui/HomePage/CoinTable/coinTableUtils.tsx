export const convertStateToURLParams = (toggleState) => {
  const sortOptions = ['name', 'price', '1h', '24h', '7d'];
  for (let i = 0; i < toggleState.length; i++) {
    const current = toggleState[i];
    if (current !== null) {
      if (current === true) {
        return { sort: sortOptions[i], sortBy: 'asc' };
      } else {
        return { sort: sortOptions[i], sortBy: 'desc' };
      }
    }
  }
};

export const convertURLParamsToState = (sort, sortBy) => {
  if (sort === null && sortBy === null) {
    return Array(5).fill(null);
  }
  const sortOptions = ['name', 'price', '1h', '24h', '7d'];
  const index = sortOptions.indexOf(sort);
  const boolean = sortBy === 'asc' ? true : false;
  const toggleState = Array(sortOptions.length).fill(null);
  toggleState[index] = boolean;
  return toggleState;
};

export const sortCoins = (coins, toggleState) => {
  const sortedAz = coins.toSorted(function (a, b) {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  });

  if (toggleState[0] === true) {
    return sortedAz;
  }
  const sortedZa = coins.toSorted(function (a, b) {
    if (a.id < b.id) {
      return 1;
    }
    if (a.id > b.id) {
      return -1;
    }
    return 0;
  });

  if (toggleState[0] === false) {
    return sortedZa;
  }

  const sortedPriceAscending = coins.toSorted(function (a, b) {
    if (a.current_price < b.current_price) {
      return -1;
    }
    if (a.current_price > b.current_price) {
      return 1;
    }
    return 0;
  });

  if (toggleState[1] === true) {
    return sortedPriceAscending;
  }

  const sortedPriceDescending = coins.toSorted(function (a, b) {
    if (a.current_price < b.current_price) {
      return 1;
    }
    if (a.current_price > b.current_price) {
      return -1;
    }
    return 0;
  });

  if (toggleState[1] === false) {
    return sortedPriceDescending;
  }

  const sorted1hAsc = coins.toSorted(function (a, b) {
    if (
      a.price_change_percentage_1h_in_currency <
      b.price_change_percentage_1h_in_currency
    ) {
      return -1;
    }
    if (
      a.price_change_percentage_1h_in_currency >
      b.price_change_percentage_1h_in_currency
    ) {
      return 1;
    }
    return 0;
  });

  if (toggleState[2] === true) {
    return sorted1hAsc;
  }

  const sorted1hDesc = coins.toSorted(function (a, b) {
    if (
      a.price_change_percentage_1h_in_currency <
      b.price_change_percentage_1h_in_currency
    ) {
      return 1;
    }
    if (
      a.price_change_percentage_1h_in_currency >
      b.price_change_percentage_1h_in_currency
    ) {
      return -1;
    }
    return 0;
  });

  if (toggleState[2] === false) {
    return sorted1hDesc;
  }

  const sorted24hAsc = coins.toSorted(function (a, b) {
    if (a.price_change_percentage_24h < b.price_change_percentage_24h) {
      return -1;
    }
    if (a.price_change_percentage_24h > b.price_change_percentage_24h) {
      return 1;
    }
    return 0;
  });

  if (toggleState[3] === true) {
    return sorted24hAsc;
  }

  const sorted24hDesc = coins.toSorted(function (a, b) {
    if (a.price_change_percentage_24h < b.price_change_percentage_24h) {
      return 1;
    }
    if (a.price_change_percentage_24h > b.price_change_percentage_24h) {
      return -1;
    }
    return 0;
  });

  if (toggleState[3] === false) {
    return sorted24hDesc;
  }

  const sorted7dAsc = coins.toSorted(function (a, b) {
    if (
      a.price_change_percentage_7d_in_currency <
      b.price_change_percentage_7d_in_currency
    ) {
      return -1;
    }
    if (
      a.price_change_percentage_7d_in_currency >
      b.price_change_percentage_7d_in_currency
    ) {
      return 1;
    }
    return 0;
  });

  if (toggleState[4] === true) {
    return sorted7dAsc;
  }

  const sorted7dDesc = coins.toSorted(function (a, b) {
    if (
      a.price_change_percentage_7d_in_currency <
      b.price_change_percentage_7d_in_currency
    ) {
      return 1;
    }
    if (
      a.price_change_percentage_7d_in_currency >
      b.price_change_percentage_7d_in_currency
    ) {
      return -1;
    }
    return 0;
  });

  if (toggleState[4] === false) {
    return sorted7dDesc;
  }
  return coins;
};
