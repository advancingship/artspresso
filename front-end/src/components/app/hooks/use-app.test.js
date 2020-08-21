import { renderHook} from '@testing-library/react-hooks';

import { useApp } from '.';

describe("useApp", () => {

    describe("mode_names", () => {

        it("returns the mode names", () => {
            const {result} = renderHook(() => useApp({mode: "1"}));
            expect(result.current.mode_names).toStrictEqual([
                "Create",
                "Delete",
                "Arrange",
            ]);
        });
    });
});
