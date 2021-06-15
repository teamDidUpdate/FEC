import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AnswerPhotos from '../../client/src/QA/QAcomponents/AnswerPhotos.jsx';

configure({ adapter: new Adapter() });

describe('<AnswerPhoto />', () => {
  it('Should render a container of photos', () => {
    const wrapper = shallow(<AnswerPhotos />);
    expect(wrapper.find('.answer-photo-box')).toBeDefined();
  });
});