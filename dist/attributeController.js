"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
/**
 * Return all elements with the following attribute name.
 */
function getElementsByAttribute(attrName) {
    var elementList = document.body.getElementsByTagName("*");
    var result = [];
    // guarda todos os elementos com o atributo selecionado na lista que é retornada como resultado
    for (var i = 0; i < elementList.length; i++) {
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
    var e_1, _a;
    var elementList = getElementsByAttribute(attrName);
    var triggers = [];
    try {
        // guarda cada elemento como element e todos os seus alvos como targets
        for (var elementList_1 = __values(elementList), elementList_1_1 = elementList_1.next(); !elementList_1_1.done; elementList_1_1 = elementList_1.next()) {
            var element = elementList_1_1.value;
            triggers.push({
                element: element,
                targets: getElementsByAttribute(element.getAttribute(attrName))
            });
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (elementList_1_1 && !elementList_1_1.done && (_a = elementList_1.return)) _a.call(elementList_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return triggers;
}
