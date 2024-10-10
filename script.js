"use strict";

const AXIS_X = 16;
const AXIS_Y = 16;

const parent = findOrCreateNodeIn('div', 'container');
populateNodesIn('div', AXIS_X, AXIS_Y, parent);

function findOrCreateNodeIn(type, className, classOfParent) {
	let node = document.querySelector(`.${className}`);
	if (node) {
		return node;
	}

	node = document.createElement(type);
	if (className) {
		node.classList.add(className);
	}

    /*
    * If classOfParent is not provided or is not applied 
    * to an element create the node inside the document.body
    */
    let parent = document.querySelector(`.${classOfParent}`)
    ? parent.appendChild(node)
    : document.body.appendChild(node);

    return node;
}

function populateNodesIn(type, x, y, parent) {
	for (let i = 0; i < x * y; i++) {
		const child = document.createElement(type);
		parent.appendChild(child);
	}
}