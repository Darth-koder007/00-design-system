import type { Preview } from "@storybook/react";
import "@ds/tokens/css";
import "@ds/components/css";

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
  },
  globalTypes: {
    theme: {
      description: "Global theme for components",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: ["light", "dark"],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      document.documentElement.dataset.theme = context.globals.theme ?? "light";
      return <Story />;
    },
  ],
};

export default preview;
