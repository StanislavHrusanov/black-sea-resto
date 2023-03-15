export const getAvgRating = (reviews) => {
    let sumOfRatings = 0;
    reviews.forEach(x => sumOfRatings += x.rating);
    const rating = Number((sumOfRatings / reviews.length).toFixed(1));

    return rating;
}