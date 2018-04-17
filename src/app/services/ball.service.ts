import { Injectable } from '@angular/core';
import { GlobalConstants } from '../shared/constants';

@Injectable()
export class BallService {
  
  public ballRadius = GlobalConstants.ballRadius;
  constructor() { }
  drawBall(ctx,x,y) {
    ctx.beginPath();
   // alert("x="+x+"y="+ y +"R="+ this.ballRadius)
    ctx.arc(x, y, this.ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgb(0, 191, 255)';
    ctx.strokeStyle = 'rgb(0, 191, 255)';
    ctx.fill();
    ctx.closePath();
  }
}
