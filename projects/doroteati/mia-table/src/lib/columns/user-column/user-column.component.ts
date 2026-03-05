import { Component, OnInit } from '@angular/core';
import { BaseColumnComponent } from '../base-column.component';

@Component({
    selector: 'mia-user-column',
    templateUrl: './user-column.component.html',
    styleUrls: ['./user-column.component.scss'],
    standalone: false
})
export class UserColumnComponent extends BaseColumnComponent implements OnInit {
  readonly fallbackAvatar = 'assets/img/user-avatar-empty.svg';

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  getFirstname() {
    if(this.column.extra?.field_firstname){
      return this.getFieldValueByKey(this.column.extra?.field_firstname);
    }

    return '';
  }

  getLastname() {
    if(this.column.extra?.field_lastname){
      return this.getFieldValueByKey(this.column.extra?.field_lastname);
    }

    return '';
  }

  getFullname() {
    return this.getFirstname() + ' ' + this.getLastname();
  }

  getPhoto() {
    if(this.column.extra?.field_photo){
      return this.getFieldValueByKey(this.column.extra?.field_photo);
    }

    return '';
  }

  getSafePhoto() {
    const photo = this.getPhoto();
    return photo != '' ? photo : this.fallbackAvatar;
  }

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    if (imgElement && imgElement.src.indexOf(this.fallbackAvatar) === -1) {
      imgElement.src = this.fallbackAvatar;
    }
  }

  getSubtitle() {
    if(this.column.extra?.field_subtitle){
      return this.getFieldValueByKey(this.column.extra?.field_subtitle);
    }

    return '';
  }

  isOnline() {
    if(this.column.extra?.field_is_online){
      return this.getFieldValueByKey(this.column.extra?.field_is_online);
    }

    return false;
  }
}
