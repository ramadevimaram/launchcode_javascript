function process(transmission) {

    transmission = transmission.trim();

    if (transmission.indexOf('::') !== transmission.lastIndexOf('::')){
        return -1
    }

    if (transmission.indexOf("::") < 0) {
        // Data is invalid
        return -1;
    }

    let parts = transmission.split("::");
    let rawData = parts[1];

    if (rawData[0]!=='<' || rawData[rawData.length-1]!=='>'){
        return -1;
    }

    // slice(i, j) ->  Return the substring consisting of characters from index i through index j-1
    // So in this case it would slice the last two characters, the last one (only the length position) 
    // plus the one that j removes
    let pureRawData = rawData.slice(1, rawData.length-1);

    for (let n=0; n<rawData.length; n++){
        if (!'<0123456789>'.includes(rawData[n])){
            return -1;
        }
    }

    if (pureRawData.includes('<') || pureRawData.includes('>')){
        return -1;
    }

    if (isNaN(Number(parts[0]))){
        return -1
    }

    return {
        id: Number(parts[0]),
        rawData: rawData
    };
}
 
module.exports = process;
