import { render, screen } from '@testing-library/react';
import LightBoxContainer from '../components/LightBoxContainer';

describe('LightBoxContainer', () => {
	test('renders without crashing', () => {
		render(<LightBoxContainer />);
		expect(screen.getByText('Next')).toBeInTheDocument();
		expect(screen.getByText('Previous')).toBeInTheDocument();
	});
});
