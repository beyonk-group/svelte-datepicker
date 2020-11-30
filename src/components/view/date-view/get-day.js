
function getDay (months, m, d, y) {
  const theMonth = months.find(aMonth => aMonth.month === m && aMonth.year === y)
  if (!theMonth) return null
  for (let i = 0; i < theMonth.weeks.length; i += 1) {
    for (let j = 0; j < theMonth.weeks[i].days.length; j += 1) {
      const aDay = theMonth.weeks[i].days[j]
      if (aDay.month === m && aDay.day === d && aDay.year === y) return aDay
    }
  }
  return null
}

export {
  getDay
}
