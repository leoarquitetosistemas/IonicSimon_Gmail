import { Directive, Input, HostListener, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';
import { Direct } from 'protractor/built/driverProviders';

enum Direction{
  UP = 1,
  DOWN = 0
}

@Directive({
  selector: '[appHideHeader]'
})
export class HideHeaderDirective {

 
  @Input('appHideHeader') header: any;
  saveY = 0;
  direction: Direction  = Direction.DOWN;
  previousY = 0;
  readonly scrollDistance = 50;

  //TUDO ISSO PARA FAZER UMA ANIMACAOZINHA!!!
  constructor(private renderer: Renderer2, private domCtrl: DomController) { }

  @HostListener('ionScroll', ['$event']) onContentScroll($event: any){
    //console.log($event.detail);

    if($event.detail.currentY <=0 || $event.detail.currentY == this.saveY){
      return; //nó de godo
    }

    const scrollTop: number = $event.detail.scrollTop;
    let newDirection = Direction.DOWN;
    let newPosition = -scrollTop + this.previousY;

    if(this.saveY > $event.detail.currentY){
      //console.log('UP'); //LOT BETTER
      //console.log('DOWN');
      newDirection = Direction.UP;
      newPosition -= this.scrollDistance;
    }//else {
      //console.log('DOWN'); //LOT BETTER
      //console.log('UP');
    //}

  let newOpacity = 1 - (newPosition / -this.scrollDistance );

    this.domCtrl.write(() => {
      //PERFECT PERFECT PERFECT PERFECT PERFECT PERFECT PERFECT PERFECT PERFECT PERFECT 
      this.renderer.setStyle(this.header, 'top', Math.min(0,newPosition) + 'px');
      this.renderer.setStyle(this.header, 'opacity', newOpacity);
    });

    this.saveY = $event.detail.currentY;

    if(this.direction != newDirection){
      this.direction = newDirection;
      this.previousY = scrollTop;
    }
  }

}
