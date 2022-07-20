var select_page = "skill";
var select_skill_id="";

$(document).ready(()=>{
    $("#skill").css("border-bottom", "3px solid #8C1A11");
    setBarContainerHeight();

    //write it to session storage later
    $("#no-skill-selected").show();
    $("#select-skill").hide();
})

$( window ).resize(function() {
    setBarContainerHeight();
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

function createActivityComponent(index, name, type, due_time, score,max_score){
    $("#activities-set").append("<div class='activity-component' id='activity-component-"+index+"'></div>")
    $("#activity-component-"+index).append("<div class='icon-type-name' id='icon-type-name-"+index+"'></div>")

    $("#icon-type-name-"+index).append("<div class='type-name' id='type-name-"+index+"'></div>")
    $("#type-name-"+index).append("<div class='activity-type' id='type-"+index+"'>"+type+"</div>")
    $("#type-name-"+index).append("<div class='activity-name' id='name-"+index+"'>"+name+"</div>")

    $("#activity-component-"+index).append("<p class='activity-placeholder'></p>")

    $("#activity-component-"+index).append("<p class='activity-time' id='time-"+index+"'>"+due_time+"</p>")
    $("#activity-component-"+index).append("<p class='activity-score' id='score-"+index+"'>"+score+"/"+max_score+"</p>")
}

createActivityComponent(1, "The Acquisition Life Cycle", "Knowledge Check", "Jul 3 2022 by 7:59pm", 9.75, 10)
createActivityComponent(2, "The Acquisition Life Cycle", "Knowledge Check", "Jul 3 2022 by 7:59pm", 9.75, 10)
createActivityComponent(3, "The Acquisition Life Cycle", "Knowledge Check", "Jul 3 2022 by 7:59pm", 9.75, 10)
createActivityComponent(4, "The Acquisition Life Cycle", "Knowledge Check", "Jul 3 2022 by 7:59pm", 9.75, 10)
createActivityComponent(5, "The Acquisition Life Cycle", "Knowledge Check", "Jul 3 2022 by 7:59pm", 9.75, 10)
createActivityComponent(6, "The Acquisition Life Cycle", "Knowledge Check", "Jul 3 2022 by 7:59pm", 9.75, 10)
createActivityComponent(7, "The Acquisition Life Cycle", "Knowledge Check", "Jul 3 2022 by 7:59pm", 9.75, 10)

