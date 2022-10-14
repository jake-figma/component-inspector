![](ComponentInspectorBanner.png)

# Component Inspector

A [Figma plugin](https://www.figma.com/community/plugin/1162860898904210114) for inspecting Figma components.

Components and Component Properties are incredibly powerful features in Figma.

This plugin allows developers to inspect those properties in a mental model similar to the way they describe components.

This plugin does _not_ generate style code. It generates code for the language of components and the description of properties.

Currently supporting instance and component code generation for:

- React function components
- Angular components
- Vue components (both option and composition APIs)
- Web components

As well as:

- JSON

This is just the beginning! Would love to hear from you about what works and what is lacking.

## Conventions / Pro Tips

Currently, this plugin supports tag-named slots. Add the `--SLOT[tagname]` suffix to the name of a text component property in Figma and it will generate a slot for that attribute. For example, if you create a component with a text property named `"heading--SLOT[h2]"`, it would generate the following React instance and definition code:

```tsx
<MyComponent heading={<h2>My slot content</h2>} />;

const MyComponent: FC<{ heading: ReactNode }> = ({ heading }) => <>{heading}</>;
```
