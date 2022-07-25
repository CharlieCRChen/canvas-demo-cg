var select_page = "skill";
var select_skill_id="";
var select_skill = "";
var example_index = 0;
var rubrics = [
    {name: "Purpose", avg:1, max:2, content:"The content of the email suggests a clear understanding of the purpose of the written communication. The content, tone, and structure of the email are tailored to meet the purpose. The intent is clearly conveyed in the email."},
    {name: "Audience", avg:3, max:5, content:"Clearly understands who their audience is and crafts content, tone, and structure of the email based on their relationship with the audience. Takes on the role of a colleague to address needs of their colleague (their target audience)"},
    {name:"Structure, grammar and tone", avg:4, max:5, content:"Forms content that is grammatically correct, and uses appropriate spelling, punctuation, and pronouns. Uses an appropriate tone (formal or informal) based on purpose and audience. "},
    {name:"Attributes of contents", avg:5, max:5, content:"Includes all four attributes in the email content: 1) Intent—the desire to meet, 2) Details the purpose of the meeting—preparing for a stakeholder, meeting next week, 3) Indicates the date of the stakeholder meeting you're preparing for, and 4) Provides your availability to meet."}
];
var examples = [
    {
        scores:
        [
            {name: "Purpose", score:2},
            {name: "Audience", score:3},
            {name:"Structure, grammar and tone", score:4},
            {name:"Attributes of contents", score:4}
        ],
        content:"This is an example answer of communication practice activity This is an example answer of communication practice activity This is an example answer of communication practice activity This is an example answer of communication practice activity This is an example answer of communication practice activity This is an example answer of communication practice activity This is an example answer of communication practice activity"
    },
    {
        scores:
        [
            {name: "Purpose", score:2},
            {name: "Audience", score:2},
            {name:"Structure, grammar and tone", score:4},
            {name:"Attributes of contents", score:5}
        ],
        content:"This is an example answer of communication practice activity This is an example answer of communication practice activity"
    },
    {
        scores:
        [
            {name: "Purpose", score:1},
            {name: "Audience", score:3},
            {name:"Structure, grammar and tone", score:5},
            {name:"Attributes of contents", score:5}
        ],
        content:"This is an example answer of communication practice activity This is an example answer of communication practice activity This is an example answer of communication practice activity This is an example answer of communication practice activity"
    },
];

$(document).ready(()=>{
    $("#skill").css("border-bottom", "3px solid #8C1A11");
    setBarContainerHeight();
    setActivitySetHeight();

    //write it to session storage later
    $("#no-skill-selected").show();
    $("#select-skill").hide();

    $('#skill-mastery-activity-detail').hide();
})

$( window ).resize(function() {
    setBarContainerHeight();
    setActivitySetHeight();
});

function navInteraction(){
    $("#skill").mouseover(()=>{
        $("#skill").css("color", "#8C1A11");
    })
    
    $("#skill").mouseout(()=>{
        if (select_page == "impact"){
            $("#skill").css("color", "#000");
        }
    })
    
    $("#impact").mouseover(()=>{
        $("#impact").css("color", "#8C1A11");
    })
    
    $("#impact").mouseout(()=>{
        if (select_page == "skill"){
            $("#impact").css("color", "#000");
        }
    })
    
    $("#skill").click(()=>{
        $("#skill").css("border-bottom", "3px solid #8C1A11");
        $("#skill").css("color", "#8C1A11");
    
        $("#impact").css("border-bottom", "");
        $("#impact").css("color", "#000000");
    
        select_page = "skill";

        $("#bar-container").show()
        $("#detail-container").show()
    })
    
    $("#impact").click(()=>{
        $("#impact").css("border-bottom", "3px solid #8C1A11");
        $("#impact").css("color", "#8C1A11");
    
        $("#skill").css("border-bottom", "");
        $("#skill").css("color", "#000000");
    
        select_page = "impact";

        $("#bar-container").hide()
        $("#detail-container").hide()
    })
}

navInteraction()

function createBarComponent(index, skill, mastered, score, add_bottom_line){
    $("#skill-set").append("<div class='component-container' id='component-"+index+"'></div>");
    $("#component-"+index).append("<div class='title-viz' id='title-viz-"+index+"'></div>")
    $("#title-viz-"+index).append("<p class='component-title'>"+skill+"</p>");
    $("#title-viz-"+index).append("<svg class='component-viz' id='component-viz-"+index+"'></svg>");
    if (mastered==true){
        $("#component-"+index).append("<div class='label-score' id='label-score-"+index+"'></>");
        $("#label-score-"+index).append("<p class='label-mastered'>Mastered</p>");
        $("#label-score-"+index).append("<div class='score-mastered'>"+score+"</div>");
    }
    else {
        $("#component-"+index).append("<div class='label-score' id='label-score-"+index+"'></>");
        $("#label-score-"+index).append("<p class='label-not-mastered'>Not Mastered</p>");
        $("#label-score-"+index).append("<div class='score-not-mastered'>"+score+"</div>");
    }
    // $("#component-"+index).append("<svg id='svg-"+index+"'></svg>")

    if (add_bottom_line == true) {
        $("#component-"+index).css("border-bottom", "1px solid #D6D6D6");
    }

    var svg = d3.select("#component-viz-"+index);
    svg.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('fill', '#ccc');

    barComponentInteraction("#component-"+index, skill, mastered, score)
}

