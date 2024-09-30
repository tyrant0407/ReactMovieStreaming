export {removePerson} from "../reducers/personSlice";
import axios from "../../utils/AxiosApi";
import { loadPerson } from "../reducers/personSlice";

 export const asyncLoadPerson =  (id) => async (dispatch,getState)=>{
   try {
    const details = await axios.get(`/person/${id}`);
    const externalid = await axios.get(`/person/${id}/external_ids`);
    const credits = await axios.get(`/person/${id}/combined_credits`);
    const tvCredits = await axios.get(`/person/${id}/tv_credits`);
    const movieCredits = await axios.get(`/person/${id}/movie_credits`);

    let ultimatedetails ={
        details:details.data,
        externalid:externalid.data,
        credits:credits.data,
        tvCredits:tvCredits.data,
        movieCredits:movieCredits.data
    }
    console.log(ultimatedetails);
    dispatch(loadPerson(ultimatedetails));
   } catch (error) {
    console.log(error);
   }

}