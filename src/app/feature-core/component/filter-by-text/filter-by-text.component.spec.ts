import { FilterByTextComponent } from './filter-by-text.component';
import { FormControl } from '@angular/forms';
import { EventEmitter } from '@angular/core';

describe('FilterByTextComponent', () => {
  let component: FilterByTextComponent;

  beforeEach(() => {
    component = new FilterByTextComponent();
  });

  it('should init amcCode', () => {
    expect(component.dataCode instanceof FormControl).toBe(true);
  });

  it('should init event emitter amcCode changed', () => {
    expect(component.dataChanged instanceof EventEmitter).toBe(true);
  });

  describe('AMC Code value changed', () => {
    beforeEach(function () {
      spyOn(component.dataChanged, 'emit');
    });

    it('should emit amc code when amc code value changed', () => {
      component.ngOnInit();
      component.dataCode.setValue('mock_amc_code');

      expect(component.dataChanged.emit).toHaveBeenCalledWith('mock_amc_code');
    });

    it('should emit amc code with specfic data when amc code value changed', () => {
      component.ngOnInit();
      component.dataCode.setValue('mock_amc_code2');

      expect(component.dataChanged.emit).toHaveBeenCalledWith('mock_amc_code2');
    });

    it('should emit amc code one times when amc code value changed', () => {
      component.ngOnInit();
      component.dataCode.setValue('mock_amc_code');

      expect(component.dataChanged.emit).toHaveBeenCalledTimes(1);
    });
  });

  describe('setDefaultValue', () => {
    it('should default value when have default value', () => {
      let defaultValue = 'ABC';
      component.setDefaultValue(defaultValue);
      expect(component.dataCode.value).toEqual('ABC');
    });

    it('should not default value when value is undefined', () => {
      spyOn(component.dataCode, 'setValue');
      let defaultValue;
      component.setDefaultValue(defaultValue);
      expect(component.dataCode.setValue).not.toHaveBeenCalled();
    });

    it('should not default value when value is null', () => {
      spyOn(component.dataCode, 'setValue');
      let defaultValue = null;
      component.setDefaultValue(defaultValue);
      expect(component.dataCode.setValue).not.toHaveBeenCalled();
    });
  });

  describe('clearCode', () => {
    it('should clear code to be empty', () => {
      component.dataCode.setValue('mock_code');
      component.clearCode();
      expect(component.dataCode.value).toEqual('');
    });
  });

  describe('focusElement', () => {
    beforeEach(() => {
      component.focus = {
        nativeElement: jasmine.createSpyObj('nativeElement', ['focus'])
      };
    });

    it('should call focus when have focus element', () => {
      component.focusElement = 'change';
      expect(component.focus.nativeElement.focus).toHaveBeenCalled();
    });
  });

});

