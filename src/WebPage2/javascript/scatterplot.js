
var xdata = [];
var ydata = [];
var media1 = 0;
var media2 = 0;
var media3 = 0;
var media4 = 0;
var tooltip2;
function showDistribuicaoReprovacao(){
	d3.select("#infos2").select("svg").remove();
	d3.select("#infos").select("svg").remove();
	$("#infos").empty();
	$("#infos2").empty();
	


	tooltip2 = d3.select("#infos")
		.append("div")	//TODO ver isso depois
		.style("position", "absolute","red")
		.style("z-index", "10")
		.style("visibility", "hidden")
		.style("stroke","red");	

xdata = [];
ydata = [];
media1 = 0;
media2 = 0;
media3 = 0;
media4 = 0;
n1 = 0;
n2 = 0;
n3 = 0;
n4 = 0;

for (var i = 0; i < dados_repetencia.length; i++) {
	if (dados_repetencia[i].disciplina == id_disciplina) {
		ydata[i] = dados_repetencia[i].media;
	};
};

for (var i = 0; i < dados_repetencia.length; i++) {
	if (dados_repetencia[i].disciplina == id_disciplina) {
		xdata[i] = dados_repetencia[i].vez;
	}
};

for (var i = 0; i < ydata.length; i++) {
	if (xdata[i] == 1) {
		media1 = media1 + Number(ydata[i]);
		n1++;
	}
	else if (xdata[i] == 2) {
		media2 = media2 + Number(ydata[i]);
		n2++;
	}
	else if (xdata[i] == 3) {
		media3 = media3 + Number(ydata[i]);
		n3++;
	}
	else if (xdata[i] == 4) {
		media4 = media4 + Number(ydata[i]);
		n4++;
	}

}
media1 = media1/n1;
media2 = media2/n2;
media3 = media3/n3;
media4 = media4/n4;

// size and margins for the chart
var margin = {top: 20, right: 20, bottom: 60, left: 200}
  , width = 600 - margin.left - margin.right
  , height = 500 - margin.top - margin.bottom;

// x and y scales, I've used linear here but there are other options
// the scales translate data values to pixel values for you
var x = d3.scale.linear()
          .domain([0,4.9])  // the range of the values to plot
          .range([ 0, width]);        // the pixel range of the x-axis

var y = d3.scale.linear()
          .domain([0, 10])
          .range([ height, 0 ]);


// the chart object, includes all margins
var chart = d3.select('#infos')
.append('svg')
.attr('width', width + margin.right + margin.left)
.attr('height', height + margin.top + margin.bottom)
.attr('class', 'chart')

// the main object where the chart and axis will be drawn
var main = chart.append('g')
.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
.attr('width', width)
.attr('height', height)
.attr('class', 'main')   

// draw the x axis
var xAxis = d3.svg.axis()
.scale(x)
.ticks(5)
.orient('bottom');

main.append('g')
.attr('transform', 'translate(0,' + height + ')')
.attr('class', 'main axis date')
.call(xAxis);

// draw the y axis
var yAxis = d3.svg.axis()
.scale(y)
.ticks(10)
.orient('left');

main.append('g')
.attr('transform', 'translate(0,0)')
.attr('class', 'main axis date')
.call(yAxis);

// draw the graph object
var g = main.append("g"); 

/*Desenhando as notas*/
g.selectAll("scatter-dots")
  .data(ydata)  // using the values in the ydata array
  .enter().append("svg:circle")  // create a new circle for each value
      .attr("cy", function (d) { return y(d); } ) // translate y value to a pixel
      .attr("cx", function (d,i) { return x(xdata[i]); } ) // translate x value
      .attr("r", 5) // radius of circle
      .style("opacity", 0.15)
      .style("fill","blue")
      .on("mouseout", mouseoutMedia)
	      .on("mousemove",function(d){
	      	tooltip2.style("top", (event.pageY-10)+"px").style("left",(event.pageX+17)+"px").style({color: 'black'});
			tooltip2.text("Nota: "+ Number(d).toFixed(1));  
    		tooltip2.style("visibility", "visible");
	      }); // opacity of circle


/*Desenhando as médias*/
if(media1>0){
	g.append("svg:circle")  // create a new circle for each value
	      .attr("cy", function (d) { return y(media1); } ) // translate y value to a pixel
	      .attr("cx", function (d,i) { return x(1); } ) // translate x value
	      .attr("r", 8) // radius of circle
	      .style("opacity", 0.7)
	      .style("fill","red")
          .on("mouseout", mouseoutMedia)
	      .on("mousemove",function(){

	      	tooltip2.style("top", (event.pageY-10)+"px").style("left",(event.pageX+17)+"px").style({color: 'black'});
			tooltip2.text("Média: "+ media1.toFixed(1));  
    		tooltip2.style("visibility", "visible");
	      });
}

if(media2>0){
	g.append("svg:circle")  // create a new circle for each value
	      .attr("cy", function (d) { return y(media2); } ) // translate y value to a pixel
	      .attr("cx", function (d,i) { return x(2); } ) // translate x value
	      .attr("r", 8) // radius of circle
	      .style("opacity", 0.7)
	      .style("fill","red")
	      .on("mouseout", mouseoutMedia)
	      .on("mousemove",function(){

	      	tooltip2.style("top", (event.pageY-10)+"px").style("left",(event.pageX+17)+"px").style({color: 'black'});
			tooltip2.text("Média: "+ media2.toFixed(1));  
    		tooltip2.style("visibility", "visible");
	      });; // opacity of circle
}

if(media3>0){
	g.append("svg:circle")  // create a new circle for each value
	      .attr("cy", function (d) { return y(media3); } ) // translate y value to a pixel
	      .attr("cx", function (d,i) { return x(3); } ) // translate x value
	      .attr("r", 8) // radius of circle
	      .style("opacity", 0.7)
	      .style("fill","red")
	      .on("mouseout", mouseoutMedia)
	      .on("mousemove",function(){

	      	tooltip2.style("top", (event.pageY-10)+"px").style("left",(event.pageX+17)+"px").style({color: 'black'});
			tooltip2.text("Média: "+ media3.toFixed(1));  
    		tooltip2.style("visibility", "visible");
	      });; // opacity of circle
}

if(media4>0){
	g.append("svg:circle")  // create a new circle for each value
	      .attr("cy", function (d) { return y(media4); } ) // translate y value to a pixel
	      .attr("cx", function (d,i) { return x(4); } ) // translate x value
	      .attr("r", 8) // radius of circle
	      .style("opacity", 0.7)
	      .style("fill","red")
	      .on("mouseout", mouseoutMedia)
	      .on("mousemove",function(){

	      	tooltip2.style("top", (event.pageY-10)+"px").style("left",(event.pageX+17)+"px").style({color: 'black'});
			tooltip2.text("Média: "+ media4.toFixed(1));  
    		tooltip2.style("visibility", "visible");
	      });; // opacity of circle
}

}

//----------------------------  Eventos -------------------------
function mouseoutMedia(d) {
	tooltip2.style("visibility", "hidden");
}

