var getOptionsByName = require("./internal/getOptionsByName.js");
var GSheetReader = require('g-sheets-api');

function getDataItem(){
    var newDataTemplate = {
        id: undefined,
        name: undefined,
    };
    return newDataTemplate;
}

function getCourse(callback) {
    return GSheetReader(getOptionsByName("Course"), data => {
        var newData = []
        data.forEach(element => {
            var dataItem = getDataItem();
            dataItem["id"] = element["ID"];
            dataItem["name"] = element["Name"];
            newData.push(dataItem);
        })
        callback(newData);
    });
}

module.exports = getCourse;