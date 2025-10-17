import { NgModule } from '@angular/core';
import { Heart, LucideAngularModule, Search, Trash2 } from 'lucide-angular';

@NgModule({
  imports: [LucideAngularModule.pick({ Heart, Trash2, Search })],
})
export class Icon {}
