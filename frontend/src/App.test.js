import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Navbar or Home', () => {
  render(<App />);
  // Check if "Home" or "Cars" or the Navbar component renders
  expect(screen.getByText(/Home|Cars/i)).toBeInTheDocument();
});
