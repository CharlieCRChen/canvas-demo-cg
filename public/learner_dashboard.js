var mastery_level_data = [
    {
        name: "Team-building",
        score: 96,
        state: "Ahead of the pack"
    },
    {
        name: "Communication",
        score: 92,
        state: "Ahead of the pack"
    },
    {
        name: "Ethics",
        score: 89,
        state: "Mastered"
    },
    {
        name: "Apply Principles",
        score: 86,
        state: "Mastered"
    },
    {
        name: "Critical Thinking",
        score: 82,
        state: "Need more practice"
    },
]

var comming_soon_activity = [
    {
        type:"practice activity",
        title:"Effective Nonverbal Communication",
        due:"Jul 24, 2022 by 7:59 pm",
        score: 10
    },
    {
        type:"knowledge check",
        title:"Contract Validity",
        due:"Jul 27, 2022 by 7:59 pm",
        score: 10
    },
    {
        type:"practice activity",
        title:"Contract Validity",
        due:"Jul 31, 2022 by 7:59 pm",
        score: 20
    },
    {
        type:"knowledge check",
        title:"Market Research Overview",
        due:"Aug 3, 2022 by 7:59 pm",
        score: 10
    },
    {
        type:"discussion",
        title:"The Contracting File in your Organization",
        due:" Aug 7, 2022 by 7:59 pm",
        score: 10
    }
]

var main_activity = [
    {
        type:'knowledge check',
        name:'The Acquisition Life Cycle',
        due:'Jul 3, 2022 by 7:59pm',
        score:7,
        max_point: 10
    },
    {
        type:'practice activity',
        name:'Effective Written Communication',
        due:'Jul 6, 2022 by 7:59pm',
        score:19,
        max_point: 20,
        rubrics:[
            {
                name: 'Purpose',
                rubric_score: 5,
                rubric_max_point: 5,
                feedback: "Great work! You highlight the purpose of the message in your email and it is evident that you understand it!"
            },
            {
                name: 'Audience',
                rubric_score: 5,
                rubric_max_point: 5,
                feedback: "Your submission shows grat clarity and it is evident that you understand who your audience is and that you have tailored the content, tone and structure for the audience. "
            },
            {
                name: 'Structure, grammar and tone',
                rubric_score: 5,
                rubric_max_point: 5,
                feedback: "Great work here too! There were no obvious structural or grammatical errors. You also used a formal tone to write the email."
            },
            {
                name: 'Attributes of contents',
                rubric_score: 4,
                rubric_max_point: 5,
                feedback: "You forgot to mention your availability in the email. It is important to ensure that all details are covered. "
            }
        ]
    },
    {
        type:'knowledge check',
        name:'Researching Basic Contracting Statutes',
        due:'Jul 9, 2022 by 7:59pm',
        score:8.75,
        max_point: 10
    },
    {
        type:'discussion',
        name:'Incentives and Motivation',
        due:'Jul 12, 2022 by 7:59pm',
        score:10,
        max_point: 10
    },
    {
        type:'knowledge check',
        name:'Acquisition Phases',
        due:'Jul 15, 2022 by 7:59pm',
        score:9,
        max_point: 10
    },
    {
        type:'knowledge check',
        name:'Authority',
        due:'Jul 18, 2022 by 7:59pm',
        score:8,
        max_point: 10
    },
    {
        type:'practice activity',
        name:'FAR Citation',
        due:'Jul 21, 2022 by 7:59pm',
        score:9.75,
        max_point: 10,
        rubrics:[
            {
                name: 'Purpose',
                rubric_score: 2.5,
                rubric_max_point: 2.5,
                feedback: "Great work! You highlight the purpose of the message in your email and it is evident that you understand it!"
            },
            {
                name: 'Audience',
                rubric_score: 2.5,
                rubric_max_point: 2.5,
                feedback: "Your submission shows grat clarity and it is evident that you understand who your audience is and that you have tailored the content, tone and structure for the audience. "
            },
            {
                name: 'Structure, grammar and tone',
                rubric_score: 2.5,
                rubric_max_point: 2.5,
                feedback: "Great work here too! There were no obvious structural or grammatical errors. You also used a formal tone to write the email."
            },
            {
                name: 'Attributes of contents',
                rubric_score: 2.25,
                rubric_max_point: 2.5,
                feedback: "You forgot to mention your availability in the email. It is important to ensure that all details are covered. "
            }
        ]
    },
    {
        type:'discussion',
        name:'Acquisition Phrases in Your Organization',
        due:'Jul 24, 2022 by 7:59pm',
        score:10,
        max_point: 10
    },
    {
        type:'discussion',
        name:'FAR',
        due:'Jul 27, 2022 by 7:59pm',
        score:9.75,
        max_point: 10
    },
]

