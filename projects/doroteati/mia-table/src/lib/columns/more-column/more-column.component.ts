import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MiaTableConfig } from '../../entities/mia-table-config';
import { BaseColumnComponent } from '../base-column.component';

@Component({
    selector: 'mia-more-column',
    templateUrl: './more-column.component.html',
    styleUrls: ['./more-column.component.scss'],
    standalone: true,
    imports: [MatIconModule, MatButtonModule, MatMenuModule]
})
export class MoreColumnComponent extends BaseColumnComponent implements OnInit {
  
  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  clickButton(itemAction: any, $event: UIEvent) {
    this.config!.onClick.next({ key: itemAction.key, item: this.item });
    $event.preventDefault();
    return false;
  }
}
