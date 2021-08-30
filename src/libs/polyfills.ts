
// Allow for looping on nodes by chaining:
// qsa('.foo').forEach(function () {})
NodeList.prototype.forEach = Array.prototype.forEach;


if (!Array.prototype.last) {
    // eslint-disable-next-line
    Array.prototype.last = function () {
        return this[this.length - 1];
    };
}
