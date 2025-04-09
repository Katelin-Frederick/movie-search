const formatRuntime = (runtime: number) => {
  const hours = Math.floor((runtime ?? 0) / 60)
  const remainingMinutes = (runtime ?? 0) % 60

  if (hours !== 0) {
    return `${hours}h ${remainingMinutes}m`
  }

  return `${remainingMinutes}m`
}

export default formatRuntime