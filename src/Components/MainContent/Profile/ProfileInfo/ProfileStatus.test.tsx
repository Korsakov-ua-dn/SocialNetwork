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
      const input = root.findByType("input")
    }).toThrow // генерирует ошибку в момент поиска по типу инпут
  });

  test("after creation <span> should contains correct status", () => {
    const component = TestRenderer.create(<ProfileStatus status={"test-data"} updateUserStatus={() => {}} />);
    const root = component.root
    const span = root.findByType("span")

    expect(span.children[0]).toBe("test-data")
  });

});