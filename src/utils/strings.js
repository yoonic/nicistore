/**
 * Returns whether or not the given string is an email address
 * @param email
 * @returns {boolean}
 */
function isValidEmail(email) {
    var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
}

/**
 * Return string with first letter in uppercase.
 */
function capitalise(string) {
    return string ? string.charAt(0).toUpperCase() + string.slice(1).toLowerCase() : null;
}

/**
 * Return a slug of the given text.
 * @param text
 * @returns {string}
 */
function slugify(text) {
    text = text.replace(/^\s+|\s+$/g, ''); // trim
    text = text.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîõòóöôùúüûñç·/_,:;";
    var to   = "aaaaeeeeiiiiooooouuuunc------";
    for (var i=0, l=from.length ; i<l ; i++) {
        text = text.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    text = text.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
               .replace(/\s+/g, '-') // collapse whitespace and replace by -
               .replace(/-+/g, '-'); // collapse dashes

    return text;
}

/**
 * Exports
 */
export {
    isValidEmail,
    capitalise,
    slugify
};
