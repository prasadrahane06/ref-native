import { useLayoutEffect, useEffect } from 'react';

const useIsomorphicLayoutEffect = () => {
  return typeof window !== 'undefined' ? useLayoutEffect : useEffect;
};

export default useIsomorphicLayoutEffect;
