import { TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { ThreeSixtyComponent } from '../src/three-sixty.component';
import { ThreeSixtyFactory } from '../src/three-sixty.factory';
import { By } from '@angular/platform-browser';
import ThreeSixty from '@mediaman/three-sixty';

describe('ThreeSixtyComponent', () => {
    let fixture: ComponentFixture<ThreeSixtyComponent>;
    let component: ThreeSixtyComponent;
    let canvasElement: HTMLCanvasElement;
    let threeSixtyFactory: ThreeSixtyFactory;
    let threeSixty: ThreeSixty;

    beforeEach((done) => {
        TestBed.configureTestingModule({
            declarations: [ThreeSixtyComponent],
            providers: [ThreeSixtyFactory]
        });

        TestBed.compileComponents().then(done);
    });

    beforeEach(inject([ThreeSixtyFactory], (_threeSixtyFactory: ThreeSixtyFactory) => {
        fixture = TestBed.createComponent(ThreeSixtyComponent);
        component = fixture.componentInstance;
        threeSixtyFactory = _threeSixtyFactory;

        canvasElement = fixture.debugElement.query(By.css('canvas')).nativeElement;
        threeSixty = threeSixtyFactory.create(canvasElement, {
            angles: 36,
            anglesPerImage: 6
        });

        spyOn(threeSixtyFactory, 'create').and.returnValue(threeSixty);
        spyOn(threeSixty, 'initialize');
        spyOn(threeSixty, 'preload').and.returnValue(new Promise((resolve) => resolve()));
    }));

    it('should set the canvas dimension', () => {
        component.width = 1280;
        component.height = 720;

        fixture.detectChanges();

        expect(canvasElement.width).toBe(1280);
        expect(canvasElement.height).toBe(720);
    });

    describe('::ngOnInit', () => {
        const angles = 36;
        const anglesPerImage = 6;
        const images = [
            'http://example.com/image-0.jpg',
            'http://example.com/image-1.jpg',
            'http://example.com/image-2.jpg',
            'http://example.com/image-3.jpg',
            'http://example.com/image-4.jpg',
            'http://example.com/image-5.jpg'
        ];

        beforeEach(() => {
            component.angles = angles;
            component.anglesPerImage = anglesPerImage;
            component.images = images;
        });

        it('should initialize a ThreeSixty instance', () => {
            component.ngOnInit();

            expect(threeSixtyFactory.create).toHaveBeenCalledWith(canvasElement, {
                angles: angles,
                anglesPerImage: anglesPerImage
            });
            expect(threeSixty.initialize).toHaveBeenCalledWith(images);
            expect(threeSixty.preload).not.toHaveBeenCalled();
        });

        it('should configure the speedFactor if the input parameter is set', () => {
            const speedFactor = 10;

            component.speedFactor = speedFactor;

            component.ngOnInit();

            expect(threeSixtyFactory.create).toHaveBeenCalledWith(canvasElement, {
                angles: angles,
                anglesPerImage: anglesPerImage,
                speedFactor
            });
        });

        it('should configure the hotspots if the input parameter is set', () => {
            const hotspots = [
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

            component.hotspots = hotspots;

            component.ngOnInit();

            expect(threeSixtyFactory.create).toHaveBeenCalledWith(canvasElement, {
                angles: angles,
                anglesPerImage: anglesPerImage,
                hotspots
            });
        });

        it('should preload the images if the preload flag is set', () => {
            component.preload = true;

            component.ngOnInit();

            expect(threeSixty.preload).toHaveBeenCalled();
        });

        it('should trigger the preloaded event when the images are preloaded', (done) => {
            spyOn(component.preloaded, 'emit');

            component.preload = true;

            component.ngOnInit();

            setTimeout(() => {
                expect(component.preloaded.emit).toHaveBeenCalled();

                done();
            });
        });
    });
});
