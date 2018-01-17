import { NgModule } from '@angular/core';
import { ThreeSixtyComponent } from './three-sixty.component';
import { ThreeSixtyFactory } from './three-sixty.factory';

@NgModule({
    declarations: [ThreeSixtyComponent],
    providers: [ThreeSixtyFactory],
    exports: [ThreeSixtyComponent]
})
export class ThreeSixtyModule {
}
