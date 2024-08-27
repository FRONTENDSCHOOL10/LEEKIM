type ThrottleCallback = (...args: any[]) => void;

/** @type {(callback: () => void, timeout: number) => (...args: any[]) => void} */
export function throttle(callback: ThrottleCallback, timeout = 300): ThrottleCallback {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args) => {
    if (!timer) {
      timer = setTimeout(() => {
        callback.apply(null, args);
        timer = null;
      }, timeout);
    }
  };
}