createBarComponent(1, "Team-building", true, 89, true)
createBarComponent(2, "Apply Principles", true, 88, true)
createBarComponent(3, "Communication", true, 86, true)
createBarComponent(4, "Ethics", true, 82, true)
createBarComponent(5, "Critical Thinking", false, 79, false)

function barComponentInteraction(id, skill, mastered, score){
    $(id).mouseover(()=>{
        $(id).css("background","#FFFFFF");
        $(id).css("box-shadow","2px 4px 12px rgba(114, 114, 114, 0.25)");
    })

    $(id).mouseout(()=>{
        if (select_skill_id != id){
            $(id).css("background","");
            $(id).css("box-shadow","");
        }
    })

    $(id).click(()=>{
        select_skill = skill;
        if (select_skill_id != id){
            $(select_skill_id).css("background","");
            $(select_skill_id).css("box-shadow","");
            $(id).css("background","#FFFFFF");
            $(id).css("box-shadow","2px 4px 12px rgba(114, 114, 114, 0.25)");
            select_skill_id = id;

            $('#detail-title').text(skill);
            $('#annotation-score').text(score);

            $("#no-skill-selected").hide();
            $("#select-skill").show();

            if (mastered==true){
                $("#annotation-score").css("color","#006038");
                $(".mastery-level-score").css("color","#006038");
            }
            else{
                $("#annotation-score").css("color","#8C1A11");
                $(".mastery-level-score").css("color","#8C1A11");
            }
        }
        // else{
        //     $(select_skill_id).css("background","");
        //     $(select_skill_id).css("box-shadow","");
        //     select_skill_id = '';

        //     $("#no-skill-selected").show();
        //     $("#select-skill").hide();
        // }
    })
}

function setBarContainerHeight(){
    var height = $( window ).height() - 20 - $('#nav-container').height();
    $('#bar-container').css('height', height);
}

function setActivitySetHeight(){
    var height = $( window ).height() - 20 * 4 -15 - $('#nav-container').height() - $('#detail-annotation').height();
    $('#activities-set').css('height', height);
}

function createActivityComponent(index, name, type, due_time, score,max_score){


    $("#activities-set").append("<div class='activity-component' id='activity-component-"+index+"'></div>")
    $("#activity-component-"+index).append("<div class='icon-type-name' id='icon-type-name-"+index+"'></div>")

    activityComponentInteraction("#activity-component-"+index, name, type);

    if (type == "Knowledge Check") { $('#icon-type-name-'+index).append("<img class='activity-icon' src='/asset/icon/knowledge-check.png'>") }
    if (type == "Practice Activity") { $('#icon-type-name-'+index).append("<img class='activity-icon' src='/asset/icon/practice-activity.png'>") }
    if (type == "Discussion") { $('#icon-type-name-'+index).append("<img class='activity-icon' src='/asset/icon/discussion.png'>") }
    if (type == "Reflection") { $('#icon-type-name-'+index).append("<img class='activity-icon' src='/asset/icon/reflection.png'>") }

    $("#icon-type-name-"+index).append("<div class='type-name' id='type-name-"+index+"'></div>")
    $("#type-name-"+index).append("<div class='activity-type' id='type-"+index+"'>"+type+"</div>")

    if (type == "Knowledge Check") { $("#type-"+index).css("color", "#4A2E5C")}
    if (type == "Practice Activity") { $("#type-"+index).css("color", "#A5892B")}
    if (type == "Discussion") { $("#type-"+index).css("color", "#006038")}
    if (type == "Reflection") { $("#type-"+index).css("color", "#B14E46")}

    $("#type-name-"+index).append("<div class='activity-name' id='name-"+index+"'>"+name+"</div>")

    $("#activity-component-"+index).append("<p class='activity-time' id='time-"+index+"'>"+due_time+"</p>")
    $("#activity-component-"+index).append("<p class='activity-score' id='score-"+index+"'>"+score+"/"+max_score+"</p>")
}

