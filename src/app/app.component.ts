import { Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemeService } from './services/app-theme.service';
import { THEME_ARRAY, ThemeInterface } from './services/theme';
import { clone } from './utils/utils';

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
    let styleMode = this.themeArray[0].showStyle;
    console.log("styleMode : " + styleMode);

    const localHasStyle = localStorage && localStorage.getItem(HAS_STYLE_MODE);
    console.log("localHasStyle : " + localHasStyle);

    if (localHasStyle) {
        styleMode = localStorage.getItem(HAS_STYLE_MODE);
    } else {
        localStorage.setItem(HAS_STYLE_MODE, styleMode);
    }
    this.themeArray.forEach((themeItem) => {
        

        if (themeItem.showStyle === styleMode) {
          console.log("themeItme.showStyle : " + themeItem.showStyle);
            this.theme.loadStyle(themeItem.currentFileName);
        }
    });
}

  ngOnInit() {
    //console.log("appcomponent : " + localStorage.getItem("theme"))  
  }

}
