import { useEffect, useState } from "react";

async function getMovieDetails(url) {
    //console.log('rtrtrrtrttr');
    try{
        let response = await fetch(url);
    let movie = await response.json();
    return movie;
    }catch(error){
        return  Promise.reject(new Error('Problem in getting movie detail'));
    }
};


const useFetchMovies = (movieUrl)=>{
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
       if(movieUrl.length>0){
        let promises = [];
        for(let i=0; i<movieUrl.length;i++){
             promises.push(getMovieDetails(movieUrl[i]).catch(e=>{//this catch is just passing error in array ....its not necessary
                 return Promise.reject(new Error(e));
             }));
        };
        //console.log(promises);
        Promise.allSettled(promises)
        .then(val=>{
            //console.log('val');
            //console.log(val,'!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            for(let i = 0;i<val.length;i++){
            if(val[i].status==='fulfilled'){
             let poster_path = val[i].value.poster_path;
             val[i].imageUrl =  'https://image.tmdb.org/t/p/w500' + poster_path;
            };
            };
            setResult([...val]);
        })
        .finally(()=>{
            //console.log('finally');
            setIsLoading(false);
        });
        //console.log('after error');
       };
    },[movieUrl.length]);
    return {result, isLoading};
};


export default useFetchMovies;