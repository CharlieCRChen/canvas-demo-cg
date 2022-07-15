// var svg = d3.select("body")
//             .append("svg")
//             .attr("width", 339)
//             .attr("height", 580)
//             .style("background-color","#F9F9F9");

function createComponent(min, max, low, high, avg, y, name, mastered=true){
    var width = 309;
    var x = 15;
    var height = 9;

    var component = svg.append("svg")
                        .attr("width", 339)
                        .attr("height", 81)
                        .attr("x",0)
                        .attr("y",y);

    var title = component.append("text")
                    .attr("x", 15)
                    .attr("y", 15)
                    .style("font-family","Lato")
                    .style("font-size","14pt")
                    .text(function(){return name})

    var rect_bg = component.append("rect")
                    .attr("x", x)
                    .attr("y", 36)
                    .attr("width", width)
                    .attr("height", height)
                    .attr("fill", function(){if(mastered == true){return '#1DA26B'} else{return '#EF786F'}})
                    .attr("rx", 4)
                    .attr("opacity", 0.2)

    var rect_val = component.append("rect")
                    .attr("x", x+width * (low-min)/(max-min))
                    .attr("y", 36)
                    .attr("width", (high-low)/(max-min)*width)
                    .attr("height", height)
                    .attr("fill", function(){if(mastered == true){return '#1DA26B'} else{return '#EF786F'}})
                    .attr("rx", 4)
                    .attr("opacity", 0.6)
    
    var rect_avg = component.append("rect")
                    .attr("x", x + (x+width)*(avg-min)/(max-min))
                    .attr("y", 9.5)
                    .attr("width", 15)
                    .attr("height", 15)
                    .attr("fill", '#FFFFFF')
                    .attr("stroke", function(){if(mastered == true){return '#1DA26B'} else{return '#EF786F'}})
                    .attr("stroke-width", 3)
                    .attr("transform", "rotate(45,"+(x-20 + (width)*(avg-min)/(max-min))+","+9.5+")")
    
    var min_num = component.append("text")
                    .attr("x", 15)
                    .attr("y", 70)
                    .style("font-family","Lato")
                    .style("font-size","12pt")
                    .style("fill", "#8C8888")
                    .text(function(){return min})
    
    var max_num = component.append("text")
                    .attr("x", width-10)
                    .attr("y", 70)
                    .style("font-family","Lato")
                    .style("font-size","12pt")
                    .style("fill", "#8C8888")
                    .text(function(){return max})

    var low_num = component.append("text")
                    .attr("x", x+(low-min)/(max-min)*width)
                    .attr("y", 70)
                    .style("font-family","Lato")
                    .style("font-size","12pt")
                    .style("fill", "#313131")
                    .text(function(){return low})
    
    var high_num = component.append("text")
                    .attr("x", x-16+(high-min)/(max-min)*width)
                    .attr("y", 70)
                    .style("font-family","Lato")
                    .style("font-size","12pt")
                    .style("fill", "#313131")
                    .text(function(){return high})
    
    var avg_num = component.append("text")
                    .attr("x", x-8+(avg-min)/(max-min)*width)
                    .attr("y", 70)
                    .style("font-family","Lato")
                    .style("font-size","12pt")
                    .style("fill", "#313131")
                    .text(function(){return avg})
}

// createComponent(60, 100, 70, 96, 89, 30, "TEAM-BUILDING", true)
// createComponent(60, 100, 80, 96, 88, 145, "APPLY PRINCIPLES", true)
// createComponent(60, 100, 78, 93, 86, 259, "COMMUNICATION", true)
// createComponent(60, 100, 75, 90, 82, 374, "ETHICS", true)
// createComponent(60, 100, 72, 88, 79, 490, "CRITICAL THINKING", false)


$("#btn-getData").click(() => {

    var params = {val:'mastery_level'};
    $.ajax({
        type:'GET',
        url:'https://canvas-demo-cg.herokuapp.com/mastery_level',
        data: JSON.stringify(params),
        processData: false,
        contentType: 'application/json',
        dataType: 'json'
    })
    .then((ret) => {
        console.log(ret);
        $('#container').empty()
        ret.forEach(element => {
            $('#container').append('<h3>Student '+element['student']['id'] + ': ' +element['student']['name']+'</h3>')
            var skillset = ["Communication","Apply Acquisition Principles","Critical Thinking & Problem Solving",'Ethics',"Team-Building"];
            skillset.forEach((skill, index) => {
                $('#container').append('<p>Mastery rate for '+skill + ': ' + Math.round(100*element['mastery_level'][index+1])+'</p>')
                var id = element['student']['name'].split(" ")[0]+(index+1)
                $('#container').append("<svg id="+id+"></svg>")
                dataset = getData(element['distribution'][index+1]);
                create_support_viz(dataset, id);
            })
        });
    })
})

function getData(elements){
    var idx = [0,0.2,0.4,0.6,0.8,1]
    var d = []
    for (var i=0; i<idx.length; i++){
        if (elements[idx[i]]>0){
            d.push(elements[idx[i]])
        }
        else{
            d.push(0)
        }
    }
    return d
}

function create_support_viz(dataset, id){
    var w = 200;
    var h = 50;
    var barPadding = 1; 
    var svg = d3.select('#'+id)
            .attr("width", w)
            .attr("height", h);
    
    svg.selectAll("*").remove();
    
    svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("x", function(d, i) {
                return i * (w / dataset.length - barPadding);
            })
            .attr("y", function(d) {
                return h - d - 20; 
            })
            .attr("width", 20)
            .attr("height", function(d) {
                return d;
            })
            .attr("fill", "teal")
    
    svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
            .text(function(d,i) {
                x = [0,0.2,0.4,0.6,0.8,1]
                return x[i];
           })
           .attr("x", function(d, i) {
                return i * (w / dataset.length - barPadding) + 5;
            })
           .attr("y", function(d) {
                return h;
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "11px");

}