import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { enviroment } from '@environments/environment';
import { AppLoadingHelper } from './helpers';
import { LangService } from './services/lang.service';
import { MenuService } from './services';
import * as _ from 'lodash';
import { VersionService } from './services/version.service';

@Component({
  selector: 'tt-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit {

  title: string = "SEO.TITLE";
  linkSVG = `assets/svg/icons.svg?v=${Date.now()}`;
  svgIconLink = `${enviroment.ASSETS_URL}${this.linkSVG}`;

  constructor(
    private titleSer: Title,
    private translateSer: TranslateService,
    private langSer: LangService,
    private menuSer: MenuService,
    private versionSer: VersionService,
  ) {}

  ngOnInit(): void {
    this.initService();

    this.translateSer.onLangChange.subscribe(resp => {
      this.translateSer.get(this.title).subscribe(resp => {
        this.titleSer.setTitle(resp);
      });
    });
  }

  initService() {
    this.langSer.init();
    this.menuSer.init();
    this.versionSer.init();
  }

  ngAfterViewInit(): void {
    AppLoadingHelper.Toggle(false);
  }
}
