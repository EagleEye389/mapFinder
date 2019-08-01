import React from 'react';
import Button from '../Button/Button';
import {shallow} from 'enzyme';

let component;
let buttonText = 'test';
let buttonClass = 'test'; 
let a = 5;      
const test =()=> a++;        

describe('Button component is hidden check',()=>{
     
    beforeEach(() => {
        component = shallow(<Button isvisible={false} />);
      });
        
    it('Button is hidden', () => {
        expect(component.find('button').length).toBe(0);
    });
});

describe('Button component is workinf properly',()=>{
    beforeEach(() => {
        component = shallow(<Button label={buttonText} styler={buttonClass} handleClick={test} />);
      });

      it('Button showing text properly',()=>{
        expect(component.props().children).toBe(buttonText)
    })

    it('Button class is rendering correctly',()=>{        
        expect(component.hasClass(buttonClass)).toBe(true)

    })

    it('Button action is working properly',()=>{             
        component.find('button').simulate('click');
        expect(a).toBe(6)
    })
    
    it('Button snapshot test',()=>{
        expect(component).toMatchSnapshot();

    })

})