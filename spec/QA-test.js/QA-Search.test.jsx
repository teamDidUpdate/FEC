import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Search from '../../client/src/QA/QAcomponents/Search.jsx';

configure({ adapter: new Adapter() });

test('QA search bar exists', () => {
  const search = shallow(<Search />);

  expect(search.exists('div.qa-search')).toEqual(true);
});

test('QA search bar passes search string', () => {
  const testString = { search: '' };
  const search = shallow(
    <Search
      search={e => testString.search = e.target.value}
      searchString={testString.search}
    />
  );

  expect(search.find('input').prop('value')).toEqual(undefined);
  search.find('input').simulate('change', {
    target: { className: 'qa-search-bar', value: 'cookies' },
  });
  expect(testString.search).toEqual('cookies');
});

// FIX ME