$(document).ready(()=>{
    $("#skill-detail").hide();
    $("#right-annotation-content").hide();
    $("#skill-coming-soon-page").hide();
    $("#list-activity-detail-page").hide();
})

function updateSkillComponent(data){
    data.forEach((element, index)=>{
        $("#component-set").append("<div class='skill-component' id='skill-component-"+index+"'></div>")
        $("#skill-component-"+index).append("<div class='skill-component-left' id='skill-component-left-"+index+"'></div>")
            $("#skill-component-left-"+index).append("<div class='skill-component-left-state' id='skill-component-left-state-"+index+"'>"+element.state+"</div>")
            $("#skill-component-left-"+index).append("<div class='component-name-score' id='component-name-score-"+index+"'></div>")    
                $("#component-name-score-"+index).append("<div class='skill-component-left-name'>"+element.name+"</div>")
                $("#component-name-score-"+index).append("<div class='skill-component-left-score' id='skill-component-left-score-"+index+"'>"+element.score+"</div>")
                if (element.state=="Need more practice"){
                    $("#skill-component-left-state-"+index).css("background", "#D60E0E");
                    $("#skill-component-left-score-"+index).css("color", "#D60E0E");
                }

        $("#skill-component-"+index).append("<div class='skill-component-right' id='skill-component-right-"+index+"'></div>")
            $("#skill-component-right-"+index).append("<div class='svg-bar-placeholder'></div>");
            $("#skill-component-right-"+index).append("<img src='asset/learner-right-arrow.png'>");

        activityComponentInteraction("#skill-component-"+index, element.name)
    })
}

function activityComponentInteraction(id, name){
    $(id).mouseover(()=>{
        $(id).css("background","#FFFFFF");
        $(id).css("box-shadow","2px 4px 12px rgba(114, 114, 114, 0.25)");
    })

    $(id).mouseout(()=>{
        $(id).css("background","");
        $(id).css("box-shadow","");
    })

    $(id).click(()=>{
        $("#nav-skill").show();
        $("#nav-arrow-1").show();
        $("#nav-skill").text(name);
        $("#nav-main").css("color",'#8C1A11');
        $("#nav-main").css("cursor","pointer");
        $('#skill-side-main').hide();
        $('#skill-detail').show();

        updateSkillDetail(name,comming_soon_activity);
        updateSkillDetailActivity(main_activity);
    })   
}

$("#nav-main").click(()=>{
    $('#skill-side-main').show();
    $("#nav-main").css("cursor","");
    $("#nav-main").css("color",'#313131');
    $('#skill-detail').hide();

    $("#nav-arrow-1").hide();
    $("#nav-skill").hide();

    $("#nav-arrow-2").hide();
    $("#nav-activity-detail").hide();
})

function updateSkillDetail(skill,data){
    
    //annotation
    $("#right-annotation-title").text("Why "+skill+"?")

    //comming soon
    $("#coming-soon-activity-set").empty();
    data.forEach((element, index)=>{
        $("#coming-soon-activity-set").append("<div class='comming-soon-component' id='comming-soon-component-"+index+"' ></div>")
        $("#comming-soon-component-"+index).append("<div class='type-score' id='type-score-"+index+"'></div>")
            $("#type-score-"+index).append("<div class='comming-soon-component-type'>"+element.type+"</div>")
            $("#type-score-"+index).append("<div class='comming-soon-component-score'>Score: "+element.score+"</div>")
        $("#comming-soon-component-"+index).append("<div class='comming-soon-component-title' id='comming-soon-component-title-"+index+"'>"+element.title+"</div>") 
        $("#comming-soon-component-"+index).append("<div class='comming-soon-component-due' id='comming-soon-component-due-"+index+"'>"+element.due+"</div>") 
        
        $('#comming-soon-component-'+index).click(()=>{
            $("#skill-detail").hide();
            $("#skill-coming-soon-page").show();

            $("#coming-soon-page-header-type").text(element.type);
            $("#coming-soon-page-header-name").text(element.title);

            $("#nav-skill").css("color", "#8C1A11");
            $("#nav-skill").css("cursor", "pointer");
            $("#nav-arrow-2").show();
            $("#nav-activity-detail").show();
        })
    })
}

$("#nav-skill").click(()=>{
    $("#skill-detail").show();
    $("#skill-coming-soon-page").hide();
    $("#list-activity-detail-page").hide();

    $("#nav-skill").css("color", "#313131");
    $("#nav-skill").css("cursor", "");

    $("#nav-arrow-2").hide();
    $("#nav-activity-detail").hide();
})

