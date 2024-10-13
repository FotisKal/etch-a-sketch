"use strict";

const CSS_HOVERING_CLASS = 'hovering';
const CSS_HOVERED_CLASS = 'hovered';
const CSS_FLEXITEM_SELECTOR = '.grid div'
const CSS_APPLY_SIZE_BTN_SELECTOR = '.apply-size'
const AXIS_X = 16;
const AXIS_Y = 16;

const parent = findOrCreateNodeIn('div', 'grid');
const button = document.querySelector(CSS_APPLY_SIZE_BTN_SELECTOR);
populateNodesIn('div', AXIS_X, AXIS_Y, parent);

parent.addEventListener('mouseover', (e) => {
    commonMouseEventsHandler(e, parent);
});

parent.addEventListener('mouseout', (e) => {
    commonMouseEventsHandler(e, parent);
});

button.addEventListener('click', () => {
    let gridSize;

    do {
		gridSize = prompt();

        /**
         * If cancel button be pressed
         */
        if (gridSize === null) {
            return;
        }
	} while (!validate(gridSize));

    replaceGrid(parent, gridSize);
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
    num = parseInt(num);

    if (num > 100) {
        return false;
    }

	return num;
}

function replaceGrid(grid, size) {
    emptyGrid(grid);
    createGrid(grid, size);
}

function emptyGrid(grid) {
    while (grid.lastElementChild) {
		grid.removeChild(grid.lastElementChild);
	}
}

function createGrid(grid, size) {
    let flexItemWidth = calculateFlexItemWidth(grid, size);
    setStyle(CSS_FLEXITEM_SELECTOR, 'width', `${flexItemWidth}px`);
    setStyle(CSS_FLEXITEM_SELECTOR, 'height', `${flexItemWidth}px`);
    populateNodesIn('div', size, size, grid);
}

function calculateFlexItemWidth(parent, num) {
    const style = window.getComputedStyle(parent);
    const containerWidth = parseInt(style.getPropertyValue('width'));
	return containerWidth / num;
}

function setStyle(selector, property, value) {
    let ruleNum;
    let sheet = document.styleSheets[0];
    let rules = sheet.cssRules;
    
    for (let i = 0; i < rules.length; i++) {
        if (rules[i].selectorText === selector) {
            ruleNum = i;
            break;
        }
    }

    if (property === 'width') {
        rules[ruleNum].style.width = value;
    }

    if (property === 'height') {
        rules[ruleNum].style.height = value;
    }
}