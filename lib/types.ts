export type Post = {
  id: string;
  title: string;
  authorId: string;
};

export type UserWithPosts = {
  id: string;
  name: string;
  username: string | null;
  posts: Post[];
};

export type PostWithAuthor = Post & {
  author: {
    id: string;
    name: string;
  };
};

export type AuthorOption = {
  id: string;
  name: string;
};
