var getOptionsByName = require("./internal/getOptionsByName.js");
var GSheetReader = require('g-sheets-api');

function getDataItem(){
    var newDataTemplate = {
        id: undefined,
        type: undefined,
        name: undefined,
        due_date: undefined,
        correctness_threshold: undefined,
        mastery_rate: undefined,
        rubric_item_ids: [],
        course_id: undefined
    };
    return newDataTemplate;
}

function getAssignment(callback) {
    return GSheetReader(getOptionsByName("Assignment"), data => {
        var newData = []
        data.forEach(element => {
            var dataItem = getDataItem();
            dataItem["id"] = element["AssignmentID"];
            dataItem["type"] = element["Type"];
            dataItem["name"] = element["Name"];
            dataItem["due_date"] = element["Due Date"];
            dataItem["correctness_threshold"] = element["Correctness Threshold"];
            if (element["RubricItemIDs"]!=''){
                dataItem["rubric_item_ids"] = element["RubricItemIDs"].split(",");
            }
            dataItem["mastery_rate"] = element["Mastery Rate"];
            dataItem["course_id"] = element["CourseID"];
            newData.push(dataItem);
        })
        callback(newData);
    });
}

module.exports = getAssignment;