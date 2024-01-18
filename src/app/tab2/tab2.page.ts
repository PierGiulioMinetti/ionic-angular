import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, IonGrid, IonCol, IonRow, IonImg, IonButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { PhotoService, UserPhoto } from '../services/photo.service';
import { NgFor, NgIf } from '@angular/common';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    //angular
    NgFor,
    NgIf,
    //ionic
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
    IonFab,
    IonFabButton,
    IonIcon,
    IonGrid,
    IonCol,
    IonRow,
    IonImg,
    IonButton

  ]
})
export class Tab2Page implements OnInit {

  async ngOnInit() {
    await this.photoService.loadSaved();
  }


  constructor(
    public photoService: PhotoService,
    public actionSheetController: ActionSheetController
    ) { }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  deletePhotos(){
    this.photoService.photos = [];
  }

  public async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
          }
      }]
    });
    await actionSheet.present();
  }



}
