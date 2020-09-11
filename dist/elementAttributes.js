"use strict";
function getChildrenWithTag(element, tagname) {
    const children = element.children;
    const result = [];
    for (let child of children) {
        if (child.hasChildNodes())
            result.push(...getChildrenWithTag(child, tagname));
        if (child.tagName.toLowerCase() === tagname)
            result.push(child);
    }
    return result;
}
/**
 * Return all elements with the following attribute name.
 */
function getElementsByAttribute(attrName) {
    const elementList = document.body.getElementsByTagName("*");
    let result = [];
    // guarda todos os elementos com o atributo selecionado na lista que é retornada como resultado
    for (let i = 0; i < elementList.length; i++) {
        if (elementList[i].getAttribute(attrName) !== null)
            result.push(elementList[i]);
    }
    return result;
}
/**
 * return all elements set as attribute and its targets as an object. {see t_trigger}
 * @example
 * <!-- Element -->
 *    <div expand = "example"></div>
 *
 * <!-- Targets -->
 *    <div example></div>
 *    <li example></li>
 */
function getAttributeTriggers(attrName) {
    const elementList = getElementsByAttribute(attrName);
    const triggers = [];
    // guarda cada elemento como element e todos os seus alvos como targets
    for (const element of elementList) {
        triggers.push({
            element: element,
            targets: getElementsByAttribute(element.getAttribute(attrName))
        });
    }
    return triggers;
}
