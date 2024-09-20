import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Photo } from 'src/app/_models/photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpHeaders } from '@angular/common/http';
import { AlertifyService } from 'src/app/_services/alertify.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss'],
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  uploader: FileUploader;
  hasBaseDropZoneOver: false;
  baseUrl = environment.apiUrl;
  userToken: any;
  decodedToken: any;
  helper = new JwtHelperService();
  header: [];
  currentMain: Photo;
  @Output() getMemberPhotoChange = new EventEmitter<string>();

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService
  ) {
    // this.uploader.onBeforeUploadItem = (item) => {
    //   item.withCredentials = false;
    // };
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.userToken = localStorage.getItem('token');
    this.decodedToken = this.helper.decodeToken(this.userToken);

    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.decodedToken.nameid + '/photos',
      isHTML5: true,
      itemAlias: 'File',
      disableMultipart: true,
      authToken: 'Bearer ' + this.userToken,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });
    
    // console.log(this.uploader);
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain,
        };
        this.photos.push(photo);
        if (photo.isMain) {
          this.authService.changeMemberPhoto(photo.url);
          this.authService.currentUser.photoUrl = photo.url;
          localStorage.setItem(
            'user',
            JSON.stringify(this.authService.currentUser)
          );
        }
      }
    };
  }

  setMainPhoto(photo: Photo) {
    this.userToken = localStorage.getItem('token');
    this.decodedToken = this.helper.decodeToken(this.userToken);

    this.userService.setMainPhoto(this.decodedToken.nameid, photo.id).subscribe(
      () => {
        this.currentMain = _.findWhere(this.photos, { isMain: true });
        this.currentMain.isMain = false;
        photo.isMain = true;
        // this.getMemberPhotoChange.emit(photo.url);
        this.authService.changeMemberPhoto(photo.url);
        this.authService.currentUser.photoUrl = photo.url;
        localStorage.setItem(
          'user',
          JSON.stringify(this.authService.currentUser)
        );
        this.alertify.success('successfully set to main');
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }

  deletePhoto(id: number) {
    this.alertify.confirm('Are you sure you want to delete this photo', () => {
      this.userService
        .deletePhoto(this.authService.decodedToken.nameid, id)
        .subscribe(
          () => {
            this.photos.splice(_.findIndex(this.photos, { id: id }), 1);
            this.alertify.success('Photo has been deleted');
          },
          (error) => {
            this.alertify.error('Failed to delete photo');
          }
        );
    });
  }
}
