const DB = require('../db');
const chalk = require('chalk');
const validurl = require('valid-url');
const { customAlphabet } = require('nanoid')

const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_', 6)

const getUrl = async (data)=>{                                        // receives code returns actual link
if(!data.length===6) throw {message:"invalid code",code:404}
let uri = await (await DB()).collection('shorten').findOne({"code":data})
if(!uri) throw {message:"invalid code",code:404}
console.log(uri.url)
return uri.url
};

const createCode = async (data)=>{     
    console.log(data)                               // receives url and returns code
if(!data.startsWith('https://') && !data.startsWith('http://'))
{
    data='https://'+data;
}
if(!validurl.isUri(data)) throw {code:404, message:"Not a valid url"}
let iscode = await(await DB()).collection('shorten').findOne({"url":data})
if(iscode)
{
    return iscode.code;
}
let insert = {
    url:data,
    code:nanoid(),
}
await (await DB()).collection('shorten').insertOne(insert);
return insert.code;
}


const getLength = (number) => {
    return number.toString().length;
}


module.exports={getUrl, createCode};

