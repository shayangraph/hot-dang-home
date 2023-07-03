import { Cover } from "components/Cover";

export const BlockRenderer = ({ blocks }) => {
  return blocks.map((block) => {
    switch (block.name) {
      case "core/cover": {
        return <Cover key={block.id} background={block.attributes.url}>core cover</Cover>;
      }
      default:
        return null;
    }
  });
};
