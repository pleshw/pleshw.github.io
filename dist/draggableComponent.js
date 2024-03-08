
window.addEventListener('load', () => {
  const thunderStone = document.getElementById('thunderStone');
  DraggableElement.DraggableElement.makeElementDraggable(thunderStone);

  const pinEvent = new CollisionAction.PinCollisionEvent({
    pinPositionFormula: pinCollisionFormulaTopRight,
    onPin: (draggable, target) => {
      console.log(draggable, target);
    },
    onUnpin: (draggable, target) => {
      console.log('draggable, target');
    }
  });
  const shareAttributeEvent = new CollisionAction.ShareAttributeCollisionEvent();
  CollisionAction.initComplexCollisionCheck(thunderStone, '.stone-evolve-flag.thunder-type', [pinEvent, shareAttributeEvent])
});


let movable;
window.addEventListener('load', () => {
  movable = MovableElement.MovableElement.makeElementMovable(document.getElementById('testButtonMovable'));

  DraggableElement.DraggableElement.makeElementDraggable(document.getElementById('testButtonDraggable'));
});

function moveDown() {
  movable.y += 100;
}

function pinCollisionFormulaTopLeft(draggableRect, targetRect, draggableTransformPosition, distanceFromBorder, marginLeft = 10, marginTop = 10) {
  const targetLeftPosition = draggableTransformPosition.x - distanceFromBorder.left + (draggableRect.width / 2); /// adiciona a largura/2 porque a distancia da borda é baseada no centro do draggable
  const targetTopPosition = draggableTransformPosition.y - distanceFromBorder.top + (draggableRect.height / 2);
  return {
    x: targetLeftPosition + marginLeft,
    y: targetTopPosition + marginTop
  }
}

function pinCollisionFormulaTopRight(draggableRect, targetRect, draggableTransformPosition, distanceFromBorder, marginRight = 10, marginTop = 10) {
  const targetLeftPosition = draggableTransformPosition.x + distanceFromBorder.right - (draggableRect.width / 2); /// adiciona a largura/2 porque a distancia da borda é baseada no centro do draggable
  const targetTopPosition = draggableTransformPosition.y - distanceFromBorder.top + (draggableRect.height / 2);
  return {
    x: targetLeftPosition - marginRight,
    y: targetTopPosition + marginTop
  }
}