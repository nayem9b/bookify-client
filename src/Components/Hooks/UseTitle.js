import { useEffect } from 'react';

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} - Bookify`;
  }, [title]);
};

export default useTitle;
