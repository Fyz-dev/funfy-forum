import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const useAsyncList = <T,>({
  load,
}: {
  load: (filterText?: string) => Promise<T[]>;
}): {
  data: T[];
  filterText: string | undefined;
  isLoading: boolean;
  setFilterText: Dispatch<SetStateAction<string | undefined>>;
} => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filterText, setFilterText] = useState<string | undefined>(undefined);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const data = await load(filterText);
        setData(data);
      } catch (error) {
        console.log('useAsyncList error: ' + error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [filterText]);

  return { data, filterText, isLoading, setFilterText };
};

export default useAsyncList;
