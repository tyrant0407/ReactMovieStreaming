export {removeMovie} from "../reducers/movieSlice";
import axios from "../../utils/AxiosApi";
import { loadMovie } from "../reducers/movieSlice";

export const asyncLoadMovie =  (id) => async (dispatch,getState)=>{
   try {
    const details = await axios.get(`/movie/${id}`);
    const externalid = await axios.get(`/movie/${id}/external_ids`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const watch_providers = await axios.get(`/movie/${id}/watch/providers`);
    let ultimatedetails ={
        details:details.data,
        externalid:externalid.data,
        recommendations:recommendations.data.results,
        similar:similar.data.results,
        videos:videos.data.results.find(m=>m.type==="Trailer"),
        watch_providers:watch_providers.data.results
    }
    dispatch(loadMovie(ultimatedetails));
    console.log(ultimatedetails);
   } catch (error) {
    console.log(error);
   }

}