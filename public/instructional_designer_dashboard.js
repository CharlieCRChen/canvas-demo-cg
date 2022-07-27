var select_page = "skill";
var select_skill_id="";
var select_skill = "";
var example_index = 0;
var current_page = "";
var impact_page = "activity";
var order = "down";
var state="collapse";

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
    $("#impact-evaluation-main").hide();

    current_page = "skill-mastery-main";
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

        // $("#bar-container").show()
        // $("#detail-container").show()
        $("#"+current_page).show();
        $("#impact-evaluation-main").hide();

    })
    
    $("#impact").click(()=>{
        $("#impact").css("border-bottom", "3px solid #8C1A11");
        $("#impact").css("color", "#8C1A11");
    
        $("#skill").css("border-bottom", "");
        $("#skill").css("color", "#000000");
    
        select_page = "impact";

        // $("#bar-container").hide()
        // $("#detail-container").hide()
        $("#"+current_page).hide();
        $("#impact-evaluation-main").show();
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

            $("#detail-content-knowledge-check").hide();
            $("#detail-side-knowledge-check").hide();
            $("#detail-content-practice-activity").show();
            $("#detail-side-practice-activity").show();

            updateActivityDetailPA(select_skill, name, rubrics, examples);
            current_page = "skill-mastery-activity-detail";
        }
        else if (type == "Knowledge Check"){
            $("#skill-mastery-main").hide();
            $("#skill-mastery-activity-detail").show();

            $("#detail-content-practice-activity").hide();
            $("#detail-side-practice-activity").hide();
            $("#detail-content-knowledge-check").show();
            $("#detail-side-knowledge-check").show();

            updateActivityDetailKC(select_skill, name);
            current_page = "skill-mastery-activity-detail";
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

var question = [
    {
        q: "What statute or regulation requires the contracting officer to obtain a determination of prevailing wages from the Department of Labor on contracts valued in excess of $2,500?",
        score:0,
        max_points: 1,
        total_res_num: 63,
        response: [
            {name: "Wage Rate Requirements statute", num:12},
            {name: "Service Contract Labor Standards statute", num:16},
            {name: "FAR part 37", num: 20},
            {name: "FAR part 36", num: 15}
        ],
        correctness: 0.26,
        difficulty_index: 0.2,
        discrimination_index: 0.2
    },
    {
        q: "What statute or regulation requires the contracting officer to obtain a determination of prevailing wages from the Department of Labor on contracts valued in excess of $2,500?",
        score:1,
        max_points: 1,
        total_res_num: 63,
        response: [
            {name: "Wage Rate Requirements statute", num:12},
            {name: "Service Contract Labor Standards statute", num:16},
            {name: "FAR part 37", num: 20},
            {name: "FAR part 36", num: 15}
        ],
        correctness: 0.26,
        difficulty_index: 0.2,
        discrimination_index: 0.2
    },
    {
        q: "What statute or regulation requires the contracting officer to obtain a determination of prevailing wages from the Department of Labor on contracts valued in excess of $2,500?",
        score:1,
        max_points: 1,
        total_res_num: 63,
        response: [
            {name: "Wage Rate Requirements statute", num:12},
            {name: "Service Contract Labor Standards statute", num:16},
            {name: "FAR part 37", num: 20},
            {name: "FAR part 36", num: 15}
        ],
        correctness: 0.26,
        difficulty_index: 0.2,
        discrimination_index: 0.2
    },
    {
        q: "What statute or regulation requires the contracting officer to obtain a determination of prevailing wages from the Department of Labor on contracts valued in excess of $2,500?",
        score:1,
        max_points: 1,
        total_res_num: 63,
        response: [
            {name: "Wage Rate Requirements statute", num:12},
            {name: "Service Contract Labor Standards statute", num:16},
            {name: "FAR part 37", num: 20},
            {name: "FAR part 36", num: 15}
        ],
        correctness: 0.26,
        difficulty_index: 0.2,
        discrimination_index: 0.2
    },
    {
        q: "What statute or regulation requires the contracting officer to obtain a determination of prevailing wages from the Department of Labor on contracts valued in excess of $2,500?",
        score:1,
        max_points: 1,
        total_res_num: 63,
        response: [
            {name: "Wage Rate Requirements statute", num:12},
            {name: "Service Contract Labor Standards statute", num:16},
            {name: "FAR part 37", num: 20},
            {name: "FAR part 36", num: 15}
        ],
        correctness: 0.26,
        difficulty_index: 0.2,
        discrimination_index: 0.2
    },
    {
        q: "What statute or regulation requires the contracting officer to obtain a determination of prevailing wages from the Department of Labor on contracts valued in excess of $2,500?",
        score:1,
        max_points: 1,
        total_res_num: 63,
        response: [
            {name: "Wage Rate Requirements statute", num:12},
            {name: "Service Contract Labor Standards statute", num:16},
            {name: "FAR part 37", num: 20},
            {name: "FAR part 36", num: 15}
        ],
        correctness: 0.26,
        difficulty_index: 0.2,
        discrimination_index: 0.2
    }
]

function expandOrCollapseKC(index, id, src){
    var list = src.split("/");
    var img = list.pop();
    if (img == "up-arrow.png"){
        $("#"+id).attr("src", "asset/down-arrow.png");
        $("#question-component-bottom-"+index).hide();
    }
    else{
        $("#"+id).attr("src", "asset/up-arrow.png");
        $("#question-component-bottom-"+index).show();
    }
}

$("#knowledge-check-expand-all").click(()=>{
    $(".knowledge-check-arrow").attr("src", "asset/up-arrow.png");
    $(".question-component-bottom").show();
})

$("#knowledge-check-collapse-all").click(()=>{
    $(".knowledge-check-arrow").attr("src", "asset/down-arrow.png");
    $(".question-component-bottom").hide();
})

function expand_annotation_kc(id, src, content_id){
    var list = src.split("/");
    var img = list.pop();
    if (img == "close.png"){
        $("#"+id).attr("src", "asset/open.png");
        $("#"+content_id).show();
    }
    else{
        $("#"+id).attr("src", "asset/close.png");
        $("#"+content_id).hide();
    }
}

function updateActivityDetailKC(skill, name){
    $("#detail-nav-skill-name").text(skill);
    $("#detail-title-type").text("Knowledge check");
    $("#detail-title-name").text(name);

    $("#knowledge-check-questions").empty();

    question.forEach((element,i) => {
        $("#knowledge-check-questions").append("<div class='question-component' id='question-component-"+i+"'></div>");
        $("#question-component-"+i).append("<div class='question-component-top' id='question-component-top-"+i+"'></div>")
            $("#question-component-top-"+i).append("<div class='question-type' id='question-type-"+i+"'></div>")
                $("#question-type-"+i).append("<div class='knowledge-check-question'>Question "+(i+1)+"</div>")
                $("#question-type-"+i).append("<div class='knowledge-check-type'>"+skill+"</div>")
            $("#question-component-top-"+i).append("<div class='score-arrow' id='score-arrow-"+i+"'></div>")
                $("#score-arrow-"+i).append("<div class='knowledge-check-score'>Points: "+element.score+"/"+element.max_points+"</div>")
                $("#score-arrow-"+i).append("<img class='knowledge-check-arrow' id='knowledge-check-arrow-"+i+"' onclick='expandOrCollapseKC("+i+", this.id, this.src)' src='asset/down-arrow.png'>")

        $("#question-component-"+i).append("<div class='question-component-bottom' id='question-component-bottom-"+i+"'></div>")
            $("#question-component-bottom-"+i).append("<div class='question-q'>"+element.q+"</div>")
            $("#question-component-bottom-"+i).append("<div class='question-component-bottom-left-right' id='question-component-bottom-left-right-"+i+"'></div>")
                $("#question-component-bottom-left-right-"+i).append("<div class='question-component-bottom-left' id='question-component-bottom-left-"+i+"'></div>")
                    $("#question-component-bottom-left-"+i).append("<div class='kc-block-title'>Number of responses</div>")
                    $("#question-component-bottom-left-"+i).append("<div class='res-list' id='res-list-"+i+"'></div>")
                    element.response.forEach((res,ind) =>{
                        $("#res-list-"+i).append("<div class='res-name-num' id='res-name-num-"+i+"-"+ind+"'></div>")
                            $("#res-name-num-"+i+"-"+ind).append("<div class='res-name'>"+res.name+"</div>")
                            $("#res-name-num-"+i+"-"+ind).append("<div class='kc-block-score'>"+res.num+"/"+element.total_res_num+"</div>")
                    })
                $("#question-component-bottom-left-right-"+i).append("<div class='question-component-bottom-right' id='question-component-bottom-right-"+i+"'></div>")
                    $("#question-component-bottom-right-"+i).append("<div class='correctness-block' id='correctness-block-"+i+"'></div>")
                        $("#correctness-block-"+i).append("<div class='kc-block-title'>correctness</div>")
                        $("#correctness-block-"+i).append("<div class='kc-block-score'>"+parseInt(element.correctness*100)+"%"+"</div>")
                    $("#question-component-bottom-right-"+i).append("<div class='difficulty-block' id='difficulty-block-"+i+"'></div>")
                        $("#difficulty-block-"+i).append("<div class='kc-block-title'>difficulty index</div>")
                        $("#difficulty-block-"+i).append("<div class='kc-block-score'>"+element.difficulty_index+"</div>")
                    $("#question-component-bottom-right-"+i).append("<div class='discrimination-block' id='discrimination-block-"+i+"'></div>")
                        $("#discrimination-block-"+i).append("<div class='kc-block-title'>discrimination index</div>")
                        $("#discrimination-block-"+i).append("<div class='kc-block-score'>"+element.discrimination_index+"</div>")
        $(".question-component-bottom").hide();
    })          
        
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
    current_page = "skill-mastery-main";
})
$("#detail-nav-origin").click(()=>{
    $("#skill-mastery-main").show();
    $(select_skill_id).css("background","");
    $(select_skill_id).css("box-shadow","");
    select_skill_id = '';

    $("#no-skill-selected").show();
    $("#select-skill").hide();
    $('#skill-mastery-activity-detail').hide();
    current_page = "skill-mastery-main";
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


function expand_annotation(id, src){
    var list = src.split("/");
    var img = list.pop();
    if (img == "open.png"){
        $("#"+id).attr("src", "asset/close.png");
        $("#right-body").show();
        $("#impact-main-grid-right").height($("#right-body").height()+36);
        $( window ).resize(function() {
            $("#impact-main-grid-right").height($("#right-body").height()+36);
        })
    }
    else{
        $("#"+id).attr("src", "asset/open.png");
        $("#right-body").hide();
        $("#impact-main-grid-right").height(24);
    }
}

//impact activity 

var impact_activity_data = [
    {
        name: "Discussion Board",
        total: 106,
        skill:[
            {name: "Communication", score: 24 },
            {name: "Team Building", score: 22},
            {name: "Apply Principles", score: 26},
            {name: "Ethics", score: 20},
            {name: "Critical Thinking", score: 14},
        ],
        insights:[
            "Discussion board is the most effective activity considering the impact on all kinds of skills",
            "Discussion board is most effective for cultivating Apply Principles skill."
        ]
    },
    {
        name: "Practice Activity",
        total: 94,
        skill:[
            {name: "Communication", score: 21 },
            {name: "Team Building", score: 19},
            {name: "Apply Principles", score: 14},
            {name: "Ethics", score: 13},
            {name: "Critical Thinking", score: 27},
        ],
        insights:[
            "Practice Activity is most effective for cultivating Critical Thinking skill."
        ]
    },
    {   
        name: "Reflection",
        total: 87,
        skill:[
            {name: "Communication", score: 15 },
            {name: "Team Building", score: 18},
            {name: "Apply Principles", score: 20},
            {name: "Ethics", score: 16},
            {name: "Critical Thinking", score: 18},
        ],
        insights:[
            "Reflection is most effective for cultivating Apply Principles skill."
        ]
    },
    {   
        name: "Knowledge Check",
        total: 80,
        skill:[
            {name: "Communication", score:  22},
            {name: "Team Building", score: 18 },
            {name: "Apply Principles", score: 14},
            {name: "Ethics", score: 13},
            {name: "Critical Thinking", score: 13},
        ],
        insights:[
            "Knowledge Check is most effective for cultivating Communication skill."
        ]
    }
]


function addImpactActivityComponent(index, data){
    $("#activity-set").append("<div id='impact-component-"+index+"'></div>");
    $("#impact-component-"+index).append("<div class='impact-component-top' id='impact-component-top-"+index+"'></div>")
    $("#impact-component-top-"+index).append("<div class='impact-component-title' id='impact-component-title-"+index+"'>"+data[index-1].name+"</div>")
    $("#impact-component-top-"+index).append("<div class='impact-component-total-arrow' id='impact-component-total-arrow-"+index+"'></div>")

    $("#impact-component-"+index).append("<div class='impact-component-bottom' id='impact-component-bottom-"+index+"'></div>")
    $("#impact-component-bottom-"+index).append("<div class='impact-component-skills' id='impact-component-skills-"+index+"'></div>")
    $("#impact-component-skills-"+index).append("<div class='impact-component-skills-title'>Impact on Each Skill</div>")
    
    $("#impact-component-skills-"+index).append("<div class='impact-component-skills-left-right' id='impact-component-skills-left-right-"+index+"'></div>")
    $("#impact-component-skills-left-right-"+index).append("<div class='impact-component-skills-left' id='impact-component-skills-left-"+index+"'></div>")
    $("#impact-component-skills-left-right-"+index).append("<div class='impact-component-skills-right' id='impact-component-skills-right-"+index+"'></div>")

    var total=0;
    data[index-1].skill.forEach((element,i) => {
        if (i<data[index-1].skill.length /2){
            $("#impact-component-skills-left-"+index).append("<div class='skills-name-score' id='skills-name-score-"+index+"-"+i+"'></div>")
        }
        else{
            $("#impact-component-skills-right-"+index).append("<div class='skills-name-score' id='skills-name-score-"+index+"-"+i+"'></div>")
        }
        $("#skills-name-score-"+index+"-"+i).append("<div class='impact-component-skills-name'>"+element.name+"</div>")
        $("#skills-name-score-"+index+"-"+i).append("<div class='impact-component-skills-score'>"+element.score+"</div>")
        total += element.score;
    })

    $("#impact-component-total-arrow-"+index).append("<div class='impact-component-total' id='impact-component-total-"+index+"'>Overall Impact: "+total+"</div>")
    $("#impact-component-total-arrow-"+index).append("<img class='impact-component-control' onclick='expandOrCollapse("+index+", this.id, this.src)' id='impact-component-control-"+index+"' src='asset/up-arrow.png'>")

    $("#impact-component-bottom-"+index).append("<div class='impact-component-insights' id='impact-component-insights-"+index+"'></div>")
    $("#impact-component-insights-"+index).append("<div class='impact-component-insights-title'>INSIGHTS</div>")
    $("#impact-component-insights-"+index).append("<ul class='impact-component-insights-list' id='impact-component-insights-list-"+index+"'></ul>")
    data[index-1].insights.forEach(element => {
        $("#impact-component-insights-list-"+index).append("<li>"+element+"</li>")
    })

    $(".impact-component-insights").width(Math.min(281,$(".impact-component-bottom").width()-$(".impact-component-skills").width()-68))
    $( window ).resize(function() {
        $(".impact-component-insights").width(Math.min(281,$(".impact-component-bottom").width()-$(".impact-component-skills").width()-68))
    })

    $("#impact-component-bottom-"+index).hide();
}

var new_impact_activity_data = impact_activity_data.slice(0);
new_impact_activity_data.sort(function(a, b) {
    return b.total - a.total
});
new_impact_activity_data.forEach((e,i)=>{
    addImpactActivityComponent(i+1, new_impact_activity_data)
})

function expandOrCollapse(index, id, src){
    //impact-component-control-
    var list = src.split("/");
    var img = list.pop();
    if (img == "up-arrow.png"){
        $("#"+id).attr("src", "asset/down-arrow.png");
        $("#impact-component-bottom-"+index).show();
    }
    else{
        $("#"+id).attr("src", "asset/up-arrow.png");
        $("#impact-component-bottom-"+index).hide();
    }
    $(".impact-component-insights").width(Math.min(281,$(".impact-component-bottom").width()-$(".impact-component-skills").width()-68))
}



$("#expand-all").click(()=>{
    $(".impact-component-bottom").show();
    $(".impact-component-control").attr("src", "asset/down-arrow.png");
    state="expand";
})

$("#collapse-all").click(()=>{
    $(".impact-component-bottom").hide();
    $(".impact-component-control").attr("src", "asset/up-arrow.png");
    state="collapse";
})

$("#sort-up").click(()=>{
    order = "up"
    $("#sort-up").attr("src", "asset/bi_sort-up-select.png")
    $("#sort-down").attr("src", "asset/bi_sort-down-unselect.png")

    $("#activity-set").empty();
    if (impact_page == "activity"){
        var new_impact_activity_data = impact_activity_data.slice(0);
        new_impact_activity_data.sort(function(a, b) {
            return a.total - b.total;
        });
        new_impact_activity_data.forEach((e,i)=>{
            addImpactActivityComponent(i+1, new_impact_activity_data)
        })
    }
    else{
        var new_impact_skill_data = impact_skill_data.slice(0);
        new_impact_skill_data.sort(function(a, b) {
            return a.total - b.total;
        });
        new_impact_skill_data.forEach((e,i)=>{
            addImpactSkillComponent(i+1, new_impact_skill_data)
        })
    }

    if (state=='expand'){
        $(".impact-component-bottom").show();
    }
})

$("#sort-down").click(()=>{
    order = "down"
    $("#sort-up").attr("src", "asset/bi_sort-up-unselect.png")
    $("#sort-down").attr("src", "asset/bi_sort-down-select.png")

    $("#activity-set").empty();
    if (impact_page == "activity"){
        var new_impact_activity_data = impact_activity_data.slice(0);
        new_impact_activity_data.sort(function(a, b) {
            return b.total - a.total;
        });
        new_impact_activity_data.forEach((e,i)=>{
            addImpactActivityComponent(i+1, new_impact_activity_data)
        })   
    }
    else{
        var new_impact_skill_data = impact_skill_data.slice(0);
        new_impact_skill_data.sort(function(a, b) {
            return b.total - a.total;
        });
        new_impact_skill_data.forEach((e,i)=>{
            addImpactSkillComponent(i+1, new_impact_skill_data)
        })
    }
    if (state=='expand'){
        $(".impact-component-bottom").show();
    }
})


//impact skill
var impact_skill_data = [
    {
        name: "Communication",
        total: 106,
        activity:[
            {name: "Discussion Board", score: 34 },
            {name: "Practice Activity", score: 28},
            {name: "Reflection", score: 26},
            {name: "Knowledge Check", score: 18},
        ],
        insights:[
            "The overall instruction is most effective on communication skill cultivating.",
            "Discussion board is most effective for cultivating the communication skill."
        ]
    },
    {
        name: "Team-building",
        total: 94,
        activity:[
            {name: "Discussion Board", score: 26 },
            {name: "Practice Activity", score: 24},
            {name: "Reflection", score: 23},
            {name: "Knowledge Check", score: 21},
        ],
        insights:[
            "The overall instruction is most effective on communication skill cultivating.",
            "Discussion board is most effective for cultivating the communication skill."
        ]
    },
    {
        name: "Ethics",
        total: 89,
        activity:[
            {name: "Discussion Board", score: 30 },
            {name: "Practice Activity", score: 22},
            {name: "Reflection", score: 19},
            {name: "Knowledge Check", score: 18},
        ],
        insights:[
            "The overall instruction is most effective on communication skill cultivating.",
            "Discussion board is most effective for cultivating the communication skill."
        ]
    },
    {
        name: "Apply Principles",
        total: 84,
        activity:[
            {name: "Discussion Board", score: 29 },
            {name: "Practice Activity", score: 21},
            {name: "Reflection", score: 20},
            {name: "Knowledge Check", score: 14},
        ],
        insights:[
            "The overall instruction is most effective on communication skill cultivating.",
            "Discussion board is most effective for cultivating the communication skill."
        ]
    },
    {
        name: "Critical Thinking",
        total: 79,
        activity:[
            {name: "Discussion Board", score: 26 },
            {name: "Practice Activity", score: 24},
            {name: "Reflection", score: 19},
            {name: "Knowledge Check", score: 10},
        ],
        insights:[
            "The overall instruction is most effective on communication skill cultivating.",
            "Discussion board is most effective for cultivating the communication skill."
        ]
    }
]

function addImpactSkillComponent(index, data){
    $("#activity-set").append("<div id='impact-component-"+index+"'></div>");
    $("#impact-component-"+index).append("<div class='impact-component-top' id='impact-component-top-"+index+"'></div>")
    $("#impact-component-top-"+index).append("<div class='impact-component-title' id='impact-component-title-"+index+"'>"+data[index-1].name+"</div>")
    $("#impact-component-top-"+index).append("<div class='impact-component-total-arrow' id='impact-component-total-arrow-"+index+"'></div>")

    $("#impact-component-"+index).append("<div class='impact-component-bottom' id='impact-component-bottom-"+index+"'></div>")
    $("#impact-component-bottom-"+index).append("<div class='impact-component-skills' id='impact-component-skills-"+index+"'></div>")
    $("#impact-component-skills-"+index).append("<div class='impact-component-skills-title'>Contribution of Each Activity</div>")

    $("#impact-component-skills-"+index).append("<div class='impact-component-skills-activity-svg' id='impact-component-skills-activity-svg-"+index+"'></div>")
    $("#impact-component-skills-activity-svg-"+index).append("<div class='impact-component-activity' id='impact-component-activity-"+index+"'></div>")
    $("#impact-component-skills-activity-svg-"+index).append("<div class='impact-component-svg' id='impact-component-svg-"+index+"'></div>")

    var total=0;
    var colorList=["#8C1A11", "rgba(140, 26, 17, 0.6)", "rgba(140, 26, 17, 0.4)", "rgba(140, 26, 17, 0.2)"];
    data[index-1].activity.forEach((element,i) => {
        $("#impact-component-activity-"+index).append("<div class='color-name-score' id='color-name-score-"+index+"-"+i+"'></div>")
        $("#color-name-score-"+index+"-"+i).append("<div class='color-name' id='color-name-"+index+"-"+i+"'></div>")
        $("#color-name-"+index+"-"+i).append("<svg><rect class='impact-component-activities-color' id='impact-component-activities-color-"+index+"-"+i+"'></rect></svg>")

        $("#impact-component-activities-color-"+index+"-"+i).attr("fill", colorList[i])

        $("#color-name-"+index+"-"+i).append("<div class='impact-component-activities-name'>"+element.name+"</div>")
        $("#color-name-score-"+index+"-"+i).append("<div class='impact-component-activities-score'>"+element.score+"</div>")
        total += element.score;
    })

    $("#impact-component-total-arrow-"+index).append("<div class='impact-component-total' id='impact-component-total-"+index+"'>Overall Improvement: "+total+"</div>")
    $("#impact-component-total-arrow-"+index).append("<img class='impact-component-control' onclick='expandOrCollapse("+index+", this.id, this.src)' id='impact-component-control-"+index+"' src='asset/up-arrow.png'>")

    $("#impact-component-bottom-"+index).append("<div class='impact-component-insights' id='impact-component-insights-"+index+"'></div>")
    $("#impact-component-insights-"+index).append("<div class='impact-component-insights-title'>INSIGHTS</div>")
    $("#impact-component-insights-"+index).append("<ul class='impact-component-insights-list' id='impact-component-insights-list-"+index+"'></ul>")
    data[index-1].insights.forEach(element => {
        $("#impact-component-insights-list-"+index).append("<li>"+element+"</li>")
    })

    $(".impact-component-insights").width(Math.min(321,$(".impact-component-bottom").width()-$(".impact-component-skills").width()-68))
    $(".impact-component-insights").height(190)
    $( window ).resize(function() {
        $(".impact-component-insights").width(Math.min(321,$(".impact-component-bottom").width()-$(".impact-component-skills").width()-68))
        $(".impact-component-insights").height($("#impact-component-skills").height())
    })

    $("#impact-component-bottom-"+index).hide();
}

$("#group-control-left").click(()=>{
    $("#group-control-left").removeClass("control-unselected");
    $("#group-control-left").addClass("control-selected");

    $("#group-control-right").addClass("control-unselected");
    $("#group-control-right").removeClass("control-selected");

    impact_page = "skill"

    $("#activity-set").empty();
    var new_impact_skill_data = impact_skill_data.slice(0);
    new_impact_skill_data.sort(function(a, b) {
        if (order=='down'){return b.total - a.total}
        else{return a.total - b.total}
    });
    new_impact_skill_data.forEach((e,i)=>{
        addImpactSkillComponent(i+1, new_impact_skill_data)
    })
    if (state=='expand'){
        $(".impact-component-bottom").show();
    }
})

$("#group-control-right").click(()=>{
    $("#group-control-left").removeClass("control-selected");
    $("#group-control-left").addClass("control-unselected");

    $("#group-control-right").addClass("control-selected");
    $("#group-control-right").removeClass("control-unselected");

    impact_page = "activity";

    $("#activity-set").empty();
    var new_impact_activity_data = impact_activity_data.slice(0);
    new_impact_activity_data.sort(function(a, b) {
        if (order=='down'){return b.total - a.total}
        else{return a.total - b.total}
    });
    new_impact_activity_data.forEach((e,i)=>{
        addImpactActivityComponent(i+1, new_impact_activity_data)
    })
    if (state=='expand'){
        $(".impact-component-bottom").show();
    }
})