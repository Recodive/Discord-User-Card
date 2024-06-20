export function renderElement(element: HTMLElement, newElement: HTMLElement): void {
	// ? Go over each attribute of the new element and set it to the element if it is not already set
	for (const { name, value } of newElement.attributes) {
		if (element.getAttribute(name) !== value)
			element.setAttribute(name, value);
	}

	// ? Remove all attributes that are not present in the new element
	for (const { name } of element.attributes) {
		if (newElement.getAttribute(name) === null)
			element.removeAttribute(name);
	}

	// ? Quick check to see if changes are needed deep down
	if (element.innerHTML === newElement.innerHTML)
		return;

	// ? If the new element has children, render them
	if (newElement.children.length > 0) {
		// ? If the element has no children, append all the children of the new element
		if (element.children.length === 0) {
			element.append(...newElement.children);
		}
		else {
			// ? If the element has children, go over each child of the new element and render it
			for (let i = 0; i < newElement.children.length; i++) {
				const newChild = newElement.children[i] as HTMLElement;
				const child = element.children[i] as HTMLElement | undefined;

				// ? If the child is not rendered, render it
				if (child === undefined)
					element.append(newChild);
				else renderElement(child, newChild);
			}
		}
	}
	else {
		// ? If the new element has no children, set the innerHTML of the element to the new element's innerHTML
		element.innerHTML = newElement.innerHTML;
	}
}
