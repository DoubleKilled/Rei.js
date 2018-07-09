const db = require('../../../utils/dbUtil.js');
const tagUtils = require('./tagUtils.js');

module.exports = async function(msg, args) {
    const tagName = args.join(' ');
    const rows = await db.getRows('tags', { 'userid': msg.author.id, 'name': tagName });

    if (rows.length < 1)
        throw 'This tag doesn\'t seem to exist!';

    let content = ''
    let file = null;

    if (rows[0].content)
        content = rows[0].content;

    if (rows[0].imageid)
        file = await tagUtils.loadImage(rows[0].imageid);
    
    if (file)
        await msg.channel.send(content, { files: [ { attachment: file, name: tagName + rows[0].imageid.slice(rows[0].imageid.indexOf('.')) } ] });
    else
        await msg.channel.send(content);
}