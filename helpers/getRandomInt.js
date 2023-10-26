// Immediately export a function that generates a random number between a given min and max.
module.exports = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

