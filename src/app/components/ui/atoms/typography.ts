import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

type TitleVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type BodyVariant = 'body' | 'subtitle' | 'caption';
type TextWeight =
  | 'thin'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';

@Component({
  selector: 'typography',
  imports: [NgClass],
  standalone: true,
  template: `
    @if (type === 'title') { @switch (titleVariant) { @case ('h1') {
    <h1 [ngClass]="getClasses()"><ng-content></ng-content></h1>
    } @case ('h2') {
    <h2 [ngClass]="getClasses()"><ng-content></ng-content></h2>
    } @case ('h3') {
    <h3 [ngClass]="getClasses()"><ng-content></ng-content></h3>
    } @case ('h4') {
    <h4 [ngClass]="getClasses()"><ng-content></ng-content></h4>
    } @case ('h5') {
    <h5 [ngClass]="getClasses()"><ng-content></ng-content></h5>
    } @case ('h6') {
    <h6 [ngClass]="getClasses()"><ng-content></ng-content></h6>
    } } } @else { @switch (bodyVariant) { @case ('body') {
    <p [ngClass]="getClasses()"><ng-content></ng-content></p>
    } @case ('subtitle') {
    <span [ngClass]="getClasses()"><ng-content></ng-content></span>
    } @case ('caption') {
    <small [ngClass]="getClasses()"><ng-content></ng-content></small>
    } } }
  `,
})
export class Typography {
  @Input() type: 'title' | 'body' = 'body';
  @Input() titleVariant: TitleVariant = 'h1';
  @Input() bodyVariant: BodyVariant = 'body';
  @Input() weight: TextWeight = 'normal';
  @Input() class: string = '';

  getClasses(): string {
    const baseClasses = this.getBaseClasses();
    const weightClass = this.getWeightClass();
    return `${baseClasses} ${weightClass} ${this.class}`.trim();
  }

  private getBaseClasses(): string {
    if (this.type === 'title') {
      const titleClasses: Record<TitleVariant, string> = {
        h1: 'text-5xl md:text-6xl leading-tight tracking-tight',
        h2: 'text-4xl md:text-5xl leading-tight tracking-tight',
        h3: 'text-3xl md:text-4xl leading-snug tracking-tight',
        h4: 'text-2xl md:text-3xl leading-snug',
        h5: 'text-xl md:text-2xl leading-normal',
        h6: 'text-lg md:text-xl leading-normal',
      };
      return titleClasses[this.titleVariant];
    } else {
      const bodyClasses: Record<BodyVariant, string> = {
        body: 'text-base leading-relaxed',
        subtitle: 'text-lg leading-relaxed',
        caption: 'text-sm leading-normal text-gray-600',
      };
      return bodyClasses[this.bodyVariant];
    }
  }

  private getWeightClass(): string {
    const weightMap: Record<TextWeight, string> = {
      thin: 'font-thin',
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
      black: 'font-black',
    };
    return weightMap[this.weight];
  }
}