updateSkillComponent(mastery_level_data)

function expand_annotation(id, src){
    var list = src.split("/");
    var img = list.pop();
    if (img=='open.png') {
        $("#"+id).attr("src", "asset/close.png");
        $("#right-annotation-content").show();
    }
    else{
        $("#"+id).attr("src", "asset/open.png");
        $("#right-annotation-content").hide();
    }
}

function updateSkillDetailActivity(data){
    $("#skill-detail-activity-set").empty();
    data.forEach((element, index)=>{
        $("#skill-detail-activity-set").append("<div class='detail-activity-component' id='detail-activity-component-"+index+"'></div>");
        $("#detail-activity-component-"+index).append("<div class='component-listed-activity' id='component-listed-activity-"+index+"'></div>")
            $("#component-listed-activity-"+index).append("<img id='component-listed-activity-img-"+index+"' src=''>")
            $("#component-listed-activity-"+index).append("<div class='listed-activity-type-name' id='listed-activity-type-name-"+index+"'></div>")
            $("#listed-activity-type-name-"+index).append("<div class='listed-activity-type' id='listed-activity-type-"+index+"'>"+element.type+"</div>")
            $("#listed-activity-type-name-"+index).append("<div class='listed-activity-name'>"+element.name+"</div>")
        
            if (element.type=='knowledge check'){
                $("#component-listed-activity-img-"+index).attr("src","asset/icon/knowledge-check.png");
                $("#listed-activity-type-"+index).css("color","#4A2E5C")
            }
            else if (element.type=='practice activity'){
                $("#component-listed-activity-img-"+index).attr("src","asset/icon/practice-activity.png");
                $("#listed-activity-type-"+index).css("color","#A5892B")
            }
            else{
                $("#component-listed-activity-img-"+index).attr("src","asset/icon/discussion.png");
                $("#listed-activity-type-"+index).css("color","#006038")
            }
        $("#detail-activity-component-"+index).append("<div class='component-due-time'>"+element.due+"</div>")
        $("#detail-activity-component-"+index).append("<div class='component-your-score'>"+element.score+"/"+element.max_point+"</div>")
    
        skillDetailActivityComponentInteraction("#detail-activity-component-"+index, element.name, element.type, element.score, element.max_point, element.rubrics)
    
    })
}

function skillDetailActivityComponentInteraction(id, name, type, score, max_point, rubrics){
    $(id).mouseover(()=>{
        $(id).css("background","#FFFFFF");
        $(id).css("box-shadow","2px 4px 12px rgba(114, 114, 114, 0.25)");
    })

    $(id).mouseout(()=>{
        $(id).css("background","");
        $(id).css("box-shadow","");
    })

    $(id).click(()=>{
        if (type == 'practice activity'){
            $("#skill-detail").hide();
            $("#list-activity-detail-page").show();
            $("#list-activity-detail-body-practice-activity").show();
            $("#list-activity-detail-body-knowledge-check").hide();

            $("#list-activity-detail-header-type").text(type);
            $("#list-activity-detail-header-name").text(name);
            $("#list-activity-detail-header-score").text(score+"/"+max_point);

            $("#nav-skill").css("color", "#8C1A11");
            $("#nav-skill").css("cursor", "pointer");
            $("#nav-arrow-2").show();
            $("#nav-activity-detail").show();

            $("#practice-activity-feedback-set").empty();

            rubrics.forEach((element, index)=>{
                $("#practice-activity-feedback-set").append("<div class='feedback-component' id='feedback-component-"+index+"'></div>");
                $("#feedback-component-"+index).append("<div class='feedback-component-name'>"+element.name+"</div>");
                $("#feedback-component-"+index).append("<div class='feedback-component-score'>"+element.rubric_score+'/'+element.rubric_max_point+"</div>");
                $("#feedback-component-"+index).append("<div class='feedback-component-feedback'>"+element.feedback+"</div>");

                if (index < rubrics.length-1){
                    $("#feedback-component-"+index).css("border-bottom", "1px solid #D6D6D6")
                }
            })
        }
        
        else if(type == 'knowledge check'){
            $("#skill-detail").hide();
            $("#list-activity-detail-page").show();
            $("#list-activity-detail-body-practice-activity").hide();
            $("#list-activity-detail-body-knowledge-check").show();

            $("#list-activity-detail-header-type").text(type);
            $("#list-activity-detail-header-name").text(name);
            $("#list-activity-detail-header-score").text(score+"/"+max_point);

            $("#nav-skill").css("color", "#8C1A11");
            $("#nav-skill").css("cursor", "pointer");
            $("#nav-arrow-2").show();
            $("#nav-activity-detail").show();
        }
    })   
}

