import React from 'react';
import InputControl from '../../container/input/inputControl';
import {mount, simulate} from 'enzyme';

let component;
describe('Input Control Functionality Check', ()=>{
    beforeEach(() => {
        component = mount(<InputControl  google={{}} resetMap={() => null} getDirections={() => null} /> )}
        );

        it("Input clearing is working properly",()=>{
           component.find('input').first().simulate('change', { target :{value:'test'}})       
           console.log(component.find("input").first())
           expect(component.state('from')).toBeTruthy();

        })

})