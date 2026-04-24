import { createContext, useEffect, useState } from 'react';

export const PostContext = createContext();

const STORAGE_KEY = 'red-social-posts';

const buildId = () =>
  window.crypto?.randomUUID?.() ??
  `post-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

const initialPosts = [
  {
    id: buildId(),
    author: 'John Doe',
    avatar: 'https://www.w3schools.com/w3images/avatar2.png',
    createdAt: '2 min',
    content:
      'Hoy estudié React y puede manejar posts, likes y comentarios sin problemas.',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    likes: 21,
    liked: false,
    shares: 4,
    comments: [
      {
        id: buildId(),
        author: 'Jane Doe',
        text: '¡Excelente! Se ve muy bien el diseño.',
        createdAt: '1 min',
        replies: [],
      },
    ],
  },
  {
    id: buildId(),
    author: 'Jane Doe',
    avatar: 'https://www.w3schools.com/w3images/avatar5.png',
    createdAt: '16 min',
    content:
      'Estoy practicando mi primera red social en React. ¡Listo para el siguiente desafío!',
    image: null,
    likes: 14,
    liked: false,
    shares: 2,
    comments: [],
  },
  {
    id: buildId(),
    author: 'Angie Jane',
    avatar: 'https://www.w3schools.com/w3images/avatar6.png',
    createdAt: '32 min',
    content: 'Miren esta vista increíble, me recuerda a un post de Facebook.',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80',
    likes: 27,
    liked: false,
    shares: 7,
    comments: [
      {
        id: buildId(),
        author: 'Simon',
        text: 'Hermosa foto, quiero visitarlo yo también.',
        createdAt: '28 min',
        replies: [
          {
            id: buildId(),
            author: 'Angie Jane',
            text: '¡Deberías! Es un lugar mágico.',
            createdAt: '25 min',
          },
        ],
      },
    ],
  },
];

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setPosts(JSON.parse(stored));
      } catch {
        setPosts(initialPosts);
      }
    } else {
      setPosts(initialPosts);
    }
  }, []);

  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    }
  }, [posts]);

  const addPost = (author, content, image) => {
    const post = {
      id: buildId(),
      author: author.name,
      avatar: author.avatar,
      createdAt: 'Ahora',
      content,
      image: image || null,
      likes: 0,
      liked: false,
      shares: 0,
      comments: [],
    };
    setPosts((prev) => [post, ...prev]);
  };

  const toggleLike = (postId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const addComment = (postId, author, text) => {
    if (!text.trim()) return;
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: buildId(),
                  author: author.name,
                  text,
                  createdAt: 'Ahora',
                  replies: [],
                },
              ],
            }
          : post
      )
    );
  };

  const addReply = (postId, commentId, author, text) => {
    if (!text.trim()) return;
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId
                  ? {
                      ...comment,
                      replies: [
                        ...comment.replies,
                        {
                          id: buildId(),
                          author: author.name,
                          text,
                          createdAt: 'Ahora',
                        },
                      ],
                    }
                  : comment
              ),
            }
          : post
      )
    );
  };

  const sharePost = (postId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, shares: post.shares + 1 } : post
      )
    );
  };

  const deletePost = (postId) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
  };

  const updatePost = (postId, content, image) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, content, image: image || null }
          : post
      )
    );
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  return (
    <PostContext.Provider
      value={{
        posts,
        addPost,
        toggleLike,
        addComment,
        addReply,
        sharePost,
        deletePost,
        updatePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
