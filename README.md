# angular-three-sixty

> Angular 360° component using the [three-sixty library](https://github.com/mediamanDE/three-sixty).

## Installation

```bash
npm install --save @mediaman/angular.three-sixty
```

## Importing library

You need to import the module in your application:

```javascript
import { NgModule } from '@angular/core';
import { ThreeSixtyModule } from '@mediaman/angular-three-sixty';

@NgModule({
    imports: [ThreeSixtyModule]
});
export class AppModule {
}
```

## Usage

### Basic usage

```javascript
import { Component } from '@angular/core';

@Component({
    selector: 'product-page',
    template: `<mm-three-sixty [width]="1280"
                [height]="720"
                [angles]="36" 
                [anglesPerImage]="6" 
                [images]="threeSixtyImages" 
                [preload]="true"></mm-three-sixty>`
})
export class ProductPageComponent {
    public threeSixtyImages: string[] = [
        'http://example.com/image-0.jpg',
        'http://example.com/image-1.jpg',
        'http://example.com/image-2.jpg',
        'http://example.com/image-3.jpg',
        'http://example.com/image-4.jpg',
        'http://example.com/image-5.jpg'
    ];
}
```

### Alter the speed

The default speed factor is set to `5`. You can change it with the `speedFactor` input.

```javascript
import { Component } from '@angular/core';

@Component({
    selector: 'product-page',
    template: `<mm-three-sixty [width]="1280"
                [height]="720"
                [angles]="36" 
                [anglesPerImage]="6" 
                [images]="threeSixtyImages"
                [speedFactor]="1"
                [preload]="true"></mm-three-sixty>`
})
export class ProductPageComponent {
    public threeSixtyImages: string[] = [
        'http://example.com/image-0.jpg',
        'http://example.com/image-1.jpg',
        'http://example.com/image-2.jpg',
        'http://example.com/image-3.jpg',
        'http://example.com/image-4.jpg',
        'http://example.com/image-5.jpg'
    ];
}
```

### Hotspots

You can show hotspots at defined angles to advertise the viewed product better.

```javascript
import { Component } from '@angular/core';
import { HotspotInterface } from '@mediaman/three-sixty/dist/interfaces/hotspot.interface';

@Component({
    selector: 'product-page',
    template: `<mm-three-sixty [width]="1280"
                [height]="720"
                [angles]="36" 
                [anglesPerImage]="6" 
                [images]="threeSixtyImages"
                [hotspots]="hotspots"
                [preload]="true"></mm-three-sixty>`
})
export class ProductPageComponent {
    public threeSixtyImages: string[] = [
        'http://example.com/image-0.jpg',
        'http://example.com/image-1.jpg',
        'http://example.com/image-2.jpg',
        'http://example.com/image-3.jpg',
        'http://example.com/image-4.jpg',
        'http://example.com/image-5.jpg'
    ];
    
    public hotspots: HotspotInterface[] = [
        {
            text: 'Lorem ipsum 1',
            angle: 0.78,
            endAngle: 0.95,
            top: '25%',
            left: '27.5%'
        },
        {
            text: 'Lorem ipsum 2',
            angle: 0.4,
            endAngle: 0.6,
            top: '65%',
            left: '60%'
        }
    ];
}
```

### Events

#### preloaded

If you set the input parameter `preload` to `true`, the `preload` output event gets triggered when all three sixty images
are loaded.

This can be usefull if you want to implement a loading indicator.

```javascript
import { Component } from '@angular/core';

@Component({
    selector: 'product-page',
    template: `<mm-three-sixty [width]="1280"
                [height]="720"
                [angles]="36" 
                [anglesPerImage]="6" 
                [images]="threeSixtyImages" 
                [preload]="true" 
                (preloaded)="onPreloaded()"></mm-three-sixty>`
})
export class ProductPageComponent {
    public threeSixtyImages: string[] = [
        'http://example.com/image-0.jpg',
        'http://example.com/image-1.jpg',
        'http://example.com/image-2.jpg',
        'http://example.com/image-3.jpg',
        'http://example.com/image-4.jpg',
        'http://example.com/image-5.jpg'
    ];
    
    public onPreloaded() {
        console.log('ready to go');
    }
}
```
