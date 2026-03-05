import {
  AfterViewInit,
  Component,
  DOCUMENT,
  ElementRef,
  HostListener,
  Input,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  MiaBaseCrudHttpService,
  MiaPagination,
  MiaQuery,
} from '@doroteati/mia-core';

@Component({
    selector: 'mia-infinite-scroll-service',
    templateUrl: './mia-infinite-scroll-service.component.html',
    styleUrls: ['./mia-infinite-scroll-service.component.scss'],
    standalone: false
})
export class MiaInfiniteScrollServiceComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() isFullScreen: boolean = true;
  @Input() service!: MiaBaseCrudHttpService<any>;
  @Input() query!: MiaQuery;

  isLoading = false;
  isFirstLoad = true;
  dataItems = new MiaPagination<any>();
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);

  constructor(protected elementRef: ElementRef) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.loadMoreItems();
  }

  loadMoreItems() {
    // Verify if loading
    if (this.isLoading) {
      return;
    }
    // Verify if the last page
    if (
      this.dataItems.last_page == this.dataItems.current_page &&
      !this.isFirstLoad
    ) {
      return;
    }

    this.isLoading = true;
    this.isFirstLoad = false;
    this.service.listOb(this.query).subscribe((res) => {
      const pagination = this.normalizePagination(res);
      this.dataItems.data.push(...pagination.data);
      this.dataItems.current_page = pagination.current_page;
      this.dataItems.last_page = pagination.last_page;
      this.dataItems.total = pagination.total;
      this.isLoading = false;
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (this.isFullScreen && isPlatformBrowser(this.platformId)) {
      const threshold = 50;
      const position = window.scrollY + window.innerHeight;
      const height = this.document.body.scrollHeight;
      const isBottom = position > height - threshold;
      if (isBottom) {
        this.loadMoreItems();
      }
    }

    //let params = this.elementRef.nativeElement.getBoundingClientRect();
  }

  protected normalizePagination(result: any): MiaPagination<any> {
    if (result?.data && Array.isArray(result.data)) {
      return result as MiaPagination<any>;
    }

    if (result?.response?.data && Array.isArray(result.response.data)) {
      return result.response as MiaPagination<any>;
    }

    return new MiaPagination<any>();
  }
}
