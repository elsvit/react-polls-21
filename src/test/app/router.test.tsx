import * as React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Router from '~/AppRouter';
import {createMemoryHistory} from 'history';

describe('Router', () => {
  it('should render without error', () => {
    const Renderer = ShallowRenderer.createRenderer();
    const history = createMemoryHistory();

    Renderer.render(<Router history={history} />);

    const wrapper = Renderer.getRenderOutput();

    expect(wrapper).toMatchSnapshot();
  });
});