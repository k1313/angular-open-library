import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  {
  title = 'books-app';
  
  navLinks = [
    {path: "/", label: "Home"},
    {path: "/favourites", label: "Favourites"}
  ];





}
