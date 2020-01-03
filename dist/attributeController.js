"use strict";
/**
 * Return all elements with the following attribute name.
 */
function getElementsByAttribute(attrName) {
    var elementList = document.body.getElementsByTagName("*");
    var result = [];
    for (var i = 0; i < elementList.length; i++) {
        if (elementList[i].getAttribute(attrName) !== null)
            result.push(elementList[i]);
    }
    return result;
}
/**
 * return all elements set as attribute target
 * @example
 * <!-- Element -->
 *    <div expand = "example"></div>
 *
 * <!-- Targets -->
 *    <div example></div>
 *    <li example></li>
 */
function getAttributeElementsAndTargets(attrName) {
    var elementList = getElementsByAttribute(attrName);
    var targets = [];
    for (var _i = 0, elementList_1 = elementList; _i < elementList_1.length; _i++) {
        var element = elementList_1[_i];
        targets.push({
            element: element,
            targets: getElementsByAttribute(element.getAttribute(attrName))
        });
    }
    return targets;
}
