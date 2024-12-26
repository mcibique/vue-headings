/* eslint-env node, jest */

import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import DocumentSection from "./document-section.vue";

describe("DocumentSection component", function () {
  function mountDocumentSection (props, mountOpts) {
    return mount(DocumentSection, {
      propsData: { ...props },
      ...mountOpts,
    });
  }

  it("should render properly", function () {
    let wrapper = mountDocumentSection();
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render as the given tag", function () {
    let wrapper = mountDocumentSection({ tag: "main" });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render the default slot", function () {
    let wrapper = mountDocumentSection({}, {
      scopedSlots: {
        default: "<span>Random text</span>",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
