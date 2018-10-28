import React from 'react';
import { shallow } from 'enzyme';
import {LoginPage} from "../../src/components/pages/LoginPage";

let loginSpy, wrapper;

beforeEach(() => {

	loginSpy = jest.fn();

	wrapper = shallow(<LoginPage login={loginSpy}/>)

});

test("RenderLoginPage", () => {
    expect(wrapper).toMatchSnapshot();
});
/*
test("CallLoginOnLoginButtonClick", () => {
    wrapper.find("input").at(0).simulate("change", { target: { value: "username" }});
	wrapper.find("input").at(1).simulate("change", { target: { value: "password" }});
	wrapper.find("button").simulate("click");

	expect(loginSpy).toHaveBeenCalled();

});
*/