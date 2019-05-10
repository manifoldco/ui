namespace MarkdownRemark {
  export interface Data {
    frontmatter: {
      example?: string;
      path: string;
      title: string;
    };
    html: string;
  }
}
