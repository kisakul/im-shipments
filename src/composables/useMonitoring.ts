/**
 * Allows to trigger a periodic execution of given function with given interval.
 *
 * @param handler Function which will be triggered with given interval.
 * @param interval Interval (in milliseconds) between function executions
 */
export function useMonitoring(handler: () => Promise<void>, interval: number) {
  let intervalId: number;

  /**
   * Starts periodic execution of the handler function.
   * @param immediate If true, the function will be invoked immediately, even before starting
   * the timer.
   */
  async function start(immediate?: boolean) {
    if (immediate) {
      await handler();
    }

    intervalId = +setInterval(async () => {
      await handler();
    }, interval);
  }

  /**
   * Stops periodic execution of the handler function
   */
  function stop() {
    clearInterval(intervalId);
  }

  return {
    start,

    stop,

    /**
     * Stops currently active periodic execution process. Invokes given handler and then resumes
     * the periodic execution process.
     * @param handler Handler function which will be invoked while periodic execution process
     * is stopped.
     * @param immediate If true, the original monitored function will be invoked immediately after
     * periodic execution is resumed.
   * the timer.
     */
    async wrap(
      handler: () => Promise<void>,
      immediate?: boolean
    ) {
      stop();

      await handler();

      start(immediate);
    },
  };
}
