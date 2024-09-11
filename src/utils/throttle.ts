type ThrottleCallback = (...args: unknown[]) => void;

export function throttle(callback: ThrottleCallback, timeout = 300): ThrottleCallback {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return (...args: unknown[]) => {
    if (!timer) {
      timer = setTimeout(() => {
        callback(...args);
        timer = null;
      }, timeout);
    }
  };
}
