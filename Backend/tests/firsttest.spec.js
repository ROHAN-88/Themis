const { test, expect } = require("@playwright/test");
const { response } = require("express");

const base_url = "http://127.0.0.1:5000/api";
test("test post API for login", async ({ request }) => {
  const response = await request.post(`${base_url}/auth/login`, {
    data: {
      email: "rohan@gmail.com",
      password: "thealksjdfkl234@#",
    },
  });
  console.log(`Status: ${response.status()}`);
  console.log("Response Body:", await response.text());
  expect(response.status()).toBe(200);
});
test("test for emoji sending", async ({ request }) => {
  const response = await request.post(`${base_url}/auth/signup`, {
    data: {
      name: "Rohan Shrestha",
      email: "roha😒🫢n@gmail.com",
      password: "thealksjdfkl2🤣34@#",
      phoneno: "9867876734",
    },
  });

  expect(response.status()).toBe(406);
});
