export const getAvgRating = (reviews) => {
    let sumOfRatings = 0;
    reviews.forEach(x => sumOfRatings += x.rating);
    const rating = Number((sumOfRatings / reviews.length).toFixed(1));

    return rating;
}

export const ratingAsWords = new Map();
ratingAsWords.set(0, '');
ratingAsWords.set(1, 'Poor!');
ratingAsWords.set(2, 'Weak!');
ratingAsWords.set(3, 'Good!');
ratingAsWords.set(4, 'Very good!');
ratingAsWords.set(5, 'Excellent!');