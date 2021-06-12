// setup file: add these to the top of each test files

import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FILE_NAME from 'FILE_PATH'; // TODO: add your file & path here

configure({ adapter: new Adapter() });

test('FILL_ME_IN', () => {

  expect(FILL_ME_IN)
    .toEqual(FILL_ME_IN);
});