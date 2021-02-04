function ensureFutureMonth (firstDate, secondDate) {
  const isSameMonthAsStart = secondDate.diff(firstDate, 'month') === 0
  return isSameMonthAsStart ? secondDate.add(1, 'month') : secondDate
}

export {
  ensureFutureMonth
}
