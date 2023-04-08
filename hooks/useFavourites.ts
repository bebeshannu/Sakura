import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import { divide } from 'lodash';

const usefavourites = ()=>{
const {data, error , isLoading ,mutate} = useSWR('/api/favourites', fetcher, {
  revalidateIfStale:false,
  revalidateOnFocus:false,
  revalidateOnReconnect:false,
});
return {data, error, isLoading, mutate}


};

export default usefavourites;