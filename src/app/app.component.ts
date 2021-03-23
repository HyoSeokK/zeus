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

    console.log("styleMode : " + styleMode)
    const localHasStyle = localStorage && env.themeSettingVal;

    if (localHasStyle) {
        styleMode = env.themeSettingVal;
        console.log("localHasStyle : " + styleMode )
    } else {
        env.themeSettingVal = styleMode;
        localStorage.setItem("env", JSON.stringify(env));
    }

    this.themeArray.forEach((themeItem) => {
    
        if (themeItem.showStyle === styleMode) {
          console.log(themeItem.currentFileName) 
          this.theme.loadStyle(themeItem.currentFileName);
        }
    });
}

  ngOnInit() {
    
  }

}
