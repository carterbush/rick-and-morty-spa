const debounce = <T>(fn: (...args: any[]) => T, timeout = 200) => {
  let timerId: number

  return (...args: any[]) => {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      fn.apply(this, args)
    }, timeout)
  }
}

export default debounce
