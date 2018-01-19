import {
    Component,
    ElementRef,
    ViewChild,
    Input,
    OnInit,
    Output,
    EventEmitter,
    ViewEncapsulation,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { ThreeSixtyFactory } from './three-sixty.factory';
import { HotspotInterface } from '@mediaman/three-sixty/dist/interfaces/hotspot.interface';
import { ConfigurationInterface } from '@mediaman/three-sixty/dist/interfaces/configuration.interface';
import ThreeSixty from '@mediaman/three-sixty';

@Component({
    selector: 'mm-three-sixty',
    styleUrls: ['../node_modules/@mediaman/three-sixty/dist/three-sixty.css'],
    template: `<canvas #canvasElement class="mm-three-sixty" [width]="width" [height]="height"></canvas>`,
    encapsulation: ViewEncapsulation.None
})
export class ThreeSixtyComponent implements OnInit, OnChanges {

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
     * The three sixty instance
     */
    private threeSixty: ThreeSixty;

    /**
     * @param threeSixtyFactory
     */
    public constructor(private threeSixtyFactory: ThreeSixtyFactory) {
    }

    /**
     * @inheritDoc
     */
    public ngOnInit() {
        this.threeSixty = this.threeSixtyFactory.create(this.canvasElement.nativeElement, this.getThreeSixtyConfiguration());

        this.threeSixty.initialize(this.images, this.startAngle);

        if (this.preload) {
            this.threeSixty.preload().then(() => this.preloaded.emit());
        }
    }

    /**
     * @inheritDoc
     */
    public ngOnChanges(changes: SimpleChanges) {
        if (!this.threeSixty) {
            return;
        }

        // Don't update the configuration if only the images have been changed
        const changedProperties = Object.keys(changes);
        if (changedProperties.length === 1 && changedProperties[0] === 'images') {
            return;
        }

        this.threeSixty.updateConfiguration(this.getThreeSixtyConfiguration());
    }

    /**
     * Get the configuration object for the ThreeSixty instance
     */
    private getThreeSixtyConfiguration(): ConfigurationInterface {
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
        return configuration;
    }
}
