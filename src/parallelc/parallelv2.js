var m ,//
    w, //calcula a largura das colunas
    h; //calcula a altura das colunas

var x,
    y = {},
    dragging = {};

var line = d3.svg.line(),
    axis = d3.svg.axis().orient("left"),
    background,
    foreground;

var svg;


//@width  largura do svg
//@height altura do svg
function buildSvg(width, height){	

	d3.select("#info2").select("svg").remove();
	svg = d3.select("#info2");
	svg = d3.select("#info2").append("svg")
		.attr("width", width)
		.attr("height", height);

}

//@inicia as variaveis iniciais das cordenadas paralelas e instancia o svg
//@width  largura do svg
//@height altura do svg
function init(width, height){
	m = [10, 10, 10, 10],
	w = width - m[1] - m[3],  //calcula a largura das colunas
        h = height - m[0] - m[2];  //calcula a altura das colunas

        x = d3.scale.ordinal().rangePoints([0, w], 1);	
	buildSvg(width, height);
}

//@ smin = valor minimo da escala da coluna
//@ smax = valor maximo da escala da coluna
//OBS. para nao processar a coluna especificada colocar o caractere '#' no inicio do nome do campo
function executa(data_file, smin,smax){

	d3.csv(data_file, function(data) {

	  // Extract the list of dimensions and create a scale for each.
	  x.domain(dimensions = d3.keys(data[0]).filter(function(d) {

	    //d[0] != "#" -> se o primeiro caractere do nome do campo for # entao nao 'adicione' a coluna
	    return d[0] != "#" && (y[d] = d3.scale.linear()
		.domain([smin,smax])
		.range([h, 0]));
	  }));
	
	

	  // Add grey background lines for context.
	  background = svg.append("svg:g")
	      .attr("class", "background")
	    .selectAll("path")
	      .data(data)
	    .enter().append("svg:path")
	      .attr("d", path);

	  // Add blue foreground lines for focus.
	  foreground = svg.append("svg:g")
	      .attr("class", "foreground")
	    .selectAll("path")
	      .data(data)
	    .enter().append("svg:path")
	      .attr("d", path);

	  // Add a group element for each dimension.
	  var g = svg.selectAll(".dimension")
	      .data(dimensions)
	    .enter().append("svg:g")
	      .attr("class", "dimension")
	      .attr("transform", function(d) { return "translate(" + x(d) + ")"; })
	      .call(d3.behavior.drag()
		.on("dragstart", function(d) {
		  dragging[d] = this.__origin__ = x(d);
		  background.attr("visibility", "hidden");
		})
		.on("drag", function(d) {
		  dragging[d] = Math.min(w, Math.max(0, this.__origin__ += d3.event.dx));
		  foreground.attr("d", path);
		  dimensions.sort(function(a, b) { return position(a) - position(b); });
		  x.domain(dimensions);
		  g.attr("transform", function(d) { return "translate(" + position(d) + ")"; })
		})
		.on("dragend", function(d) {
		  delete this.__origin__;
		  delete dragging[d];
		  transition(d3.select(this)).attr("transform", "translate(" + x(d) + ")");
		  transition(foreground)
		      .attr("d", path);
		  background
		      .attr("d", path)
		      .transition()
		      .delay(500)
		      .duration(0)
		      .attr("visibility", null);
		}));

	  // Add an axis and title.
	  g.append("svg:g")
	      .attr("class", "axis")
	      .each(function(d) { 
			//console.info(g[0]);

			d3.select(this).call(axis.scale(y[d])); 

		})
	    .append("svg:text")
	      .attr("text-anchor", "middle")
	      .attr("y", -9)
	      .text(String);

	  // Add and store a brush for each axis.
	  //executa a quantidade de campos a serem plotados
	  g.append("svg:g")
	      .attr("class", "brush")
	      .each(function(d) { 

				 //console.info(d);

                                     d3.select(this).call(
                                     y[d].brush = d3.svg.brush().y(y[d]).on("brush", brush)); 
               })
	    .selectAll("rect")
	      .attr("x", -8)
	      .attr("width", 16);
	});
}


function position(d) {
  var v = dragging[d];
  return v == null ? x(d) : v;
}

function transition(g) {
  return g.transition().duration(500);
}

// Returns the path for a given data point.
function path(d) {
  return line(dimensions.map(function(p) { 
	       
	       //console.info(d[p]);
	       //se a nota for == -1.0 nao mostre a linha (consequentemente o caminho sera quebrado)
	       if (d[p] == -1.0) return false;

	       //console.info([position(p), y[p](d[p])])
	       
               return [position(p), y[p](d[p])]; 

             }));
}

// Handles a brush event, toggling the display of foreground lines.
//esta linha e utilizada para selecionar um intervalo em uma determinada coluna
function brush() {
  var actives = dimensions.filter(function(p) { return !y[p].brush.empty(); }),
      extents = actives.map(function(p) { return y[p].brush.extent(); });
  foreground.style("display", function(d) {
    return actives.every(function(p, i) {
      return extents[i][0] <= d[p] && d[p] <= extents[i][1];
    }) ? null : "none";
  });
}
