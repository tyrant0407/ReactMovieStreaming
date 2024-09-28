export {removeTv} from "../reducers/tvSlice";
import axios from "../../utils/AxiosApi";
import { loadTv } from "../reducers/tvSlice";

export const asyncLoadTv =  (id) => async (dispatch,getState)=>{
   try {
    const details = await axios.get(`/tv/${id}`);
    const externalid = await axios.get(`/tv/${id}/external_ids`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const watch_providers = await axios.get(`/tv/${id}/watch/providers`);
    let ultimatedetails ={
        details:details.data,
        externalid:externalid.data,
        recommendations:recommendations.data.results,
        similar:similar.data.results,
        videos:videos.data.results.find(m=>m.type==="Trailer"),
        watch_providers:watch_providers.data.results
    }
    console.log(ultimatedetails);
    dispatch(loadTv(ultimatedetails));
   } catch (error) {
    console.log(error);
   }

}