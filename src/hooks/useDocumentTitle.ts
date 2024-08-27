import { useLayoutEffect } from 'react';

function useDocumentTitle(title) {
  useLayoutEffect(() => {
    document.title = title;
  }, [title]);
}

export default useDocumentTitle;
