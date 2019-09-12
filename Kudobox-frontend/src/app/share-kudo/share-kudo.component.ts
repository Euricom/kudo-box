import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-share-kudo',
  templateUrl: './share-kudo.component.html',
  styleUrls: ['./share-kudo.component.scss']
})
export class ShareKudoComponent implements OnInit {
  public baseLocation = window.location.origin;

  constructor(private meta: Meta,private route: ActivatedRoute) {
    let kudoId;
    this.route.params.subscribe(routeParams => kudoId =routeParams.id);
    this.meta.updateTag({
      name: 'og:title',content: 'THIS is THE title'
     })
     this.meta.updateTag({
       name: 'og:site_name',content: 'THIS is THE title'
      })
      this.meta.updateTag({
       name: 'og:description',content: 'THIS is THE title'
      })
      this.meta.updateTag({
       name: 'og:image',content: `${this.baseLocation}/api/kudo/${kudoId}/getImage`
      })
      this.meta.updateTag({
       name: 'og:image:width',content: '250'
      })
      this.meta.updateTag({
       name: 'og:image:height', content:'257'})

       this.meta.updateTag({
         name:'og:url', content:`${this.baseLocation}/public-kudo/${kudoId}`
       })
  }

  ngOnInit() {
  }

}
