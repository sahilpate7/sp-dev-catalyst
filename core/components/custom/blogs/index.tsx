import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';
import { getFormatter } from 'next-intl/server';

import { BlogPostList } from '@/vibes/soul/sections/blog-post-list';
import { client } from '~/client';
import { graphql } from '~/client/graphql';
import { revalidate } from '~/client/revalidate-target';

interface Props {
  numberOfBlogs?: number;
  className?: string;
}

const RecentBlogPostsQuery = graphql(`
  query RecentBlogPostsQuery($first: Int!) {
    site {
      content {
        blog {
          posts(first: $first) {
            edges {
              node {
                author
                entityId
                name
                path
                plainTextSummary
                publishedDate {
                  utc
                }
                thumbnailImage {
                  url: urlTemplate(lossy: true)
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`);

export default async function Blogs({ numberOfBlogs = 3, className }: Props) {
  const first = Math.max(1, Math.floor(numberOfBlogs));
  const response = await client.fetch({
    document: RecentBlogPostsQuery,
    variables: { first },
    fetchOptions: { next: { revalidate } },
  });

  const posts = response.data.site.content.blog?.posts;

  if (!posts) {
    return null;
  }

  const format = await getFormatter();

  return (
    <BlogPostList
      className={className}
      placeholderCount={first}
      posts={removeEdgesAndNodes(posts).map((post) => ({
        id: String(post.entityId),
        author: post.author,
        content: post.plainTextSummary,
        date: format.dateTime(new Date(post.publishedDate.utc)),
        image: post.thumbnailImage
          ? {
              src: post.thumbnailImage.url,
              alt: post.thumbnailImage.altText,
            }
          : undefined,
        href: post.path,
        title: post.name,
      }))}
    />
  );
}
