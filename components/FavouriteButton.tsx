import axios from "axios";
import React, {useCallback, useMemo} from "react";



import { AiOutlinePlus , AiOutlineCheck} from "react-icons/ai";

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavourites from "@/hooks/useFavourites";

interface FavouriteButtonProps{
    movieId: string;

}

const FavouriteButton : React.FC<FavouriteButtonProps> =({movieId}) =>{
    const{ mutate: mutateFavourites}= useFavourites();
    const { data : CurrentUser, mutate } = useCurrentUser();

    const isFavourite =useMemo(() =>{

        const list = CurrentUser?.favouriteIds || [];
        return list.includes(movieId);

    },[CurrentUser, movieId]);

const toggleFavourites = useCallback(async() =>{
let response;
    if(isFavourite){
        response = await axios.delete('/api/favourite',{data: {movieId}});
    }else{
        response = await axios.post('/api/favourite',{movieId});
    }

    const updatedFavouriteIds = response?.data?.favouriteIds;
    mutate({
        ...CurrentUser,
        favouriteIds: updatedFavouriteIds
    });
    mutateFavourites();

},[movieId,isFavourite,CurrentUser,mutate,mutateFavourites]);
const Icon =isFavourite ? AiOutlineCheck : AiOutlinePlus;
return(
<div onClick={toggleFavourites}
 className="cursor-pointer group/item w-6 h-6 lg:w-6 lg:h-6 border-white border-2 rounded-full flex justify-center items-center
transition hover:border-neutral-300  ">
<Icon className="text-white size={25}"/>
</div>
)

}

export default FavouriteButton;