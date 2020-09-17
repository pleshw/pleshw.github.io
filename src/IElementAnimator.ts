type t_iteration = 'once' | 'infinite' | 'alternate';

interface IElementAnimator {
  iteration: t_iteration;
  ready: boolean;
  animate( elements: HTMLElement ): void;
}