# Vue headings

Automated heading ranks for HTML document outline using vue.js. Contains 2 components that will automatically generate proper `<h1>`-`<h6>` elements based on the section structure of your HTML document.

Each `document-heading` inside of root `document-section` will become `h1`. If you nest two `document-section` components, each `document-heading` inside will become `<h2>`, etc.

Useful for dynamically setting headings in re-usable components when you don't know where your component will be placed in the DOM.

Consider you have an accordion component rendering this:

```html
<ul>
  <li>
    <h4>Heading 1</h4>
    ... content ...
  </li>
  <li>
    <h4>Heading 2</h4>
    ... content ...
  </li>
  <li>
    <h4>Heading 3</h4>
    ... content ...
  </li>
</ul>
```

Is `<h4>` the right heading here? If there are no `<h3>` elements on the page, those should be `<h3>`s instead!

Replace the `<h4>` with `<document-heading>` component and it will automatically generate that for you based on number of `<document-section>`s it is nested in.

## Installation

```sh
npm install vue-headings --save
```

or

```sh
yarn add vue-headings
```

`vue-headings` requires vue.js v2.

## Usage

### Basic example

```html
// my-component.vue

<template>
  <document-section>
    <document-heading>My Heading</document-heading>

    <document-section>
      <document-heading>My Child Heading</document-heading>
      <p>Lorem ipsum ...</p>

      <document-heading>My Child Heading</document-heading>
      <p>Lorem ipsum ...</p>

      <document-heading>My Child Heading</document-heading>
      <p>Lorem ipsum ...</p>

      <document-section>
        <document-heading>My Grand Child Heading</document-heading>
        <p>Lorem ipsum ...</p>

        <document-heading>My Grand Child Heading</document-heading>
        <p>Lorem ipsum ...</p>
      </document-section>
    </document-section>
  </document-section>
</template>
```

```js
import { DocumentSection, DocumentHeading } from 'vue-headings';

export default {
  name: 'MyComponent',
  components: { DocumentSection, DocumentHeading },
}
```

Renders following document structure:

```html
<section>
  <h1>My Heading</h1>

  <section>
    <h2>My Child Heading</h2>
    <p>Lorem ipsum ...</p>

    <h2>My Child Heading</h2>
    <p>Lorem ipsum ...</p>

    <h2>My Child Heading</h2>
    <p>Lorem ipsum ...</p>

    <section>
      <h3>My Grand Child Heading</h3>
      <p>Lorem ipsum ...</p>

      <h3>My Grand Child Heading</h3>
      <p>Lorem ipsum ...</p>
    </section>
  </section>
</section>
```

### Custom section tag

If you don't like `<section>` element, you can pass any other tag into the `tag` prop:

```html
<document-section tag="main">
  <document-section tag="nav">
    ...
  </document-section>
  <document-section tag="footer">
    ...
  </document-section>
</document-section>
```

### Custom section level

You can adjust the current level of section by passing custom level via prop:

```html
<document-section level="2"> <!-- This section would normally be level 1 -->
  <document-section><!-- This section will have level 3 (parent + 1) -->
    <document-heading>H3</document-heading>
  </document-section>
  <document-section level="1"><!-- ignores the parent and sets the level to 1 -->
    <document-heading>H1</document-heading>
  </document-section>
</document-section>
```

### Relative section level

You can set the current level of the section relatively to it's parent section.

```html
<document-section level="4">
  <document-section level="+2"><!-- This section will have level 6 (parent + 2) -->
    <document-heading>H6</document-heading>
  </document-section>
  <document-section level="-2"><!-- This section will have level 2 (parent - 2) -->
    <document-heading>H2</document-heading>
  </document-section>
</document-section>
```

### Custom heading level

You can adjust the current level of heading by passing custom level via prop:

```html
<document-section>
  <document-section>
    <document-heading level="5">H5</document-heading> <!-- ignores the parent level and use level 5 -->
  </document-section>
  <document-section>
    <document-heading level="1">H1</document-heading><!-- ignores the parent and sets the level to 1 -->
  </document-section>
</document-section>
```

### Relative heading level

You can set the current level of the heading relatively to it's parent section.

```html
<document-section level="4">
  <document-heading level="-2">H2</document-heading><!-- This heading will have level 2 (parent - 2) -->
  <document-section level="2">
    <document-heading level="+3">H5</document-heading><!-- This heading will have level 5 (parent + 3) -->
  </document-section>
</document-section>
```

### Heading rank overflow

Heading level cannot reach level lower than 1 and greater than 6. If calculated level is lower than one, it will become 1. If calculated level is greater than 6, it will become 6.

```html
<document-section level="100">
  <document-heading>H6</document-heading>
  <document-heading level="-200">H1</document-heading>
  <document-heading level="+100">H6</document-heading>
</document-section>
```
