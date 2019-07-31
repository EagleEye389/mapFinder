import React from 'react'
import { shallow } from 'enzyme';
import App from '../../container/App/App'

describe('Test component is rendering', () => {
    test('Basic HTML is rendered', () => {
        const wrapper = shallow(<App />)
        expect(wrapper.find('.content').length).toBe(1)
    })

    test('Check whether state is updated', () => {
        const wrapper = shallow(<App />)
        const path = [0,1,2,3];
        const mockPath = {path}

        wrapper.instance().updateMap(mockPath.path);
        expect(wrapper.instance().state.path).toBe(mockPath.path)
    })
})