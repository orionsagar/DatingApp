import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from '@kolkov/ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/_models/User';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss'],
})
export class MemberDetailsComponent implements OnInit {
  @ViewChild('membertabs', { static: true })  membertabs: TabsetComponent;
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private userServcie: UserService,
    private alertify: AlertifyService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.data.subscribe((data) => {
      this.user = data.user;
    });

    this.router.queryParams.subscribe((params) => {
     // console.log(params['tab']);
      if (params['tab'] != null) {
        //this.selectTab(params['tab']);
         this.membertabs.tabs[params['tab']].active = true;
      }
    });

   
    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      },
    ];
    this.galleryImages = this.getImages();
  }

  ngAfterViewInit() {
    this.router.params.subscribe((params) => {
      const selectTab = +params['tab'];
     // console.log('queryparams:' + selectTab);
     // this.membertabs.tabs[selectTab > 0 ? selectTab : 0].active = true;
    });

  }

  getImages() {
    const imageUrls = [];
    for (let i = 0; i < this.user.photos.length; i++) {
      imageUrls.push({
        small: this.user.photos[i].url,
        medium: this.user.photos[i].url,
        big: this.user.photos[i].url,
      });
    }
    // console.log(imageUrls);
    return imageUrls;
  }

  selectTab(tabid: number) {
    this.membertabs.tabs[tabid].active = true;
  }

  // loadUser(): void {

  //   this.userServcie
  //     .getUser(this.router.snapshot.params['id'])
  //     .subscribe((user: User) => {
  //       this.user = user;
  //      // console.log(user);
  //     }, error => {
  //       this.alertify.error(error);
  //     });
  // }
}
