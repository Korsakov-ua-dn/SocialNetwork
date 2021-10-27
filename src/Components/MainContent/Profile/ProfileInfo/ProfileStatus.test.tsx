import React from "react";
import TestRenderer, { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {

  test("Status from the props should be in the state", () => {
    const component = TestRenderer.create(<ProfileStatus status={"test-data"} updateUserStatus={() => {}} />);
    const instance = component.getInstance();
    // @ts-ignore
    expect(instance.state.status).toBe("test-data");
  });

  test("after creation <span> should be displayed", () => {
    const component = TestRenderer.create(<ProfileStatus status={"test-data"} updateUserStatus={() => {}} />);
    const root = component.root
    const span = root.findByType("span")

    expect(span).not.toBeNull()
  });

  test("after creation <input> should not be displayed", () => {
    const component = TestRenderer.create(<ProfileStatus status={"test-data"} updateUserStatus={() => {}} />);
    const root = component.root
    expect(() => {
      root.findByType("input")
    }).toThrow // генерирует ошибку в момент поиска по типу инпут
  });

  test("after creation <span> should contains correct status", () => {
    const component = TestRenderer.create(<ProfileStatus status={"test-data"} updateUserStatus={() => {}} />);
    const root = component.root
    const span = root.findByType("span")

    expect(span.children[0]).toBe("test-data")
  });

  test("input should be displayed instead of span", () => {
    const component = TestRenderer.create(<ProfileStatus status={"test-data"} updateUserStatus={() => {}} />);
    const root = component.root
    const span = root.findByType("span")
    span.props.onDoubleClick()
    const input = root.findByType("input")

    expect(input).not.toBeNull()
    expect(input.props.value).toBe("test-data")

    expect(() => {
      root.findByType("span")
    }).toThrow // ??? кажеться не работает
  });

  test("callback", () => {
    const mockcallback = jest.fn()
    const component = TestRenderer.create(<ProfileStatus status={"test-data"} updateUserStatus={mockcallback} />);
    const instance = component.getInstance();
    instance?.props.updateUserStatus("new-data")
    expect(mockcallback.mock.calls.length).toBe(1) // один вызов колбэка
    expect(mockcallback.mock.calls[0][0]).toBe("new-data")
  });

});