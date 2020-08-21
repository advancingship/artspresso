import { useState } from "react";

export default function useApp(props) {
    const mode_names = ["Create", "Delete", "Arrange"];
    const [mode, set_mode] = useState(props.mode || "1");

    return {
        mode_names,
        mode,
        set_mode,
    }
}