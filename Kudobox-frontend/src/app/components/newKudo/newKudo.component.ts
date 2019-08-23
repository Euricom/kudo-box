import { Component, ViewChildren, QueryList } from '@angular/core';
import { MatCarouselSlideComponent, Orientation } from '@ngmodule/material-carousel';
import { ThemePalette } from '@angular/material';
import { Router } from '@angular/router';
import { kudoImages } from '../../data/kudoImages';

@Component({
    selector: 'app-new-kudo',
    templateUrl: './newKudo.component.html',
    styleUrls: ['./newKudo.component.scss'],
})
export class NewKudoComponent {
    @ViewChildren(MatCarouselSlideComponent) public carouselSlides: QueryList<MatCarouselSlideComponent>;
    public slidesList = kudoImages;

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

    constructor(private router: Router) {}

    slideClicked(id: number) {
        this.router.navigate([`/kudo/create/${id}`]);
    }
}