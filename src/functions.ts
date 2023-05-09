export const countSalutes = (input: string): number => {
  const chars = input.split("");

  let walkingRight = 0;
  let salutes = 0;
  chars.forEach((char) => {
    if (char === ">") {
      walkingRight++;
    } else if (char === "<") {
      salutes += walkingRight;
    }
  });

  return salutes * 2;
};

export const validParens = (input: string): boolean => {
  const chars = input.split("");

  let openMinusClosed = 0;
  chars.forEach((char) => {
    if (char === "(") {
      openMinusClosed++;
    } else if (char === ")") {
      openMinusClosed--;
    }

    if (openMinusClosed < 0) {
      return false;
    }
  });

  return openMinusClosed === 0;
};

const changeOptions = (
  changeRequired: number,
  currencyValues: number[],
  changeChart: number[][][]
) => {
  if (changeChart[changeRequired] === undefined) {
    const result: number[][] = [];

    if (changeRequired === 0) {
      result.push([0]);
    } else if (changeRequired > 0) {
      currencyValues.forEach((currencyValue) => {
        changeOptions(
          changeRequired - currencyValue,
          currencyValues,
          changeChart
        ).forEach((changeMethod) => {
          if (changeMethod.length > 0) {
            result.push([...changeMethod, currencyValue]);
          }
        });
      });
    }

    changeChart[changeRequired] = result;
  }

  changeChart[changeRequired].filter((option) => {
    return option.length > 0;
  });

  return changeChart[changeRequired];
};

const simulateMovieTicketSalesTimeline = (
  ticketPrice: number,
  timeline: number[],
  currencyValues: number[]
) => {
  let changeDrawer: number[] = [];
  const changeChart: number[][][] = [];
  let timelineFailed = false;

  for (let index = 0; !timelineFailed && index < timeline.length; index++) {
    const customerPayment = timeline[index];

    const validMethodsForMakingChange = changeOptions(
      customerPayment - ticketPrice,
      currencyValues,
      changeChart
    );

    if (validMethodsForMakingChange.length === 0) {
      timelineFailed = true;
      break;
    }

    changeDrawer.push(customerPayment);

    validMethodsForMakingChange.sort((thisMethod, thatMethod) => {
      return thisMethod.length - thatMethod.length;
    });

    let gaveOutChange = false;
    for (
      let i = 0;
      !gaveOutChange && i < validMethodsForMakingChange.length;
      i++
    ) {
      const validMethodForMakingChange = validMethodsForMakingChange[i];

      const changeDrawerCopy = [...changeDrawer];
      for (
        let j = 0;
        !gaveOutChange && j < validMethodForMakingChange.length;
        j++
      ) {
        if (validMethodForMakingChange[j] !== 0) {
          const availableCurrencyIndex = changeDrawerCopy.indexOf(
            validMethodForMakingChange[j]
          );

          if (availableCurrencyIndex === -1) {
            break;
          } else {
            changeDrawerCopy.splice(availableCurrencyIndex, 1);
          }
        }

        if (j === validMethodForMakingChange.length - 1) {
          changeDrawer.length = 0;
          changeDrawer.push(...changeDrawerCopy);
          gaveOutChange = true;
        }
      }
    }

    if (!gaveOutChange) {
      timelineFailed = true;
    }
  }

  return !timelineFailed;
};

export const movieTicketSales = (
  ticketPrice: number,
  timline: number[]
): boolean => {
  const currencyValues: number[] = [];
  const currencyValueCounts: number[] = [];

  timline.forEach((customerPayment) => {
    const currencyValueCount = currencyValueCounts[customerPayment] ?? 0;
    currencyValueCounts[customerPayment] = currencyValueCount + 1;

    if (currencyValueCounts[customerPayment] === 1) {
      currencyValues.push(customerPayment);
    }
  });

  return simulateMovieTicketSalesTimeline(ticketPrice, timline, currencyValues);
};
