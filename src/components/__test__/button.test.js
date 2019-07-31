import React from 'react';
import Button from '../Button/Button';
import {shallow} from 'enzyme';


it('renders without crashing', () => {

const buttonControl = shallow(<Button  Isvisible={false}/>)
 expect(buttonControl.find('button')).toBe(0);
});
