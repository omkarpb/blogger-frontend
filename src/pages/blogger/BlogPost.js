import React from 'react';
import { useParams } from 'react-router';
import { useGetBlogPostQuery } from './blogSlice';

export const BlogPost = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetBlogPostQuery(id);

  return (
    <div>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{data.title}</h3>
          <div dangerouslySetInnerHTML={{ __html: data.content}} />
        </>
      ) : null}
    </div>
  );
};