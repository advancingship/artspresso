import React, {useState} from "react";
import {App} from "../app";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./control-frame.sass";

function ControlFrameView(props) {
    const [radioValue, setRadioValue] = useState("" + props.mode);
    const radios = App.MODE_NAMES.map((name, index) => {
        return {name: name, value: "" + (index)}}
        );
    const handle_change = (e) => {
        setRadioValue(e.currentTarget.value);
        props.set_mode(e.currentTarget.value);
    }

    return (
        <>
            <ButtonGroup role="radiogroup" toggle aria-label="controls">
                {radios.map((radio, index) => (
                    <ToggleButton
                        className="control-button"
                        role="button"
                        aria-label={radio.value}
                        key={index}
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

export default ControlFrameView;