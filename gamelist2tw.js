
const fs = require('fs');
const iconv = require('iconv-lite');
const xml2js = require('xml2js');
const xml2js_parser = new xml2js.Parser({ attrkey: "ATTR" });
var xmlbuilder = new xml2js.Builder({ attrkey: "ATTR" });

let xml_string = fs.readFileSync("gamelist.xml", "UTF8");

//這裏要用無編碼方式讀入,再用big5解碼(預設是utf8讀入後...亂很大)
var dictfile = fs.readFileSync('mame_tw.lst', null);

var big5 = iconv.decode(dictfile, 'big5');
var lines = big5.split('\n');
var dict = {};
for (line in lines) {
    var cols = lines[line].split('\t');
    dict[cols[0]] = cols[1];
}

xml2js_parser.parseString(xml_string, function (error, result) {
    if (error === null) {
        for (g in result.gameList.game) {
            if (dict[result.gameList.game[g].ATTR['id']] > '') {
                result.gameList.game[g].name[0] = dict[result.gameList.game[g].ATTR['id']];
            }
        }
        xml = xmlbuilder.buildObject(result);
        if (!fs.existsSync('retropie')) {
            fs.mkdirSync('retropie');
        }
        fs.writeFileSync('retropie\\gamelist.xml', xml);
        console.log('完成.');
    } else {
        console.log(error);
    }
});

