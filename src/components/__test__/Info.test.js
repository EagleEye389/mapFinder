import React from 'react';
import Info from '../Information/Information';
import {shallow} from 'enzyme';

let component;
let testData="test";
describe("Testing Info Control",()=>{

 beforeEach(() => {
        component = shallow(<Info label={testData} value={testData} classStyle={testData} />);
  });

 it('Snapshot test', () => {
    expect(component).toMatchSnapshot();
  });

  it('Label prop test',()=>{
    expect(component.props())

  });

})