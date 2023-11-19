const db = require('../config/database')

const Response = require('../helper/response')

const webhook = async (req, res) => {
    const { type, results } = req.body;
    try {
        const pname = results.pushname ? results.pushname : results.pushName;
        if (type == "message") {
            const insert = await db('message')
                .insert({
                    type: type,
                    sender: results.sender,
                    messageId: results.key.id,
                    pushName: pname,
                    isMedia: results.isMedia,
                    quotedMsg: results.quotedMsg,
                    body: results.body,
                    apiKey: results.apiKey,
                    isMedia: results.isMedia
                })
            const isCustomer = await db('customer').where('waId', results.sender);
            if(isCustomer.length == 0){
                await db('customer').insert({
                    name:'unknown',
                    waId: results.sender,
                    status: 'onHandle'
                });
            }
            Response(200, { status: 'inserted' }, res)
        } else if (type == "message_ack" || type == "message_ack_browser") {
            const update = await db('message')
                .update({
                    ack: results.ack.ack
                })
                .where({ messageId: results.ack.id })
                .returning('id')
            Response(200, {status: 'updated'}, res)
        } else if (type == 'media'){
            const insert = db('message')
            .insert({
                type: type,
                sender: results.sender,
                messageId: results.key.id,
                pushName: pname,
                isMedia: results.isMedia,
                quotedMsg: results.quotedMsg,
                body: results.body,
                apiKey: results.apiKey,
                isMedia: results.isMedia,
                mimeType: results.mimetype,
                media: results.base64_file
            })
            Response(200, { status: 'inserted' }, res)
        }
    } catch (error) {
        console.log(error)
        Response(500, error, res);
    }

}

module.exports = webhook