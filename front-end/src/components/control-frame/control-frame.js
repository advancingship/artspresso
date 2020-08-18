import React, {useState} from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import 'bootstrap/dist/css/bootstrap.min.css';

function ControlFrame(props) {
    const [radioValue, setRadioValue] = useState(props.mode);

    const mode_names = props.mode_names;

    const radios = mode_names.map((name, index) => {
        return {name: name, value: "" + (index + 1)}}
        );

    const handle_change = (e) => {

        setRadioValue(e.currentTarget.value);
        props.set_mode(e.currentTarget.value);
    }

    return (
        <>
            <ButtonGroup role="radiogroup" toggle aria-label="controls">
                {radios.map((radio, idx) => (
                    <ToggleButton
                        role="button"
                        aria-label={radio.value}
                        key={idx}
                        type="radio"
                        variant="secondary"
                        name="radio"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={handle_change}
                    >
                        {radio.name}
                    </ToggleButton>
                ))}
            </ButtonGroup>
        </>
    )
}

export default ControlFrame;