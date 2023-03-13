export const getAvgRating = (reviews) => {
    let sumOfRatings = 0;
    reviews.forEach(x => sumOfRatings += x.rating);
    const rating = Math.round(sumOfRatings / reviews.length);

    return rating;
}