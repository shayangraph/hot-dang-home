import { getTextAlign } from "utils/fonts";

export const Paragraph = ({ content, textAlign = "left", textColor }) => {
  return (
    <p
      className={`max-w-5xl mx-auto ${getTextAlign(textAlign)}`}
      style={{ color: textColor }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
