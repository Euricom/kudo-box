import { Component, OnInit, EventEmitter, Input, ViewChild } from '@angular/core';
import {kudoImages} from '../../data/kudoImages.js';
import { ActivatedRoute } from '@angular/router';

import { Observable, of } from 'rxjs';

import { KonvaComponent } from 'ng2-konva';


interface Window {
  Image: any;
}
declare const window: Window;

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @ViewChild('stage', {static: false}) stage: KonvaComponent;
  @ViewChild('textLayer', {static: false}) textLayer: KonvaComponent;
  @ViewChild('text', {static: false}) text: KonvaComponent;

  public image;

  public baseImageUrl: string;
  public fontFamily: string = 'Comic Sans MS';
  defaultText: string = 'Type some text here...';

  public configStage: Observable<any> = of({
    container: 'container',
    width: 600,
    height: 500
  });
  public configImage:EventEmitter<any> = new EventEmitter();

  public configText: Observable<any> = of({
    text: '',
    x: 40,
    y: 130,
    fontSize: 20,
    width: 400,
    height: 300,
    fill: '#c2185b',
    fontFamily: this.fontFamily,
    lineHeight: 1.7
  });

  textarea = <HTMLTextAreaElement>document.getElementById("textAreaForImage");

  public handleClick(component) {
    const textarea = <HTMLTextAreaElement>document.getElementById("textAreaForImage");
    textarea.focus();
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const image = kudoImages.find(i => i.id === parseInt(params.id, 10) );
      this.baseImageUrl = image.url;
    });
    this.showImage(this.baseImageUrl);
  }

  changeFont(font) {
    this.fontFamily = font;
  }

  showImage(src: string) {
    const image = new window.Image();
    image.src = src;
    image.onload = () => {
      this.configImage.emit({
        image: image,
        width: 600,
        height: 500
      })
    }
  }

  createCanvas(text) {
    this.text.getStage().setText(text);
    this.textLayer.getStage().draw();
    this.defaultText = '';

    this.image = this.stage.getStage().toDataURL();


  }

}
