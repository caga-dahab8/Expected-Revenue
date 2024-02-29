function calculateTotalTarget(startDateStr, endDateStr, annualRevenue) {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  const result = [];
  const resultWorkDaysTotal = [];
  const monthlyTargets = [];
  let totalWorkDays = 0;

  // Calculate days in each month
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      let daysInMonth = 0;
      const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
      for (let day = 1; day <= lastDayOfMonth; day++) {
          const currentDay = new Date(year, month, day);
          if (currentDay.getDay() !== 5) {
              daysInMonth++;
          }
      }
      result.push(daysInMonth);
      currentDate.setMonth(month + 1);
      currentDate.setDate(1);
  }

  // Calculate total work days excluding Fridays
  let numFridays = 0;
  const current = new Date(startDate);
  while (current <= endDate) {
      if (current.getDay() === 5) { // Friday is weekday 5
          numFridays++;
      }
      current.setDate(current.getDate() + 1);
  }
  const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
  const daysWorkedExcludingFridays = totalDays - numFridays;

  // Calculate monthly targets and total target
  let daysWorkedRemaining = daysWorkedExcludingFridays;
  for (let i = 0; i < result.length; i++) {
      const availableDays = Math.min(result[i], daysWorkedRemaining);
      resultWorkDaysTotal.push(availableDays);
      totalWorkDays += availableDays;
      daysWorkedRemaining -= availableDays;
      monthlyTargets.push((annualRevenue / 12) / result[i] * availableDays);
  }

  // Round the last month's work days and calculate total target
  resultWorkDaysTotal[resultWorkDaysTotal.length - 1] = Math.round(resultWorkDaysTotal[resultWorkDaysTotal.length - 1]);
  let totalTarget = 0;
  for (let i = 0; i < monthlyTargets.length; i++) {
      totalTarget += monthlyTargets[i];
  }

  return {
      daysExcludingFridays: result,
      daysWorkedExcludingFridays: resultWorkDaysTotal,
      monthlyTargets: monthlyTargets,
      totalTarget: totalTarget
  };
}

// Example usage
console.log(calculateTotalTarget('2024-01-01', '2024-01-06', 5220));