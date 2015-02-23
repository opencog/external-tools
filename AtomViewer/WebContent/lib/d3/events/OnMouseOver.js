function mouseover() {
  /*
  d3.select(this).select("circle").transition()
      .duration(750)
      .attr("r", 16);
  */
d3.select(this).select("image").transition()
    .attr("x", -8)
    .attr("y", -8)
	.attr("width",25)
	.attr("height",25);
	
d3.select(this).select("text")
    .attr("fill", "steelblue")
    .attr("font-size", 15);
}
