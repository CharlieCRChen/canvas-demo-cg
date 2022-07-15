const express = require("express");
const cors = require("cors");
const app = express();
const expressPort = 3000;

app.listen(process.env.PORT || expressPort, ()=>{
    console.log("listening on 127.0.0.1:" + expressPort);
})

app.use('/public', express.static(`${__dirname}/public/`));
app.use(cors());

const getAssignment = require(`${__dirname}/api/getAssignment`);
const getCourse = require(`${__dirname}/api/getCourse`);
const getRubrics = require(`${__dirname}/api/getRubrics`);
const getSkills = require(`${__dirname}/api/getSkills`);
const getUser = require(`${__dirname}/api/getUser`);

app.get('/', (req, res, next) => {
    res.sendFile(`${__dirname}/public/index.html`);
})

app.get('/mastery_level', (req, res, next) => {
    processing().then(self => res.json(self))
})

async function processing(){
    var all_student, all_course, all_skill, all_rubrics, all_assignment;
    var res_all = [];
    // get student data
    await getUser(students => {
        all_student = students;
    })
    // get courses
    .then(async ()=>{
        await getCourse(courses => {
            all_course = courses;
        })
    })
    // get skills
    .then(async ()=>{
        await getSkills(skills => {
            all_skill = skills;
        })
    })
    // get rubrics
    .then(async ()=>{
        await getRubrics(rubrics => {
            all_rubrics = rubrics;
        })
    })
    // get assignments
    .then(async ()=>{
        await getAssignment(assignment => {
            all_assignment = assignment;
        })
    })
    // process
    .then(() =>{
        //student -> course -> assignment -> rubric -> skill 
        all_student.forEach(student => {
            var p_init_skills = {};
            var result_agg = [];
            
            all_skill.forEach(skill => {
                p_init_skills[skill["id"]] = 0;
            })
            
            all_assignment.forEach( assignment => {
                // duration ...
                var tmpData;
                if (assignment["rubric_item_ids"].length > 0){
                    
                    assignment["rubric_item_ids"].forEach( rubricItemID => {
                        tmpData = getSkillAndPointsByRubric(rubricItemID, all_rubrics);
                        var skillIDs = tmpData['skills']
                        var ppoints = tmpData['possible_points']
                        
                        skillIDs.forEach( skillID => {
                            
                            var result = getRubricItemAssessment(parseInt(rubricItemID), parseInt(student['id']), parseInt(skillID), parseInt(ppoints), assignment['type'])
                            var correctness = getCorrectness(result['score'], parseInt(ppoints), assignment['correctness_threshold'])
                            var compound_mastery_rate = assignment['mastery_rate'] * getSkillMasteryRateById(parseInt(skillID), all_skill)
                            
                            p_init_skills[skillID] = BKT(p_init_skills[skillID], compound_mastery_rate, null, correctness)
                            result_agg.push(result);
                        })
                    })
                }
            });
            // console.log('===========================')
            // console.log("student "+student['id']+': '+student['name'])
            var skillset = [1,2,4]
            var dist = {}
            skillset.forEach(s =>{
                var d = getNumCount(validBySkill(s+'', result_agg));
                dist[s] = d;
                // console.log("Skill "+s);
                // console.log("    correctness distribution: ", d);
                // console.log("    mastery level: " + p_init_skills[s+'']);
            })
            res = {
                student: {
                    id: student['id'],
                    name: student['name']
                },
                distribution: dist,
                mastery_level: p_init_skills
            };
            res_all.push(res)
        })
    })
    return new Promise((res, rej) => {res(res_all)})
}


//util functions
function getRandomInt(possible_point, assignment_type){
    var a,b;
    if (assignment_type == 'Knowledge Check'){
        a = 0.3;
        b = 1-a;
    }
    else if (assignment_type == 'Discussion Board'){
        a = 1;
        b = 1-a;
    }
    else if (assignment_type == 'Practice Activity'){
        a = 0.8;
        b = 1-a;
    }
    else{ //assignment_type == reflection
        a = 1;
        b = 1-a;
    }
    return Math.round(a*possible_point + b*Math.random()*possible_point)
}

function getRubricItemAssessment(rubricID, studentID, skillID, possible_points, assignment_type){
    var res = {
        "rubricID": rubricID, 
        "studentID": studentID, 
        "skillID": skillID,
        "score":getRandomInt(possible_points, assignment_type),
        "possible_points": possible_points
    }
    return res
}

function getSkillAndPointsByRubric(rubricItemID, rubrics){
    for (var i=0; i<rubrics.length; i++){
        if (rubrics[i]['id'] == parseInt(rubricItemID)){
            return {skills: rubrics[i]['skill_id'], possible_points:rubrics[i]['possible_points']};
        }
    }
}

function getSkillMasteryRateById(skillID, skills){
    for (var i=0; i<skills.length; i++){
        if (skills[i]['id'] == parseInt(skillID)){
            return skills[i]['mastery_rate'];
        }
    }
}

function getCorrectness(score, possible_points, correctness){
    if (score/possible_points < correctness){
        return false;
    }
    else { return true; }
}

function getNumCount(arr){
    return arr.reduce(function(prev, next){
        prev[next] = (prev[next]+1) || 1;
        return prev;
    }, {})
}

function validBySkill(skillID, result_list){
    correctness_list = []
    result_list.forEach(result => {
        if (result['skillID'] == skillID){
            correctness_list.push(result['score'] / parseInt(result['possible_points']))
        }
    })
    return correctness_list
}

function BKT(priori, mastery_rate, assignment_type, correctness){
    var p_init = priori; //the probability of the student knowing the skill beforehand
    var p_slip = 0.1; //the probability the student makes a mistake when applying a known skill
    var p_guess = 0.25; //the probability that the student correctly applies an unknown skill
    const p_learn = mastery_rate; //the probability of the student demonstrating knowledge of the skill after an opportunity to apply it
    var knew_it, condition_prob;

    // if (assignment_type == 'Knowledge Check'){
    //     p_slip = 0.2;
    //     p_guess = 0.25;
    // }
    // else if (assignment_type == 'Discussion Board'){
    //     p_slip = 0.1;
    //     p_guess = 1;
    // }
    // else if (assignment_type == 'Practice Activity'){
    //     p_slip = 0.5;
    //     p_guess = 0.1;
    // }
    // else{ //assignment_type == reflection
    //     p_slip = 0.1;
    //     p_guess = 1;
    // }

    knew_it = p_init;
    if (correctness){
        condition_prob = knew_it * (1-p_slip) / ( knew_it * (1-p_slip) + (1-knew_it) * p_guess )
    }
    else{
        condition_prob = knew_it * p_slip / ( knew_it * p_slip + (1-knew_it) * (1-p_guess) )
    }
    knew_it = condition_prob + (1-condition_prob) * p_learn
    return knew_it;
}

