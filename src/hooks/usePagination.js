import {useMemo} from 'react';
import range from 'lodash.range';

export const DOTS = '...';


const usePagination =({
    totalCount,
  pageSize=10,
  siblingCount = 1,
  currentPage
})=>{
    //console.log('usepagination');
   let startPage =1;
    let minPages = siblingCount*2 + 5;//2 dots + 1st last and middle page
    let totalPages = Math.max(Math.ceil(totalCount/pageSize),1);

    //console.log(minPages, totalPages,totalCount);

    if (totalPages<=minPages) return {paginationArray: range(startPage,totalPages+1),
      lastPage: totalPages,
};
    //console.log('####');
    let leftMostSibling = currentPage - siblingCount;
    let righMostSibling = currentPage + siblingCount;
    
  
    const showLeftDots = leftMostSibling - 1 >2;
    const showRightDots = totalPages - righMostSibling > 2;
    let paginationArray = [startPage];//initial page in array
    
    if(showLeftDots && showRightDots){
      paginationArray.push(DOTS);
      paginationArray.push(...range(leftMostSibling,righMostSibling+1));
      paginationArray.push(...[DOTS,totalPages]);

    }else if(!showLeftDots && showRightDots){
      paginationArray.push(...range(startPage+1,minPages-3+2))//3 for right dot + firstpage + lastPage
      paginationArray.push(...[DOTS,totalPages]);

    }else if(showLeftDots && !showRightDots){
      paginationArray.push(DOTS);
      paginationArray.push(...range(totalPages-minPages+2,totalPages+1));

    }else{
      paginationArray = range(startPage,minPages+1);
    }

    //console.log(leftMostSibling,currentPage,righMostSibling,paginationArray,showRightDots,totalPages,'@@@',totalCount,pageSize);

    return {paginationArray: paginationArray,
               lastPage: totalPages,
       };

};


export default usePagination;