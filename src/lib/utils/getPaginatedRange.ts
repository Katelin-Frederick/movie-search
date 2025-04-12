const getPaginatedRange = (current: number, total: number): (number | 'dots')[] => {
  const delta = 2
  const range: (number | 'dots')[] = []

  range.push(1)

  const left = Math.max(2, current - delta)
  const right = Math.min(total - 1, current + delta)

  if (left > 2) range.push('dots')

  for (let i = left; i <= right; i++) {
    if (!range.includes(i)) {
      range.push(i)
    }
  }

  if (right < total - 1) range.push('dots')

  if (total > 1 && !range.includes(total)) {
    range.push(total)
  }

  return range
}

export default getPaginatedRange