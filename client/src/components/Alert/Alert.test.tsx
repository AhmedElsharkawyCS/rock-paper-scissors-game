import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Alert from './Alert';

describe('components/alert', () => {
  it('should render Alert correctly', async () => {
    render(<Alert />);
    const wrapper = await screen.findByRole('alert');
    expect(wrapper).toBeTruthy();
  });

  it('should render an error message as children', async () => {
    const alertMsg = 'alert message';
    render(<Alert children={alertMsg} />);
    const wrapper = await screen.findByText(alertMsg);
    expect(wrapper).toBeInTheDocument();
  });

  it('should be contained on MuiAlert-outlined class if variant="outlined"', async () => {
    render(<Alert variant="outlined" />);
    const wrapper = await screen.findByRole('alert');
    expect(wrapper.className.includes('MuiAlert-outlined')).toBe(true);
  });

  it('should be contained on MuiAlert-outlinedSuccess class if severity="success"', async () => {
    render(<Alert severity="success" />);
    const wrapper = await screen.findByRole('alert');
    expect(wrapper.className.includes('MuiAlert-outlinedSuccess')).toBe(true);
  });

  it('should call onClose fun if we click on the action button', async () => {
    const onClose = jest.fn();
    render(<Alert onClose={onClose} />);
    const wrapper = await screen.findByTitle('Close');
    userEvent.click(wrapper);
    expect(onClose).toHaveBeenCalled();
  });
});
