import { Component, ElementRef, ViewChild, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ThreeSixtyFactory } from './three-sixty.factory';
import { HotspotInterface } from '@mediaman/three-sixty/dist/interfaces/hotspot.interface';
import { ConfigurationInterface } from '@mediaman/three-sixty/dist/interfaces/configuration.interface';

@Component({
    selector: 'mm-three-sixty',
    styleUrls: ['../node_modules/@mediaman/three-sixty/dist/three-sixty.css'],
    template: `<canvas #canvasElement class="mm-three-sixty" [width]="width" [height]="height"></canvas>`
})
export class ThreeSixtyComponent implements OnInit {

    /**
     * The canvas width
     */
    @Input() public width: number;

    /**
     * The canvas height
     */
    @Input() public height: number;

    /**
     * Total amount of angles
     */
    @Input() public angles: number;

    /**
     * Amount of angles per image
     */
    @Input() public anglesPerImage: number;

    /**
     * The initial angle to show (number between 0 and 360)
     */
    @Input() public startAngle: number = 0;

    /**
     * Array with all (ordered) image urls
     */
    @Input() public images: string[] = [];

    /**
     * The factor which increases the drag speed
     * Default to 5
     */
    @Input() public speedFactor: number;

    /**
     * Array of hotspots
     */
    @Input() public hotspots: HotspotInterface[];

    /**
     * Flag to control if all images should be preloaded
     */
    @Input() public preload: boolean = false;

    /**
     * Gets emitted when the images were preloaded
     */
    @Output() public preloaded: EventEmitter<null> = new EventEmitter();

    /**
     * The canvas element reference
     */
    @ViewChild('canvasElement') private canvasElement: ElementRef;

    /**
     * @param threeSixtyFactory
     */
    public constructor(private threeSixtyFactory: ThreeSixtyFactory) {
    }

    /**
     * @inheritDoc
     */
    public ngOnInit() {
        const configuration: ConfigurationInterface = {
            angles: this.angles,
            anglesPerImage: this.anglesPerImage
        };

        if (this.speedFactor >= 0) {
            configuration.speedFactor = this.speedFactor;
        }

        if (this.hotspots) {
            configuration.hotspots = this.hotspots;
        }

        const threeSixty = this.threeSixtyFactory.create(this.canvasElement.nativeElement, configuration);

        threeSixty.initialize(this.images, this.startAngle);

        if (this.preload) {
            threeSixty.preload().then(() => this.preloaded.emit());
        }
    }
}
