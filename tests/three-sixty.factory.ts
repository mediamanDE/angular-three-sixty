import { ThreeSixtyFactory } from '../src/three-sixty.factory';
import { TestBed } from '@angular/core/testing';
import { inject } from '@angular/core/testing';
import ThreeSixty from '@mediaman/three-sixty';

describe('ThreeSixtyFactory', () => {
    let threeSixtyFactory: ThreeSixtyFactory;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ThreeSixtyFactory]
        })
    });

    beforeEach(inject([ThreeSixtyFactory], (_threeSixtyFactory: ThreeSixtyFactory) => {
        threeSixtyFactory = _threeSixtyFactory;
    }));

    describe('::create', () => {
        it('should create a ThreeSixty instance', () => {
            const threeSixty = threeSixtyFactory.create(document.createElement('canvas'), {
                angles: 36,
                anglesPerImage: 6
            });

            expect(threeSixty instanceof ThreeSixty).toBeTruthy();
        });
    });
});
