import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-share-kudo',
  templateUrl: './share-kudo.component.html',
  styleUrls: ['./share-kudo.component.scss']
})
export class ShareKudoComponent implements OnInit {
  public baseLocation = window.location.origin;
  public kudoId;
  public baseImageLocation;
  constructor(private meta: Meta,private route: ActivatedRoute) {

    this.route.params.subscribe(routeParams => this.kudoId =routeParams.id);
    this.baseImageLocation = `${environment.apiUrl}/api/kudo/${this.kudoId}/getImage`;
  }

  ngOnInit() {
  }

}
