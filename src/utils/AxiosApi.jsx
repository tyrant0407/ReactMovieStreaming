import axios from "axios";

 const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOGZhODk3ZDM3MmM1OWU2YjQ1OWRmNGJhYjRhZTc0MyIsIm5iZiI6MTczMjI2Njc0MS41OTIxMzEsInN1YiI6IjY3M2Q4NmZmOGUzNTdhMmRlZDk1ODM4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aftbSH3-7anwlcUfMbFNPXdmRuoWnn7R2HQxafc6knk'
      }
});

export default instance;
