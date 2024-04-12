import * as React from "react";
import Layout from "../components/layout";

import Seo from "../components/seo";

const AboutPage = () => {
  return (
    <Layout pageTitle="About Me">
      <h1>About</h1>
    </Layout>
  );
};

export const Head = () => <Seo title="About Me" />;

export default AboutPage;
