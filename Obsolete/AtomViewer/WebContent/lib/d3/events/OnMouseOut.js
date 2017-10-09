function mouseout() {
   /*
  d3.select(this).select("circle").transition()
      .duration(750)
      .attr("r", 8);
   */
  
d3.select(this).select("image").transition()
	.attr("width",16)
	.attr("height",16);
	
d3.select(this).select("text")
     .attr("fill", "black")
     .attr("font-size",12);

}
