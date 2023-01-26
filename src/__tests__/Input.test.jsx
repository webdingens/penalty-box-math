import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import InputWrapper, { Input } from "../components/Input";
import { useContext } from "react";
import SettingsContext from "../SettingsContext";

test("displays an input field", async () => {
  const input = render(<Input />);

  const inputElements = input.container.querySelectorAll("input");

  expect(inputElements.length).toBe(1);

  const inputElement = inputElements[0];
  expect(inputElement).toBeDefined();
  expect(inputElement).toHaveProperty("value");
  expect(inputElement.value).toEqual("");
  input.unmount();
});

test("displays two input fields when split input field is set", async () => {
  const InputUsingContext = () => {
    const settings = useContext(SettingsContext.Context);
    return (
      <Input
        settings={{
          ...settings,
          splitInput: true,
        }}
      />
    );
  };
  const input = render(
    <SettingsContext.Provider>
      <InputUsingContext />
    </SettingsContext.Provider>
  );

  const inputElements = input.container.querySelectorAll("input");

  expect(inputElements.length).toBe(2);

  const inputElement = inputElements[0];
  expect(inputElement).toBeDefined();
  expect(inputElement).toHaveProperty("value");
  expect(inputElement.value).toEqual("");
  input.unmount();
});

test("displays two input fields when split input field is set", async () => {
  const input = render(
    <SettingsContext.Context.Provider
      value={{
        splitInput: true,
      }}
    >
      <InputWrapper />
    </SettingsContext.Context.Provider>
  );

  const inputElements = input.container.querySelectorAll("input");

  expect(inputElements.length).toBe(2);

  const inputElement = inputElements[0];
  expect(inputElement).toBeDefined();
  expect(inputElement).toHaveProperty("value");
  expect(inputElement.value).toEqual("");
  input.unmount();
});
