export const getAvgRating = (reviews) => {
    let sumOfRatings = 0;
    if (reviews) {
        for (let review of reviews) {
            sumOfRatings += review.rating;
        }
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

    const formatedDate = `${time.slice(0, -3)}/${fullDate.slice(0, -3)}`;

    return formatedDate;
}

export const trimInputs = (inputsObj) => {
    for (let key in inputsObj) {
        inputsObj[key] = inputsObj[key].trim();
    }
    return inputsObj;
}

export const sortRestaurantsByCriteria = (restaurants, criteria) => {
    switch (criteria) {
        case 'newest':
            return restaurants.sort((a, b) => b._createdOn - a._createdOn);
        case 'a-z':
            return restaurants.sort((a, b) => a.name.localeCompare(b.name));
        case 'reviews':
            return restaurants.sort((a, b) => b.reviews.length - a.reviews.length);
        case 'rating':
            return restaurants.sort((a, b) => getAvgRating(b.reviews) - getAvgRating(a.reviews));
        default:
            return restaurants;
    }
}

export const profileCreatedOnDateConverter = (par) => {
    const date = new Date(par);

    const fullDate = date.toLocaleDateString();

    return fullDate.slice(0, -3);
}