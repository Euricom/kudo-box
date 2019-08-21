import { Component, OnInit } from '@angular/core';
import {kudoImages} from '../../data/kudoImages.js';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  public baseImageUrl: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const image = kudoImages.find(i => i.id === parseInt(params.id, 10) );
      this.baseImageUrl = image.url;
      console.log(this.baseImageUrl);
    });
  }

}
