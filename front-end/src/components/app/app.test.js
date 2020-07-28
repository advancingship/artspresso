import React from 'react';
import { render } from '@testing-library/react';
import App from './';

describe("<App/> Component", () => {
    it('renders app name', () => {
	const { getByText } = render(<App />);
	const app_name = getByText(/Artspresso/i);
	expect(app_name).toBeInTheDocument();
    });
    
});
    
