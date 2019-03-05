import { style, animate, trigger, stagger, transition, state, query } from '@angular/animations';


export let menuItemAnim = trigger('menuItem', [
    state('void', style({ opacity: 0, transform: 'translate(50vw, 0)'})),
    transition(':enter, :leave', [animate(150)])
]);