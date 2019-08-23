import { Component, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { KonvaComponent } from 'ng2-konva';

import { kudoImages } from '../../data/kudoImages.js';
import { KudoService } from '../../shared/kudo.service';

interface Window {
    Image: any;
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
    @ViewChild('text', { static: false }) text: KonvaComponent;

    public baseImageUrl: string;
    public fontFamily: string = 'Comic Sans MS';
    defaultText: string = 'Type some text here...';

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

    textarea = <HTMLTextAreaElement>document.getElementById('textAreaForImage');

    constructor(private route: ActivatedRoute, private router: Router, private _kudoService: KudoService) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            const image = kudoImages.find(i => i.id === parseInt(params.id, 10));
            this.baseImageUrl = image.url;
        });
        this.showImage(this.baseImageUrl);
    }

    changeFont(font) {
        this.fontFamily = font;
    }

    createCanvas(text) {
        this.text.getStage().setText(text);
        this.textLayer.getStage().draw();
        this.defaultText = '';

        this._kudoService.imageDataURL = this.stage.getStage().toDataURL();

        this.router.navigate([`/kudo/send`]);
    }

    showImage(src: string) {
        const image = new window.Image();
        image.src = src;
        image.onload = () => {
            this.configImage.emit({
                image,
                width: 600,
                height: 500,
            });
        };
    }
}
