import { useEffect, useState } from 'react';

const useColorMode = () => {
  const [colorMode, setColorMode] = useState(() => localStorage.getItem('color-theme') || 'light');;
    
  useEffect(() => {
    const className = 'dark';
    const bodyClass = window.document.body.classList;

    colorMode === 'dark'
      ? bodyClass.add(className)
      : bodyClass.remove(className);

      localStorage.setItem('color-theme', colorMode);
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;
