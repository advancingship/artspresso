import React from 'react';
import {render, screen, getNodeText} from '@testing-library/react'
import NodeFrame from './';
import { DatetimeHelper } from '../../helpers';
describe("<NodeFrame/> Component", () => {

    describe("given no props", () => {

	let container = null;
	beforeEach(() => {
	    container = render(<NodeFrame />).container;
	});

	it('renders a name field', () => {
	    const name_field = screen.getByRole('textbox', {name: /name/i});
	    expect(name_field).toBeInTheDocument();
	});

	it("displays the name placeholder by having empty value", () => {
	    const name_field = screen.getByRole('textbox', {name: /name/i});
	    expect(name_field).toHaveDisplayValue('');
	});
	
	it('renders a content field', () => {
	    const content_field = screen.getByRole('textbox',
						   {name: /content/i}
						  );
	    expect(content_field).toBeInTheDocument();
	});

	it('displays the content placeholder by having empty value', () => {
	    const content_field = screen.getByRole('textbox',
						   {name: /content/i}
						  );
	    expect(content_field).toHaveDisplayValue('');
	});
	
	it("renders a creation datetime", () => {
	    const creation_datetime_tag = screen.getByRole(
		'heading', {name: /creation-datetime/}
	    );
	    expect(creation_datetime_tag).toBeInTheDocument();
	});
	
	it("renders the creation datetime from when it was rendered", () => {
	    const creation_datetime_tag = screen.getByRole(
		'heading', {name: /creation-datetime/}
	    );
	    const creation_datetime_text = getNodeText(creation_datetime_tag);
	    const creation_datetime = DatetimeHelper.
		  app_datetime_milliseconds(creation_datetime_text);
	    const current_datetime = Date.now();
	    expect((current_datetime - creation_datetime) < 1000);
	});
	
	it("renders a modification datetime", () => {
	    const modification_datetime_tag = screen.getByRole(
		'heading', {name: /modification-datetime/}
	    );
	    expect(modification_datetime_tag).toBeInTheDocument();
	});
	
	it("renders the modification datetime as dashed-out", () => {
	    const modification_datetime_tag = screen.getByRole(
		'heading', {name: /modification-datetime/}
	    );
	    const dashed_time = '-------- --:--:--:---'
	    expect(modification_datetime_tag).toHaveTextContent(
		dashed_time
	    );
	});

	it("renders with a className for full sizing", () => {
	    screen.get
	    expect(container.firstChild).toHaveClass("full-frame");
	});
    });
    
    describe("given full props", () => {

	const now = Date.now()
	const create_time = new Date(now);
	const modify_time = new Date(now + 1234567);
	const name = "xname";
	const content = "xcontent";
	const sizing = "base-frame";	

	let container = null;
	beforeEach(() => {
	    container = render(<NodeFrame
			       name={name}
			       content={content}
			       creation_datetime={create_time}					              modification_datetime={modify_time}
			       sizing={sizing}
			       />).container;
	});
    
	it('renders a name field', () => {
	    const name_field = screen.getByRole('textbox', {name: /name/i});
	    expect(name_field).toBeInTheDocument();
	});

	it("displays the name from props", () => {
	    const name_field = screen.getByRole('textbox', {name: /name/i});
	    expect(name_field).toHaveDisplayValue(name);
	});
	
	it('renders a content field', () => {
	    const content_field = screen.getByRole('textbox',
						   {name: /content/i}
						  );
	    expect(content_field).toBeInTheDocument();
	});

	it('displays the content from props', () => {
	    const content_field = screen.getByRole('textbox',
						   {name: /content/i}
						  );
	    expect(content_field).toHaveDisplayValue(content);
	});
	
	it("renders a creation datetime", () => {
	    const creation_datetime_tag = screen.getByRole(
		'heading', {name: /creation-datetime/}
	    );
	    expect(creation_datetime_tag).toBeInTheDocument();
	});
	
	it("renders the creation datetime from props", () => {
	    const creation_datetime_tag = screen.getByRole(
		'heading', {name: /creation-datetime/}
	    );
	    const expected_create_time_text = DatetimeHelper.
		  app_datetime_string(create_time);
	    expect(creation_datetime_tag).toHaveTextContent(
		expected_create_time_text
	    );
	});
	
	it("renders a modification datetime", () => {
	    const modification_datetime_tag = screen.getByRole(
		'heading', {name: /modification-datetime/}
	    );
	    expect(modification_datetime_tag).toBeInTheDocument();
	});
	
	it("renders the modification datetime from props", () => {
	    const modification_datetime_tag = screen.getByRole(
		'heading', {name: /modification-datetime/}
	    );
	    const expected_modify_time_text = DatetimeHelper.
		  app_datetime_string(modify_time);
	    expect(modification_datetime_tag).toHaveTextContent(
		expected_modify_time_text
	    );
	});

	it("renders with a className from the 'sizing' prop", () => {
	    expect(container.firstChild).toHaveClass("base-frame");
	});
    });
});

    
