export function isPromise(result: void | Promise<void>): result is Promise<void> {
  return typeof result === "object";
}

export function noop() {}
