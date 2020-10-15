import "../polyfills";
import "reflect-metadata";

import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AngularTypeormModule } from "angular-typeorm";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HttpClient } from "@angular/common/http";

// NG Translate
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";

import DbOptions from "./typeorm.connection";
import { AppComponent } from "./app.component";
import { HomeModule } from "./home/home.module";
import { CoreModule } from "./core/core.module";
import { DetailModule } from "./detail/detail.module";
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from "./app-routing.module";
// import { DatabaseModule } from "./database/database.module";
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    HomeModule,
    CoreModule,
    FormsModule,
    DetailModule,
    SharedModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularTypeormModule.forRoot(DbOptions),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
