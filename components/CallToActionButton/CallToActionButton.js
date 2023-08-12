import { ButtonLink } from "components/ButtonLink/ButtonLink";

export const CallToActionButton = ({
  align = "left",
  destination,
  buttonLabel,
}) => {
  const alignMap = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };
  return (
    <div className={alignMap[align]}>
      <ButtonLink destination={destination} label={buttonLabel} />
    </div>
  );
};
