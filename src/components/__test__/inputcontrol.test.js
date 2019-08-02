import React from 'react';
import InputControl from '../../container/input/inputControl';
import {mount} from 'enzyme';

let component;
let array = [1,2,3]
let input ,inputInstance;
let resetArray =()=>{
     array.length = 0;
}
describe('Input Control Functionality Check', ()=>{
       beforeEach(() => {
        component = mount(<InputControl  google={{}} resetMap={() => resetArray()} getDirections={() => null} /> )}

        );
        beforeEach(()=>{
         
        input  = component.find('input').first(),
        inputInstance =  input.instance()
        })

        it("Input is working properly",()=>{
           inputInstance.value = 'test'; 
           input.simulate('change', { target :{value:'test'}})  
           expect(component.state("from")).toBeTruthy();    
           expect(component.state("emptyErrorFrom")).toBe("");    

        })

        
        it("Clear button is visible when input is present",()=>{            
            inputInstance.value = 'test'; 
            input.simulate('change', { target :{value:'test'}});
            expect(component.find('button').first()).toBeTruthy();  
 
         })

         it("Reset button clear the state and map",()=>{
            inputInstance.value = 'test'; 
            input.simulate('change', { target :{value:'test'}});
            component.find('button').at(2).simulate('click')
            expect(component.state("from")).toBeFalsy();  
            expect(inputInstance.value).toBe('')
            expect(array.length).toBe(0);
 
         })
         it("Submit button check for empty input",()=>{
            component.find('button').at(0).simulate('click');
            expect(component.state('emptyErrorFrom')).toBe('errorOutline');

         })


})