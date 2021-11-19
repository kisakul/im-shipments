import { hideLoadingIndicator, showLoadingIndicator } from '@/store/actions';

/**
 * Allows to wrap a function so that application's main loading indicator is displayed
 * while the function is being executed.
 * @returns Wrapping function.
 */
export function useLoadingIndicator() {
  return {
    /**
     * Wraps given function and enables visibility of application's main loading indicator
     * while the function is being executed.
     * @param handler Handler function.
     */
    async wrap(handler: () => Promise<void>) {
      showLoadingIndicator();

      await handler();

      hideLoadingIndicator();
    },
  };
}
