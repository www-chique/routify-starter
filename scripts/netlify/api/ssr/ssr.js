const fs = require('fs')
const { ssr } = require('@sveltech/ssr')
const distDir = '../../../../dist/'
const script = fs.readFileSync(`${distDir}build/bundle.js`, 'utf8')
const template = fs.readFileSync(`${distDir}__app.html`, 'utf8')

exports.handler = async (event, context) => {
    const body = await ssr(template, script, event.path)
    return { statusCode: 200, body: body + '\n<!--ssr rendered-->' }
}