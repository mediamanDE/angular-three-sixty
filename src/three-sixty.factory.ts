import ThreeSixty from '@mediaman/three-sixty';
import { ConfigurationInterface } from '@mediaman/three-sixty/dist/interfaces/configuration.interface';

export class ThreeSixtyFactory {

    /**
     * @param canvasElement
     * @param configuration
     */
    public create(canvasElement: HTMLCanvasElement, configuration: ConfigurationInterface): ThreeSixty {
        return new ThreeSixty(canvasElement, configuration);
    }
}
