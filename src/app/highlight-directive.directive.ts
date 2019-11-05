import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlightDirective]'
})
export class HighlightDirectiveDirective {

  constructor( private elem:ElementRef) { 
    //elem.nativeElement.style.backgroundColor='blue';
  }
  @HostListener('mouseenter') 
  onMouseEnter() {
    this.elem.nativeElement.style.backgroundColor='aqua';
  }

  @HostListener('mouseleave') 
  onMouseLeave() {
    this.elem.nativeElement.style.backgroundColor='white';
  }


}
