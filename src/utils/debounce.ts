type DebounceCallback = (...args: unknown[]) => void;

export function debounce(callback: DebounceCallback, timeout = 300): DebounceCallback {
  let cleanup: ReturnType<typeof setTimeout>;
  return (...args: unknown[]) => {
    clearTimeout(cleanup);
    cleanup = setTimeout(callback.bind(null, ...args), timeout);
  };
}
