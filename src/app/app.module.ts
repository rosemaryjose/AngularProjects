import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { BrickBallComponent } from './brick-ball/brick-ball.component';
import { BrickService } from './services/brick.service';
import { BallService } from './services/ball.service';
import { PaddleService } from './services/paddle.service';
import { PointService } from './services/point.service';
import { LoadingImgComponent } from './shared/loading-img/loading-img.component';


@NgModule({
  declarations: [
    AppComponent,
    BrickBallComponent,
    LoadingImgComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [BrickService,PaddleService,BallService,PointService],
  bootstrap: [AppComponent]
})
export class AppModule { }
