type DebounceCallback = (...args: any[]) => void;

/**@type {(callback: () => void, timeout: number) => (...args: any[]) => void} */
export function debounce(callback: DebounceCallback, timeout = 300): DebounceCallback {
  let cleanup: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(cleanup);
    cleanup = setTimeout(callback.bind(null, ...args), timeout);
  };
}
