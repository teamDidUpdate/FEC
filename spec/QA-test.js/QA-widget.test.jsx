import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import QAwidget from '../../client/src/QA/QAwidget.jsx';

configure({ adapter: new Adapter() });

test('QAwidget mounted properly', () => {
  const widget = shallow(<QAwidget productId={13023} />);

  expect(widget.find('div.qa-header').text())
    .toEqual('Question And Answers');
});