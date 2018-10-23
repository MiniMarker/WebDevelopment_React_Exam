import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../src/components/Header';

test('should render Header correctly', () => {
	const wrapper = shallow(<Header />);
	expect(wrapper).toMatchSnapshot();
});
