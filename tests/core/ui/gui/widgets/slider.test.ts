import { settings } from '../../../../';
import { Tab } from '../../../../../src/core/ui/gui';

describe('PoncheSlider', () => {
  beforeEach(() => {
    settings.reset();
  });

  it('should create a new slider', () => {
    const tab = new Tab('Test');
    const slider = tab.Slider({
      var: 'test',
      text: '',
      min: 0,
      max: 100,
    });

    expect(slider).toBeTruthy();
  });

  it('should return the default value', () => {
    const tab = new Tab('Test');
    const slider = tab.Slider({
      var: 'test',
      text: '',
      min: 0,
      max: 100,
    });

    expect(slider.Value()).toBe(0);
  });

  it('should return the set value', () => {
    const tab = new Tab('Test');
    const slider = tab.Slider({
      var: 'test',
      text: '',
      min: 0,
      max: 100,
      default: 50,
    });

    expect(slider.Value()).toBe(50);
  });

  it('should set the value', () => {
    const tab = new Tab('Test');
    const slider = tab.Slider({
      var: 'test',
      text: '',
      min: 0,
      max: 100,
      default: 50,
    });

    slider.Set(100);

    expect(slider.Value()).toBe(100);
  });
});
