import { Component, OnInit, EventEmitter, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, of, Subscription } from 'rxjs';
import { KonvaComponent } from 'ng2-konva';

import { kudoImages } from '../../data/kudoImages';
import { KudoService } from '../../shared/kudo.service';

interface Window {
    Image: any;
    innerWidth: any;
}
declare const window: Window;

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
    @ViewChild('stage', { static: false }) stage: KonvaComponent;
    @ViewChild('textLayer', { static: false }) textLayer: KonvaComponent;
    @ViewChild('imageLayer', { static: false }) imageLayer: KonvaComponent;
    @ViewChild('image', { static: false }) image: KonvaComponent;
    @ViewChild('text', { static: false }) text: KonvaComponent;

    routeSubscription: Subscription;

    public baseImageUrl: string;
    public fontFamily = 'Comic Sans MS';
    defaultText = 'Type some text here...';

    public configStage: Observable<any> = of({
        container: 'container',
        width: 600,
        height: 500,
    });
    public configImage: EventEmitter<any> = new EventEmitter();

    public configText: Observable<any> = of({
        text: '',
        x: 40,
        y: 130,
        fontSize: 20,
        width: 400,
        height: 300,
        fill: '#c2185b',
        fontFamily: this.fontFamily,
        lineHeight: 1.7,
    });
    constructor(private route: ActivatedRoute, private router: Router, private _kudoService: KudoService) {}

    ngOnInit() {
        this.routeSubscription = this.route.params.subscribe(params => {
            const image = kudoImages.find(i => i.id === parseInt(params.id, 10));
            this.baseImageUrl = image.url;
        });
        this.onResize();
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

    changeFont(font) {
        this.fontFamily = font;
        this.text.getStage().setFontFamily(font);
    }

    createCanvas(text) {
        this.text.getStage().setText(text);
        this.textLayer.getStage().draw();
        this.defaultText = '';

        this._kudoService.imageDataURL = this.stage.getStage().toDataURL();

        this.router.navigate([`/kudo/send`]);
    }

    showImage(src: string, width: number, height: number) {
        let image = new window.Image();
        image.src = src;
        image.onload = () => {
            this.configImage.emit({
                image,
                width: width,
                height: height,
            });
        };
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        if (window.innerWidth < 400) {
            this.showImage(this.baseImageUrl, 300, 200);
            this.resizeConfigText(20, 55, 10, 200, 100, 1.2);
        } else if (window.innerWidth < 600) {
            this.showImage(this.baseImageUrl, 400, 300);
            this.resizeConfigText(25, 80, 15, 200, 100, 1.5);
        } else if (window.innerWidth >= 600) {
            this.resizeConfigText(40, 130, 20, 400, 300, 1.7);
            this.showImage(this.baseImageUrl, 600, 500);
        }
    }

    resizeStage(width: number, height: number) {
        this.configStage = of({
            width: width,
            height: height,
        });
    }

    resizeConfigText(x: number, y: number, fontSize: number, width: number, height: number, lineHeight: number) {
        if (!this.text) {
            this.configText = of({
                x: x,
                y: y,
                fontSize: fontSize,
                width: width,
                height: height,
                lineHeight: lineHeight,
                fill: '#c2185b',
                fontFamily: this.fontFamily,
            });
        } else {
            this.text.getStage().setX(x);
            this.text.getStage().setY(y);
            this.text.getStage().setFontSize(fontSize);
            this.text.getStage().setWidth(width);
            this.text.getStage().setHeight(height);
            this.text.getStage().setLineHeight(lineHeight);
        }
    }
}
