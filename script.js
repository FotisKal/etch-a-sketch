"use strict";

const CSS_HOVERING_CLASS = 'hovering';
const CSS_HOVERED_CLASS = 'hovered';
const AXIS_X = 16;
const AXIS_Y = 16;

const parent = findOrCreateNodeIn('div', 'grid');
const button = document.querySelector('.apply-size');
populateNodesIn('div', AXIS_X, AXIS_Y, parent);

parent.addEventListener('mouseover', (e) => {
    commonMouseEventsHandler(e, parent);
});

parent.addEventListener('mouseout', (e) => {
    commonMouseEventsHandler(e, parent);
});

button.addEventListener('click', () => {
    let num;

    do {
		num = prompt();
	} while (!validate(num));
});

function commonMouseEventsHandler(e, parent) {
    if (e.target.className === CSS_HOVERED_CLASS) {
        return;
    }

    if (e.target.className === parent.className) {
        return;
    }
        
    if (e.type === 'mouseover') {
            e.target.classList.add(CSS_HOVERING_CLASS);
            return;
    }

    if (e.type === 'mouseout') {
        e.target.classList.remove(CSS_HOVERING_CLASS);
        e.target.classList.add(CSS_HOVERED_CLASS);
        return;
    }
}

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

/*
* Return falsy value if it's not a number
*/
function validate(num) {
	return parseInt(num);
}