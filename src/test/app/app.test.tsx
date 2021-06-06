import * as React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import App from '../../App';

describe('App', () => {
  it('should render without error', () => {
    const Renderer = ShallowRenderer.createRenderer();

    Renderer.render(<App />);

    const wrapper = Renderer.getRenderOutput();

    expect(wrapper).toMatchSnapshot();
  });
});