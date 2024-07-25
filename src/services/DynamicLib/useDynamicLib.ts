'use client';

import { useState, useEffect } from 'react';

const useDynamicLib = <T>(libPromise: Promise<T>, init: T | undefined = undefined) => {
  const [lib, setLib] = useState<T | undefined>(init);
  useEffect(() => {
    const run = async () => {
      setLib(await libPromise);
    };
    run();
  }, [libPromise]);
  return lib;
};

export default useDynamicLib;
