import TestRenderer from "react-test-renderer";
import { Paginator } from "./Paginator";

describe("Paginator", () => {

    test("should be veiw only 10 pages", () => {
        const component = TestRenderer.create( <Paginator 
            totalCount={11}
            pageSize={10}
            currentPage={1}
            onPageChanged={() => {}}
            portionSize={4} />
        )

        const root = component.root
        const spans = root.findAllByType("span")

        expect(spans.length).toBe(2)
    })
})