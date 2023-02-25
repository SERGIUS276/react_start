export const getPagesCount = (totalPosts, limit) => {
    return Math.ceil(totalPosts / limit)
} 

export const getPagesArray = (totalPages) => {
    let result = [];
    for(let i = 0; i < 10; i++){
      result.push(i + 1);
    }
    return result;
}