import { Injectable } from '@angular/core';

@Injectable()
export class PointService {
  public score = 0;
  public lives = 3;
  constructor() { }
  getScore() {
    return this.score;
  }
  getLives() {
    return this.lives;
  }

  incrementScore() {
    ++this.score;
  }

  decrementLives() {
    --this.lives;
  }
  drawScore(ctx) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + this.score, 8, 20);
  }
  drawLives(ctx, canvas) {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + this.lives, canvas.width - 65, 20);
  }
}
