/**
 * Returns a debounced version of the provided function.
 *
 * @param {function} callback - The function to debounce.
 * @param {number} delay - The delay in milliseconds.
 * @return {(...args: any[]) => void} - The debounced function.
 */
const useDebouncedNavigate = (callback: (...args: any[]) => void, delay: number) => {
    let timeout: NodeJS.Timeout;

    return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            callback(...args);
        }, delay);
    };
};

export default useDebouncedNavigate;
