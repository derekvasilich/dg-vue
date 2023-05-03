import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import SignIn from "@/pages/SignIn.vue";

describe("SignIn.vue", () => {
  it("renders props.msg when passed", () => {
    const wrapper = shallowMount(SignIn);
  });
});
