var controls = new function() {
this.charge = -200;
this.linkDistance = 60;
this.gravity=0.05;
this.backgroundColor = '#091a28';
this.linkColor = '#91b8d9';
};

window.onload = function() {
	//DAT.GUI.autoPlace = false;

	var gui = new dat.GUI();

	gui.domElement.style.position = 'absolute';
	gui.domElement.style.top = '30px';
	gui.domElement.style.right = '1px';
	gui.domElement.style.height = '120px';

	document.getElementById('idTabContainer').appendChild(gui.domElement);

	gui.add(controls, 'charge', -1000, 1000).onChange(function(d) {
		force.charge(d);
		force.start();
	});
	gui.add(controls, 'linkDistance', 0, 1000).onChange(function(d) {
		force.linkDistance(d);
		force.start();
	});
	gui.add(controls, 'gravity', 0, 1).onChange(function(d) {
		force.gravity(d);
		force.start();
	});
};
