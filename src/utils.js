export const getAvgRating = (reviews) => {
    let sumOfRatings = 0;
    for (let review of reviews) {
        sumOfRatings += review.rating;
    }
    if (sumOfRatings === 0) {
        return '';
    }
    const rating = Number((sumOfRatings / reviews.length));

    return rating.toFixed(1);
}

export const ratingAsWords = new Map();
ratingAsWords.set(0, '');
ratingAsWords.set(1, 'Poor!');
ratingAsWords.set(2, 'Weak!');
ratingAsWords.set(3, 'Good!');
ratingAsWords.set(4, 'Very good!');
ratingAsWords.set(5, 'Excellent!');

export const commentDateConverter = (par) => {

    const date = new Date(par);

    const fullDate = date.toLocaleDateString();
    const time = date.toLocaleTimeString();

    const formatedDate = `${time.slice(0, -3)}/${fullDate.slice(0,-3)}`;

    return formatedDate;
}