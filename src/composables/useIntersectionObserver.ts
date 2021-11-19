/**
 * A wrapper for IntersectionObserver API.
 *
 * @param enterViewportHandler Handler function which will be invoked when given element
 * starts to intersect with the viewport.
 * @returns Object which allows to observe intersections of given element with the viewport.
 */
export function useIntersectionObserver(enterViewportHandler: () => void) {
  let observer = new IntersectionObserver((entries) => {
    if (entries[0].intersectionRatio > 0 && entries[0].isIntersecting) {
      enterViewportHandler();
    }
  });

  return {
    /**
     * @see IntersectionObserver.observe
     * @param element Element which will be observed for intersections with the viewport.
     */
    observe(element: Element) {
      observer.observe(element);
    },

    /**
     * Disconnects the observer from monitoring any elements.
     */
    disconnect() {
      observer.disconnect();
    },
  };
}
