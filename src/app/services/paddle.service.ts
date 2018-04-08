import { Injectable } from '@angular/core';
import { GlobalConstants } from '../shared/constants';

@Injectable()
export class PaddleService {
  public paddleHeight = GlobalConstants.paddleHeight;
  public paddleWidth = GlobalConstants.paddleWidth;
  constructor() { }
  drawPaddle(ctx,canvas,paddleX) {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
    ctx.fillStyle = "#993333";
    ctx.fill();
    ctx.closePath();
  }
}
