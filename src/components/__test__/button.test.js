import React from 'react';
import Button from '../Button/Button';
import { shallow } from 'enzyme';

let component;
let buttonText = 'test';
let buttonType = 'primary-button';
let a = 5;
const test = () => a++;

describe('Button component is working properly', () => {
  beforeEach(() => {
    component = shallow(
      <Button
        label={buttonText}
        type={buttonType}
        handleClick={test}
        disableCheck={true}
      />);
  });

  it('Button showing text properly', () => {
    expect(component.props().children).toBe(buttonText)
  })

  it('Button class is rendering correctly', () => {
    expect(component.hasClass(buttonType)).toBe(true)
  })

  it('Button action is working properly', () => {
    component.find('button').simulate('click');
    expect(a).toBe(6)
  })

  it('Button snapshot test', () => {
    expect(component).toMatchSnapshot();
  })
})
