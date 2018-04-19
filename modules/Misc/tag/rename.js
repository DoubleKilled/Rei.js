const db = require('../../../utils/dbUtil.js');

module.exports = async function(msg, args) {
    if (args.length < 3)
        throw 'Not enough arguments!';

    // If row doesn't exist - throw
    if (!(await db.ifRowExists('tags', { 'userid': msg.author.id, 'name': args[1] })))
        throw 'I can\'t rename a tag that doesn\'t exist!';

    // Check if user doesn't have a tag with the same name
    if(await db.ifRowExists('tags', { 'userid': msg.author.id, 'name': args[2] }))
        throw 'A tag with that name already exists!';

    // Row exists, we can edit it
    await db.updateRow('tags', { 'userid': msg.author.id, 'name': args[1] }, { 'name': args[2] });
}