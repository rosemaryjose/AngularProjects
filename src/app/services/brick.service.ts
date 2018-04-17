import { Injectable, OnInit, AfterViewInit } from '@angular/core';
import { GlobalConstants } from '../shared/constants';
import { PointService } from './point.service';
@Injectable()
export class BrickService implements AfterViewInit {

  constructor(private pointService:PointService) {
    for (let c = 0; c < this.brickColumnCount; c++) {
      this.bricks[c] = [];
      for (let r = 0; r < this.brickRowCount; r++) {
        this.bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }
  }
  public success = false;
  public brickColumnCount = GlobalConstants.brickColumnCount;
  public brickRowCount = GlobalConstants.brickRowCount;
  public bricks = GlobalConstants.bricks;
  public brickWidth = GlobalConstants.brickWidth;
  public brickPadding = GlobalConstants.brickPadding;
  public brickOffsetLeft = GlobalConstants.brickOffsetLeft;
  public brickHeight = GlobalConstants.brickHeight;
  public brickOffsetTop = GlobalConstants.brickOffsetTop;
  ngAfterViewInit() {
  }
  drawBricks(ctx) {
    for (let c = 0; c < this.brickColumnCount; c++) {
      for (let r = 0; r < this.brickRowCount; r++) {
        if (this.bricks[c][r].status == 1) {
          var brickX = (r * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;
          var brickY = (c * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;
          this.bricks[c][r].x = brickX;
          this.bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
         // ctx.fillStyle = "#b22222";
         ctx.fillStyle = 'rgb(' + Math.floor(255 - 42.5 * c) + ', ' +
         Math.floor(255 - 42.5 * r) + ', 0)';
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }
  collisionDetection(x,y,dy) {
    for (let c = 0; c < this.brickColumnCount; c++) {
      for (let r = 0; r < this.brickRowCount; r++) {
        var b = this.bricks[c][r];
        if (b.status == 1) {
          if (x > b.x && x < b.x + this.brickWidth && y > b.y && y < b.y + this.brickHeight) {
            dy = -dy;
            this.pointService.incrementScore();
            b.status = 0;
            if (this.pointService.getScore() == this.brickRowCount * this.brickColumnCount) {
              this.success = true;
              return;
            }
          }
        }
      }
    }
  }

}
