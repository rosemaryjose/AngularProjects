import { Component, OnInit, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { GlobalConstants } from '../shared/constants';
import { BrickService } from '../services/brick.service';
import { BallService } from '../services/ball.service';
import { PaddleService } from '../services/paddle.service';
import { PointService } from '../services/point.service';
@Component({
  selector: 'app-brick-ball',
  templateUrl: './brick-ball.component.html',
  styleUrls: ['./brick-ball.component.css']
})
export class BrickBallComponent implements OnInit, AfterViewInit {

  @ViewChild("brickCanvas") brickCanvas;
  context: CanvasRenderingContext2D;
  ctx;
  ballRadius = 10;
  x;
  y;
  canvas;
  paddleHeight = 10;
  paddleWidth = 75;
  paddleX;
  dx = 2;
  dy = -2;
  game=true;fail=false;success=false;
  leftPressed = false; rightPressed = false;
  constructor(private brickService: BrickService,
              private ballService: BallService, 
              private paddleService: PaddleService,
              private pointService: PointService) { }
  @HostListener('document:keydown', ['$event'])
  public handleKeyDownEvent(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      this.leftPressed = true;
    } else if (event.key === 'ArrowRight') {
      this.rightPressed = true;
    }
  }
  @HostListener('document:keyup', ['$event'])
  public handleKeyUpEvent(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      this.leftPressed = false;
    } else if (event.key === 'ArrowRight') {
      this.rightPressed = false;
    }
  }
  @HostListener('document:mousemove', ['$event'])
  public handleMouseMoveEvent(event: MouseEvent): void {
    var relativeX = event.clientX - this.canvas.offsetLeft;
    if (relativeX > 0 && relativeX < this.canvas.width) {
      this.paddleX = relativeX - this.paddleWidth / 2;
    }
  }

  ngOnInit() { }
  ngAfterViewInit() {
    this.canvas = this.brickCanvas.nativeElement;
    this.context = this.canvas.getContext("2d");
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height - 20;
    this.ctx = this.context;
    this.paddleX = (this.canvas.width - this.paddleWidth) / 2;
    this.draw();
  }
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.brickService.drawBricks(this.ctx);
    this.ballService.drawBall(this.ctx,this.x,this.y);
    this.paddleService.drawPaddle(this.ctx,this.canvas,this.paddleX);
    this.pointService.drawScore(this.ctx);
    this.pointService.drawLives(this.ctx,this.canvas);
    this.brickService.collisionDetection(this.x,this.y,this.dy);
    if(this.brickService.success){
      this.success = this.brickService.success
      this.game = false;
      return;
    }
    if (this.x + this.dx > this.canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
      this.dx = -this.dx;
    }
    if (this.y + this.dy > this.canvas.height - this.ballRadius) {
      if (this.x > this.paddleX && this.x < this.paddleX + this.paddleWidth) {
        this.dy = -this.dy-1;
      }else{
        this.pointService.decrementLives();
        if (!this.pointService.getLives()) {
         this.fail = true;
         this.game = false;
        } else {
          this.x = this.canvas.width / 2;
          this.y = this.canvas.height - 30;
          this.dx = 2;
          this.dy = -2;
          this.paddleX = (this.canvas.width - this.paddleWidth) / 2;
        }
      }
    } else if (this.y + this.dy < this.ballRadius) {
      this.dy = -this.dy;
    }
    if (this.rightPressed && this.paddleX < this.canvas.width - this.paddleWidth) {
      this.paddleX += 7;
    }
    else if (this.leftPressed && this.paddleX > 0) {
      this.paddleX -= 7;
    }
    this.x += this.dx;
    this.y += this.dy;
    if(this.game){
    requestAnimationFrame(() => {
      this.draw()
    });
  }
  }


/*   drawPaddle() {
    this.ctx.beginPath();
    this.ctx.rect(this.paddleX, this.canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fill();
    this.ctx.closePath();
  } */
  /*   collisionDetection() {
      for (let c = 0; c < this.brickColumnCount; c++) {
        for (let r = 0; r < this.brickRowCount; r++) {
          var b = this.bricks[c][r];
          if (b.status == 1) {
            if (this.x > b.x && this.x < b.x + this.brickWidth && this.y > b.y && this.y < b.y + this.brickHeight) {
              this.dy = -this.dy;
              this.score++;
              b.status = 0;
              if (this.score == this.brickRowCount * this.brickColumnCount) {
                alert("YOU WIN, CONGRATULATIONS!");/* 
                document.location.reload(); *//*
}
}
}
}
}
} */
  

}
