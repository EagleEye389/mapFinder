import React from 'react';
import InputControl from '../../container/input/InputControl';
import { mount } from 'enzyme';

let component;
let array = [1, 2, 3]
let input1,
  input1Instance,
  input2,
  input2Instance;
let resetArray = () => {
  array.length = 0;
}
describe('Input Control Functionality Check', () => {
  beforeEach(() => {
    component = mount(
      <InputControl
        google={{}}
        resetMap={() => resetArray()}
        getDirections={() => Promise.resolve({})}
      />)
  }

  );
  beforeEach(() => { input1 = component.find('input').at(0),
    input1Instance = input1.instance(),
    input2 = component.find('input').at(1),
    input2Instance = input2.instance()
  })

  it("Input is working properly", () => {
    input1Instance.value = 'india';
    input1.simulate('change', { target: { value: 'india' } })
    expect(component.state("from")).toBeTruthy();
  })


  it("Cross button is visible when input is present", () => {
    input1Instance.value = 'india';

    input1.simulate('change', { target: { value: 'india' } });
    expect(component.find('button').first()).toBeTruthy();
  })

  it("Reset button clear the state and map", () => {
    input1Instance.value = 'india';
    input1.simulate('change', { target: { value: 'india' } });
    input2Instance.value = 'india';
    input2.simulate('change', { target: { value: 'india' } });
    component.find('button').at(1).simulate('click')
    expect(component.state('from')).toBeFalsy();
    expect(input1Instance.value).toBe('')
    expect(array.length).toBe(0);
  })
})
