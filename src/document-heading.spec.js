/* eslint-env node, jest */

import { mount, createLocalVue } from "@vue/test-utils";
import DocumentHeading from "./document-heading.vue";
import DocumentSection from "./document-section.vue";

describe("DocumentHeading component", function () {
  function mountDocumentHeading (props, mountOpts) {
    return mount(DocumentHeading, {
      propsData: { ...props },
      ...mountOpts,
    });
  }

  function mountTemplate (template, componentOpts, props, mountOpts) {
    let localVue = createLocalVue();

    let Component = localVue.extend({
      components: { DocumentHeading, DocumentSection },
      template,
      ...componentOpts,
    });

    return mount(Component, {
      propsData: { ...props },
      ...mountOpts,
    });
  }

  it("should render properly", function () {
    let wrapper = mountDocumentHeading();
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render the given slot", function () {
    let wrapper = mountDocumentHeading({}, {
      scopedSlots: {
        default: "<span>Random heading text</span>",
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render with given level prop", function () {
    let wrapper = mountDocumentHeading({ level: 3 });
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render inside of a section", function () {
    let wrapper = mountTemplate(`
    <DocumentSection>
        <DocumentHeading>Heading level 1</DocumentHeading>
    </DocumentSection>`);
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render inside of nested sections", function () {
    let wrapper = mountTemplate(`
    <DocumentSection>
        <DocumentSection>
            <DocumentHeading>Heading level 2</DocumentHeading>
        </DocumentSection>
    </DocumentSection>`);
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should ignore section if level prop is a number", function () {
    let wrapper = mountTemplate(`
    <DocumentSection>
        <DocumentSection>
            <DocumentHeading level="4">Heading level 4</DocumentHeading>
        </DocumentSection>
    </DocumentSection>`);
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should follow custom level on section", function () {
    let wrapper = mountTemplate(`
    <DocumentSection>
        <DocumentSection level="4">
            <DocumentHeading>Heading level 4</DocumentHeading>
        </DocumentSection>
    </DocumentSection>`);
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render relative levels", function () {
    let wrapper = mountTemplate(`
    <DocumentSection>
        <DocumentHeading>Heading level 1</DocumentHeading>
        <DocumentSection>
            <DocumentHeading level="-1">Heading level 2-1=1</DocumentHeading>
            <DocumentHeading level="+2">Heading level 2+2=4</DocumentHeading>
            <DocumentSection>
                <DocumentHeading level="-1">Heading level 3-1=2</DocumentHeading>
            </DocumentSection>
        </DocumentSection>
    </DocumentSection>`);
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render relative levels of sections", function () {
    let wrapper = mountTemplate(`
    <DocumentSection>
        <DocumentHeading>Heading level 1</DocumentHeading>
        <DocumentSection level="+2">
            <DocumentHeading>Heading level 1+2=3</DocumentHeading>
            <DocumentHeading level="+2">Heading level 1+2+2=5</DocumentHeading>
            <DocumentSection>
                <DocumentHeading>Heading level 1+2+1=4</DocumentHeading>
            </DocumentSection>
        </DocumentSection>
    </DocumentSection>`);
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should not allow heading lower than 1", function () {
    let wrapper = mountTemplate("<DocumentHeading level=\"-100\">Heading level 1</DocumentHeading>");
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should not allow heading bigger than 6", function () {
    let wrapper = mountTemplate("<DocumentHeading level=\"100\">Heading level 6</DocumentHeading>");
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should not allow section lower than 1", function () {
    let wrapper = mountTemplate(`
    <DocumentSection>
        <DocumentSection level="-100">
            <DocumentHeading>Heading level 1</DocumentHeading>
        </DocumentSection>
    </DocumentSection>`);
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should not allow section bigger than 6", function () {
    let wrapper = mountTemplate(`
    <DocumentSection>
        <DocumentSection level="+100">
            <DocumentHeading>Heading level 6</DocumentHeading>
        </DocumentSection>
    </DocumentSection>`);
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render relative root sections", function () {
    let wrapper = mountTemplate(`
    <DocumentSection level="+2">
        <DocumentHeading>Heading level 1+2=3</DocumentHeading>
    </DocumentSection>`);
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should render relative root heading", function () {
    let wrapper = mountTemplate("<DocumentHeading level=\"+2\">Heading level 1+2=3</DocumentHeading>");
    expect(wrapper.element).toMatchSnapshot();
  });
});
