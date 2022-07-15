var getOptionsByName = require("./internal/getOptionsByName.js");
var GSheetReader = require('g-sheets-api');

function getDataItem(){
    var newDataTemplate = {
        id: undefined,
        name: undefined,
        created_at: undefined,
        sortable_name: undefined,
        short_name: undefined,
        avatar_url: undefined,
        locale: null,
        effective_locale: 'en',
        permissions: {
            "can_update_name": false,
            "can_update_avatar": true,
            "limit_parent_app_web_access": false
        },
        course_id: []
    };
    return newDataTemplate;
}

function getUser(callback) {
    return GSheetReader(getOptionsByName("Student"), data => {
        var newData = []
        data.forEach(element => {
            var dataItem = getDataItem();
            dataItem["id"] = element["ID"];
            dataItem["name"] = element["Name"];
            dataItem["course_id"].push(element['CourseID']);
            newData.push(dataItem);
        })
        callback(newData);
    });
}

module.exports = getUser;