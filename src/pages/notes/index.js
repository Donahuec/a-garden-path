import * as React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import { surface } from "../../components/layout.module.css";
import {
  notePreview,
  noteTitle,
  noteGrid,
  noteTitleContainer,
  noteExcerpt,
  pageTitle,
} from "./notes.module.css";

const BlogPage = ({ data }) => {
  return (
    <Layout pageTitle="My Notes">
      <h1 className={pageTitle}>Notes</h1>
      <ul className={noteGrid}>
        {data.allMarkdownRemark.nodes.map((node) => (
          <article className={`${surface} ${notePreview}`} key={node.id}>
            <h2 className={noteTitleContainer}>
              <Link to={node.fields.slug} className={noteTitle}>
                {node.frontmatter.title}
              </Link>
            </h2>
            <p className={noteExcerpt}>{node.excerpt}</p>
            <p>Modified: {node.frontmatter.modified}</p>
          </article>
        ))}
      </ul>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark {
      nodes {
        frontmatter {
          title
          created(formatString: "MMMM D, YYYY")
          modified(formatString: "MMMM D, YYYY")
        }
        id
        excerpt
        fields {
          slug
        }
      }
    }
  }
`;

export const Head = () => <Seo title="My Blog Posts" />;

export default BlogPage;
