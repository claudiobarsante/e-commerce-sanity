import { screen } from '@testing-library/react';
import { renderWithTheme } from 'utils/tests/helpers';
import { themeApp } from 'styles/theme';
import Footer from '.';

describe('<Footer/>', () => {
  it('should render footer component', () => {
    const { debug, container } = renderWithTheme(<Footer />);

    debug(container);
    const footer = screen.getByText(
      '2022 Phanox Headphones All rights reserverd'
    );

    expect(footer).toBeInTheDocument();
    expect(footer).toHaveStyle({
      'font-size': themeApp.font.sizes.small,
      'font-weight': themeApp.font.xbold
    });
  });

  it('shoul render the icons', () => {
    renderWithTheme(<Footer />);
    //*get by the aria-label attribute
    expect(screen.getByLabelText('Copyright circle')).toBeInTheDocument();
    expect(screen.getByLabelText('Instagram')).toBeInTheDocument();
    expect(screen.getByLabelText('Twitter')).toBeInTheDocument();
  });
});
