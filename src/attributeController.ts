/**
 * Return all elements with the following attribute name.
 */
function getElementsByAttribute(attrName: string) {
  let elementList = document.body.getElementsByTagName("*");
  let result: Element[] = [];
  for (let i = 0; i < elementList.length; i++) {
    if (elementList[i].getAttribute(attrName) !== null)
      result.push(elementList[i])
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
function getAttributeElementsAndTargets(attrName: string) {
  let elementList = getElementsByAttribute(attrName);
  let targets: {
    element: Element, targets: Element[]
  }[] = [];
  for (let element of elementList) {
    targets.push({
      element: element,
      targets: getElementsByAttribute(element.getAttribute(attrName)!)
    })
  }
  return targets;
}