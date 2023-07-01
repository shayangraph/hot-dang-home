import { gql } from "@apollo/client";
import client from "client";

export default function Home(props) {
  console.log(props);
  return <div>Next JS &amp; WordPress course.</div>;
}

export const getStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query NewQuery {
        nodeByUri(uri: "/") {
          ... on Page {
            id
            blocks
          }
        }
      }
    `,
  });
  return {
    props: { blocks: data.nodeByUri.blocks },
  };
};
