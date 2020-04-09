module.exports = function (options) {
    const options = options || {};
    return function (req, res, next) {
        console.log(req, res, next);
    }
}

