export {removeMovie} from "../reducers/movieSlice";
import axios from "../../utils/axios";
import { loadMovie } from "../reducers/movieSlice";


export const GetTrending = async (category) => {
    const response = await axios.get(`/trending/${category}?api_key=${process.env.REACT_APP_API_KEY}`);
    return response.data;
}