createActivityComponent(1, "The Acquisition Life Cycle", "Knowledge Check", "Jul 3 2022 by 7:59pm", 9.75, 10)
createActivityComponent(2, "Effective Written Communication", "Practice Activity", "Jul 3 2022 by 7:59pm", 9.75, 10)
createActivityComponent(3, "Researching Basic Contracting Statutes", "Practice Activity", "Jul 3 2022 by 7:59pm", 9.75, 10)
createActivityComponent(4, "Incentives and Motivation", "Discussion", "Jul 3 2022 by 7:59pm", 9.75, 10)
createActivityComponent(5, "Acquisition Phases", "Knowledge Check", "Jul 3 2022 by 7:59pm", 9.75, 10)
createActivityComponent(6, "Authority", "Knowledge Check", "Jul 3 2022 by 7:59pm", 9.75, 10)
createActivityComponent(7, "FAR Citations", "Practice Activity", "Jul 3 2022 by 7:59pm", 9.75, 10)
createActivityComponent(8, "Acquisition Phases in Your Organization", "Discussion", "Jul 3 2022 by 7:59pm", 9.75, 10)
createActivityComponent(9, "FAR", "Reflection", "Jul 3 2022 by 7:59pm", 9.75, 10)

function activityComponentInteraction(id, name, type){
    $(id).mouseover(()=>{
        $(id).css("background","#FFFFFF");
        $(id).css("box-shadow","2px 4px 12px rgba(114, 114, 114, 0.25)");
    })

    $(id).mouseout(()=>{
        if (select_skill_id != id){
            $(id).css("background","");
            $(id).css("box-shadow","");
        }
    })

    $(id).click(()=>{
        if (type == "Practice Activity"){
            $("#skill-mastery-main").hide();
            $("#skill-mastery-activity-detail").show();
            updateActivityDetailPA(select_skill, name, rubrics, examples);
        }
    })   
}

function updateActivityDetailPA(skill, name, rubrics, examples){
    // rubrics
    $("#detail-nav-skill-name").text(skill);
    $("#detail-title-type").text("Practice Activity");
    $("#detail-title-name").text(name);
    $("#rubrics-set").empty();
    rubrics.forEach((rubric,index) => {
        if (index % 2!=1){
            $("#rubrics-set").append("<div class='comb-rubric-component' id='comb-rubric-component-"+parseInt(index/2)+"'></div>")
        }

        $("#comb-rubric-component-"+parseInt(index/2)).append("<div class='rubric-component' id='rubric-component-"+index+"'></div>");

        $("#rubric-component-"+index).append("<div class='rubric-component-title'>"+rubric.name+"</div>");
        $("#rubric-component-"+index).append("<div class='rubric-component-score'>"+rubric.avg+'/'+rubric.max+"</div>");
        $("#rubric-component-"+index).append("<div class='rubric-component-content'>"+rubric.content+"</div>");

        if (index+2<rubrics.length){
            $("#rubric-component-"+index).css('border-bottom', '1px solid #D6D6D6')
        }
    });

    // example
    updateExampleCard(examples, example_index);
}

$("#example-set-left-arrow").click(()=> {
    example_index-=1;
    if (example_index < 0){
        example_index = examples.length-1;
    }
    updateExampleCard(examples, example_index);
})
$("#example-set-right-arrow").click(()=> {
    example_index+=1;
    if (example_index >= examples.length){
        example_index = 0;
    }
    updateExampleCard(examples, example_index);
})

// switch back to skill page
$("#detail-nav-skill-name").click(()=>{
    $("#skill-mastery-main").show();
    $('#skill-mastery-activity-detail').hide();
})
$("#detail-nav-origin").click(()=>{
    $("#skill-mastery-main").show();
    $(select_skill_id).css("background","");
    $(select_skill_id).css("box-shadow","");
    select_skill_id = '';

    $("#no-skill-selected").show();
    $("#select-skill").hide();
    $('#skill-mastery-activity-detail').hide();
})

function updateExampleCard(examples, example_index){
    var data = examples[example_index];
    var total = 0;
    $("#card-detail-score").empty();

    data.scores.forEach((element,index)=>{
        total += element.score;
        $("#card-detail-score").append("<div class='card-rubric-pair' id='card-rubric-"+index+"'></div>")
        $("#card-rubric-"+index).append("<div>"+element.name+"</div>");
        $("#card-rubric-"+index).append("<div>"+element.score+"</div>");

        if (index+1<data.scores.length){
            $("#card-rubric-"+index).css('border-bottom', '1px solid #D6D6D6')
        }
    })

    $("#card-text").text(data.content)
    $('#card-total-score').text(total)
}


function updateActivityDetailKC(skill, activity, question_num){
    $("#detail-nav-skill-name").text(skill);
    $("#detail-title-type").text("Practice Activity");
    $("#detail-title-name").text(activity);
}
