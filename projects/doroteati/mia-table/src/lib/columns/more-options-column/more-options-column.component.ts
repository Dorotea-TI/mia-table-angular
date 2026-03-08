import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MoreColumnComponent } from '../more-column/more-column.component';

@Component({
    selector: 'mia-more-options-column',
    templateUrl: './more-options-column.component.html',
    styleUrls: ['./more-options-column.component.scss'],
    standalone: true,
    imports: [MatIconModule, MatButtonModule, MatMenuModule]
})
export class MoreOptionsColumnComponent extends MoreColumnComponent implements OnInit {

  actions = new Array<any>();

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.processActions();
  }

  processActions() {
    let val = this.getFieldValue();
    let actions = this.column.extra.actions[val];
    let defaultActions = this.column.extra.default;

    if(actions != undefined){
      this.actions = actions;
    } else if (defaultActions != undefined) {
      this.actions = defaultActions;
    }
  }

  getActions(): Array<any> {
    return [];
  }
}
