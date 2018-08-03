const fs =require('fs');
function base64Maker(file){
    return new Buffer(fs.readFileSync(file.path)).toString("base64");
}
module.exports = base64Maker;