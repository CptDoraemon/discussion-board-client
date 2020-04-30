import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import FooterColumn from "../footer-column";

let container: null | HTMLDivElement = null;
const mockData = [
    {
        title: 'title',
        url: ''
    },
    {
        title: 'list item 1',
        url: ''
    },
    {
        title: 'list item 2',
        url: ''
    },
];

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    if (!container) return;
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders a list", () => {
    act(() => {
        render(<FooterColumn data={mockData}/>, container)
    });
    expect(container?.textContent).toBe(mockData.map(obj=>obj.title).join(''))
});