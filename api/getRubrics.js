var getOptionsByName = require("./internal/getOptionsByName.js");
var GSheetReader = require('g-sheets-api');

function getDataItem(){
    var newDataTemplate = {
        id: undefined,
        description: undefined,
        possible_points: NaN,
        skill_id: [],
    };
    return newDataTemplate;
}

function getRubrics(callback) {
    return GSheetReader(getOptionsByName("RubricItem"), data => {
        var newData = []
        data.forEach(element => {
            var dataItem = getDataItem();
            dataItem["id"] = element["RubricItemID"];
            dataItem["description"] = element["Description"];
            dataItem["possible_points"] = element["PossiblePoints"];
            dataItem["skill_id"] = element["SkillID"].split(",");
            newData.push(dataItem);
        })
        callback(newData);
    });
}

module.exports = getRubrics;