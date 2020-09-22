class ChangeImgAnimation extends ChangeMediaAnimation {
  iteration: t_iteration = 'infinite';
  constructor( src: string ) {
    super( src, 'img' );
  }
}