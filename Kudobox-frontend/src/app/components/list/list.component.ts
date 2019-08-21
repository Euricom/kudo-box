import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import {
  MatCarouselSlideComponent, Orientation
} from '@ngmodule/material-carousel';
import { ThemePalette } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @ViewChildren(MatCarouselSlideComponent) public carouselSlides: QueryList<MatCarouselSlideComponent>;
  public slidesList = new Array(
    {id: 1, url: '/assets/congratulations.png'},
    {id: 2, url: '/assets/great_job.png'},
    {id: 3, url: '/assets/many_thanks.png'},
    {id: 4, url: '/assets/thank_you.png'},
    {id: 5, url: '/assets/totally_awesome.png'},
    {id: 6, url: '/assets/very_happy.png'},
    {id: 7, url: '/assets/well_done.png'});



  //
  public showContent = false;

  public timings = '250ms ease-in';
  public autoplay = false;
  public interval = 5000;
  public loop = true;
  public hideArrows = false;
  public hideIndicators = false;
  public color: ThemePalette = 'primary';
  public maxWidth = '100%';
  public proportion = 75;
  public slides = this.slidesList.length;
  public overlayColor = '#00000040';
  public hideOverlay = false;
  public useKeyboard = true;
  public useMouseWheel = false;
  public orientation: Orientation = 'ltr';
  public log: string[] = [];
  //

  constructor( private router: Router) { }

  ngOnInit() {
  }

  slideClicked( id: number ) {
    this.router.navigate([`/kudo/create/${id}`]);
  }
}
