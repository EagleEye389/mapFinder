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
          // jest.spyOn(component.prototype, 'getRef').mockImplementationOnce(mockGetRef);
     
           console.log(component.find("input").first().getDOMNode())
           expect(component.state('from')).toBeTruthy();

        })

})