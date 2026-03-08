import { Component, Input, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MiaTableConfig } from '../../entities/mia-table-config';
import { BaseColumnComponent } from '../base-column.component';

@Component({
    selector: 'mia-icon-toggle-column',
    templateUrl: './icon-toggle-column.component.html',
    styleUrls: ['./icon-toggle-column.component.scss'],
    standalone: true,
    imports: [NgStyle, MatButtonModule, MatIconModule]
})
export class IconToggleColumnComponent extends BaseColumnComponent implements OnInit {

  @Input() config!: MiaTableConfig;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  clickButton($event: any) {
    this.config.onClick.next({ key: this.column.extra.key_action, item: this.item });
    $event.stopPropagation();
    $event.preventDefault();
    return false;
  }

  getColor(): string {
    let value = this.getFieldValue();
    for (const item of this.column.extra.options) {
      if(item.value == value){
        return item.color;
      }
    }

    return '';
  }

  getIcon(): string {
    let value = this.getFieldValue();
    for (const item of this.column.extra.options) {
      if(item.value == value){
        return item.icon;
      }
    }
    return '';
  }
}
