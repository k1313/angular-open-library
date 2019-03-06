import {style, animate, trigger, transition, state} from '@angular/animations';


export let menuItemAnim = trigger('menuItem', [
  state('void', style({opacity: 0, transform: 'translate(50vw, 0)'})),
  transition(':enter, :leave', [animate(150)])
]);
