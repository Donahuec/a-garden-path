import * as React from "react";
import { graphql } from "gatsby";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import {
  articleHead,
  articleTitle,
  articleDates,
  metadataItem,
  metadataContent,
  metadataTitle,
  articleMetadata,
  articleTags,
  tag,
  articleGraph,
  articleContent,
  articleBacklinks,
} from "./note-instance.module.css";
import { surface } from "../../components/layout.module.css";

const BlogPost = ({ data }) => {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  return (
    <Layout pageTitle={frontmatter.title}>
      <article>
        <div className={articleHead}>
          <h1 className={articleTitle}>{frontmatter.title}</h1>
          <div className={`${articleDates} ${surface}`}>
            <span className={metadataItem}>
              <span className={metadataTitle}>Created:</span>
              <span className={metadataContent}>{frontmatter.created}</span>
            </span>
            <span className={metadataItem}>
              <span className={metadataTitle}>Modified:</span>
              <span className={metadataContent}>{frontmatter.modified}</span>
            </span>
          </div>
          <div className={`${articleMetadata} ${surface}`}>
            <span className={metadataItem}>
              <span className={metadataTitle}>Status:</span>
              <span className={metadataContent}>{frontmatter.status}</span>
            </span>
            <span className={metadataItem}>
              <span className={metadataTitle}>Type:</span>
              <span className={metadataContent}>{frontmatter.epi}</span>
            </span>
          </div>
          <div className={`${articleTags} ${surface}`}>
            {frontmatter.tags.map((tagName) => (
              <span key={tagName} className={tag}>
                #{tagName}
              </span>
            ))}
          </div>
          <div className={`${articleGraph} ${surface}`}>Local Graph</div>
        </div>
        <div
          className={`${articleContent} ${surface}`}
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
        <div className={`${articleBacklinks} ${surface}`}>Backlinks</div>
      </article>
    </Layout>
  );
};

export const query = graphql`
  query ($id: String) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        status
        epi
        tags
        created(formatString: "MMMM D, YYYY")
        modified(formatString: "MMMM D, YYYY")
      }
    }
  }
`;

export const Head = ({ data }) => (
  <Seo title={data.markdownRemark.frontmatter.title} />
);

export default BlogPost;
