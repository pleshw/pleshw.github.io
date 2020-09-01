type t_trigger = { element: Element, targets: Element[] };

/**
 * Return all elements with the following attribute name.
 */
function getElementsByAttribute( attrName: string ) {
  const elementList = document.body.getElementsByTagName( "*" );
  let result: Element[] = [];

  // guarda todos os elementos com o atributo selecionado na lista que é retornada como resultado
  for ( let i = 0; i < elementList.length; i++ ) {
    if ( elementList[i].getAttribute( attrName ) !== null )
      result.push( elementList[i] )
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
function getAttributeTriggers( attrName: string ) {
  const elementList = getElementsByAttribute( attrName );
  const triggers: t_trigger[] = [];

  // guarda cada elemento como element e todos os seus alvos como targets
  for ( const element of elementList ) {
    triggers.push( {
      element: element,
      targets: getElementsByAttribute( element.getAttribute( attrName )! )
    } )
  }
  return triggers;
}