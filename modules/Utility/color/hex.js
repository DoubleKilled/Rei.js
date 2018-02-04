const validator = require('validator');

const assign = require('./assign.js');

module.exports = async function(msg, cr) {
    if (cr[0] != '#')
        cr = '#' + cr;

    cr = cr.toUpperCase();
    
    try {
        if (validator.isHexColor(cr))
            await assign(msg, cr);
        else
            throw 'That doesn\'t seem to be a valid hex color!';
    } catch (err) {
        throw { expected: true, message: err };
    }
}