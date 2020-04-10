const fs = require('fs')
const { ssr } = require('@sveltech/ssr')
const distDir = '../../../../dist/'
const path = require('path')

const root = process.env.LAMBDA_TASK_ROOT || __dirname

const script = path.resolve(root, distDir, 'build/bundle.js')
const template = path.resolve(root, distDir,'__app.html')

exports.handler = async (event, context) => {
    const body = await ssr(template, script, event.path)
    return { statusCode: 200, body: body + '\n<!--ssr rendered-->' }
}