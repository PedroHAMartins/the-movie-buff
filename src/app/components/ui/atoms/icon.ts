import { NgModule } from '@angular/core';
import { Heart, LucideAngularModule } from 'lucide-angular';

@NgModule({
  imports: [LucideAngularModule.pick({ Heart })],
})
export class Icon {}
