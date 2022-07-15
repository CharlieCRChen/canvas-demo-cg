var getOptionsByName = require("./internal/getOptionsByName.js");
var GSheetReader = require('g-sheets-api');

function getDataItem(){
    var newDataTemplate = {
        id: undefined,
        name: undefined,
        mastery_rate: NaN,
        course_id: undefined
    };
    return newDataTemplate;
}

function getSkills(callback) {
    return GSheetReader(getOptionsByName("Skill"), data => {
        var newData = []
        data.forEach(element => {
            var dataItem = getDataItem();
            dataItem["id"] = element["ID"];
            dataItem["name"] = element["Name"];
            dataItem["mastery_rate"] = element["Mastery Rate"];
            dataItem["course_id"] = element["CourseID"];
            newData.push(dataItem);
        })
        callback(newData);
    });
}

module.exports = getSkills;