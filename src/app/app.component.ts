import { Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemeService } from './services/app-theme.service';
import { THEME_ARRAY, ThemeInterface } from './services/theme';
import { clone } from './utils/utils';
import { EnvSetting } from './utils/utils.env';

const HAS_STYLE_MODE: string = 'theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'zeus';
  themeArray: ThemeInterface[] = clone(THEME_ARRAY);
  styleMode: string = this.themeArray[0].showStyle;

  constructor(public theme:ThemeService){
    this.setTheme();
  }

  setTheme () {
    var env = JSON.parse(localStorage.getItem("env")) as EnvSetting;

    let styleMode = this.themeArray[0].showStyle;

    const localHasStyle = localStorage && env.ThemeSettingVal;

    if (localHasStyle) {
        //styleMode = localStorage.getItem(HAS_STYLE_MODE);
        styleMode = env.ThemeSettingVal;
    } else {
        //localStorage.setItem(HAS_STYLE_MODE, styleMode);
        env.ThemeSettingVal = styleMode;
        localStorage.setItem("env", JSON.stringify(env));
    }

    this.themeArray.forEach((themeItem) => {
        if (themeItem.showStyle === styleMode) {
            this.theme.loadStyle(themeItem.currentFileName);
        }
    });
}

  ngOnInit() {
    
  }

}
