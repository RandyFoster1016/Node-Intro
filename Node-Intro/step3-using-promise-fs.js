const fs = require('fs');
const {readFile, writeFile} = fs.promises;
const process = require('process');
const axios = require('axios');

async function write(path, contents) {
    try {
        await writeFile(path, contents,"utf8");
    }catch (err) {
        console.log(`Error writing ${path}: ${err}`);
        process.exit(1);
    }
}
 async function cat(path) {
    try{
        return await readFile(path, 'utf8');
    }catch (err){
        console.error(`Error reading ${path}: ${err}`);
        process.exit(1);
    } 
}

async function webCat(url) {
    try{
        return (await axios.get(url)).data;
    }catch (err){
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

async function main(){
    let path;
    let out;

    if(process.argv[2] ==='--out'){
      out = process.argv[3];
      path = process.argv[4];
    }else {
      path = process.argv[2];
    }

    let contentPromise = (path.slice(0,4) === 'http')
      ? webCat(path)
      : cat(path);

    let content = await contentsPromise;

    if (out) {
        await write(out, contents);
    }else {
        console.log(content);
    }
}

main()