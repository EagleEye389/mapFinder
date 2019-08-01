import React from 'react';
import Button from '../Button/Button';
import {shallow} from 'enzyme';

describe('Button component is rendering properly',()=>{

    it('Button is visible', () => {
     const buttonControl = shallow(<Button  Isvisible={true}/>)
     expect(buttonControl.find('button').length).toBe(1);
    });
    
    it('Button is hidden', () => {
        const buttonControl = shallow(<Button  Isvisible={false}/>)
        expect(buttonControl.find('button').length).toBe(0);
    });

    it('Button showing text properly',()=>{
        let buttonText = 'test';
        const buttonControl = shallow(<Button  Isvisible={true} label={buttonText} />)
        expect(buttonControl.props().children).toBe(buttonText)
    })

    it('Button class is rendering correctly',()=>{        
        let buttonClass = 'test';        
        const buttonControl = shallow(<Button  Isvisible={true} styler={ buttonClass }/>)
        expect(buttonControl.hasClass(buttonClass)).toBe(true)

    })

    it('Button action is working properly',()=>{  
        let a = 5;      
        const test =()=> a++;    
        const buttonControl = shallow(<Button  Isvisible={true}  action={test}/>)
        buttonControl.find('button').simulate('click');
        expect(a).toBe(6)
    })
    
    it('Button snapshot test',()=>{
        const buttonControl = shallow(<Button  Isvisible={true}  action={test}/>)
        expect(buttonControl).toMatchSnapshot();

    })

})
