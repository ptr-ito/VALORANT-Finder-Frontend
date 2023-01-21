import { Helmet } from "react-helmet-async";

interface Props {
  title?: string;
  description?: string;
}

export const HeadBlock = ({ title, description }: Props) => {
  return (
    <Helmet>
      <title>{title ?? "VALORANT FINDER"}</title>
      <meta name="description" content={description ?? ""} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  );
};
