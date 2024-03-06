import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

const blog = {
  title: "blogin otsikko",
  author: "blogin kirjoittaja",
  url: "https://www.testi.fi/",
  likes: 2,
  user: {
    username: "user12",
    name: "testi",
    id: "63c96a395afea9cfd53e4fb5",
  },
};

test("renders title", () => {
  const { container } = render(<Blog blog={blog} />);

  const div = container.querySelector(".firstline");

  expect(div).toHaveTextContent("blogin otsikko");
});

test("clicking the button shows url, user and likes", async () => {
  const { container } = render(<Blog blog={blog} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const div = container.querySelector(".showinfo");

  expect(div).toHaveTextContent("https://www.testi.fi/");
  expect(div).toHaveTextContent("2 likes");
  expect(div).toHaveTextContent("testi");
});

test("like clicked twice works ", async () => {
  const mockHandler = jest.fn();

  render(<Blog blog={blog} updateBlog={mockHandler} />);

  const user = userEvent.setup();
  const viewbutton = screen.getByText("view");
  await user.click(viewbutton);
  const button = screen.getByText("like");
  await user.click(button);
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
