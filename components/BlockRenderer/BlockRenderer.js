import { CallToActionButton } from "components/CallToActionButton";
import { Column } from "components/Column";
import { Columns } from "components/Columns";
import { Cover } from "components/Cover";
import { FormspreeFrom } from "components/FormspreeForm";
import { Gallery } from "components/Gallery";
import { Heading } from "components/Heading";
import { Paragraph } from "components/Paragraph";
import { PropertySearch } from "components/PropertySearch";
import Image from "next/image";
import { theme } from "theme";

export const BlockRenderer = ({ blocks }) => {
  return blocks.map((block) => {
    switch (block.name) {
      case "acf/formspreeform": {
        return (
          <FormspreeFrom key={block.id} formId={block.attributes.data.form_id} />
        );
      }
      
      case "acf/tickitem": {
        return (
          <TickItem key={block.id}>
            <BlockRenderer blocks={block.innerBlocks} />
          </TickItem>
        );
      }
      case "core/gallery": {
        return (
          <Gallery
            key={block.id}
            columns={block.attributes.columns || 3}
            cropImages={block.attributes.imageCrop}
            items={block.innerBlocks}
          />
        );
      }

      case "acf/ctabutton": {
        return (
          <CallToActionButton
            key={block.id}
            buttonLabel={block.attributes.data.label}
            destination={block.attributes.data.destination || "/"}
            align={block.attributes.data.align}
          />
        );
      }
      case "core/paragraph": {
        return (
          <Paragraph
            key={block.id}
            textAlign={block.attributes.align}
            content={block.attributes.content}
            textColor={
              theme[block.attributes.textColor] ||
              block.attributes.style?.color?.text
            }
          />
        );
      }
      case "core/post-title":
      case "core/heading": {
        return (
          <Heading
            key={block.id}
            level={block.attributes.level}
            content={block.attributes.content}
            textAlign={block.attributes.textAlign}
          />
        );
      }
      case "acf/propertysearch": {
        return <PropertySearch key={block.id} />;
      }
      case "core/cover": {
        console.log("COVER BLOCK: ", block);
        return (
          <Cover key={block.id} background={block.attributes.url}>
            <BlockRenderer blocks={block.innerBlocks} />
          </Cover>
        );
      }
      case "core/columns": {
        console.log("COLUMNS: ", block.attributes);
        return (
          <Columns
            key={block.id}
            isStackedOnMobile={block.attributes.isStackedOnMobile}
            textColor={
              theme[block.attributes.textColor] ||
              block.attributes.style?.color?.text
            }
            backgroundColor={
              theme[block.attributes.backgroundColor] ||
              block.attributes.style?.color?.background
            }
          >
            <BlockRenderer blocks={block.innerBlocks} />
          </Columns>
        );
      }
      case "core/column": {
        return (
          <Column
            key={block.id}
            width={block.attributes.width}
            textColor={
              theme[block.attributes.textColor] ||
              block.attributes.style?.color?.text
            }
            backgroundColor={
              theme[block.attributes.backgroundColor] ||
              block.attributes.style?.color?.background
            }
          >
            <BlockRenderer blocks={block.innerBlocks} />
          </Column>
        );
      }
      case "core/group":
      case "core/block": {
        return <BlockRenderer key={block.id} blocks={block.innerBlocks} />;
      }
      case "core/image": {
        return (
          <Image
            key={block.id}
            src={block.attributes.url}
            height={block.attributes.height}
            width={block.attributes.width}
            alt={block.attributes.alt || ""}
          />
        );
      }
      default: {
        console.log("UNKNOWN: ", block);
        return null;
      }
    }
  });
};
