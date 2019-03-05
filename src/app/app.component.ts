import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { menuItemAnim } from './animations';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [menuItemAnim]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'books-app';
  layoutChanges: Observable<BreakpointState>;
  bigPanel = window.innerWidth > 900;

  navLinks = [
    { path: "/search", label: "APP.HOME" },
    { path: "/favourites", label: "APP.FAVOURITES" }
  ];
  menuCollapsed: boolean = true;
  subscriptions: Subscription;

  constructor(
    public translate: TranslateService,
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    translate.addLangs(['en', 'ru']);
    console.log('language', localStorage.getItem('language'));
    translate.setDefaultLang('en');
    translate.use(localStorage.getItem('language') || 'en');

    this.layoutChanges = breakpointObserver.observe([
      '(min-width: 900px)',
    ]);

    this.layoutChanges.subscribe(result => {
      this.bigPanel = result.matches;
      if (this.bigPanel) {
        this.menuCollapsed = true;
      }
    });
  }

  ngOnInit() {
    let navEnd = this.router.events.pipe( filter(e => e instanceof NavigationEnd)) as Observable<NavigationEnd>;
    this.subscriptions = navEnd.subscribe(_ => this.close());
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  close(): void {
    this.menuCollapsed = true;
  }

  toggleMenu(): void {
    this.menuCollapsed = !this.menuCollapsed;
  }

  setLang(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }



}
