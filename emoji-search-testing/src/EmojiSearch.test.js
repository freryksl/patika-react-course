import React from "react";
import { render, screen, getNodeText } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import App from "./App";

describe("Emoji Search Tests", () => {
  beforeEach(() => {
    render(<App />);
  });
  test("Was title rendered?", () => {
    const title = screen.getByText("Emoji Search");
    expect(title).toBeInTheDocument();
  });
  test("Were items rendered?", () => {
    const items = screen.queryAllByTestId("filter-items");
    expect(items.length).toEqual(20);
  });
  test("Filter works properly?", () => {
    const searchedValue = "glass";
    const searchInput = screen.getByPlaceholderText("search");
    userEvent.type(searchInput, searchedValue);
    const results = screen.queryAllByTestId("filter-keywords");
    const regex = new RegExp(`${searchedValue}`);
    results.forEach((el) => {
      expect(getNodeText(el)).toMatch(regex);
    });
  });
  test("Data copied to clipboard?", () => {
    let copiedData = "";
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(val => {
            copiedData = val;
        }),
      },
    });
    const items = screen.queryAllByTestId("filter-items");
    const randomItem = Math.floor(Math.random() * items.length);
    const selectedItemSymbol = items[randomItem].getAttribute(
      "data-clipboard-text"
    );
    userEvent.click(items[randomItem]);
    expect(copiedData).toBe(selectedItemSymbol);
  });
});
