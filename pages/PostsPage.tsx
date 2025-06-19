"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Loader2,
  Plus,
  Calendar,
  User,
  Tag,
  BookOpen,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";
import Link from "next/link";

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  slug: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewPost, setViewPost] = useState<Post | null>(null);
  const [deletePostId, setDeletePostId] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:9090/api/posts`);
      if (!response.ok) throw new Error("Failed to fetch posts");
      const data = await response.json();
      setPosts(data.posts);
      console.log(data);
      setError("");
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError(
        "Failed to load posts. Please make sure the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDelete = async () => {
    if (!deletePostId) return;
    try {
      const res = await fetch(
        `http://localhost:9090/api/posts/${deletePostId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
        console.log(data)
      if (!res.ok) throw new Error("Failed to delete");
      setPosts((prev) => prev.filter((post) => post._id !== deletePostId));
      setDeletePostId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const openEditModal = (post: Post) => {
    setEditPost(post);
    setModalOpen(true);
  };

  const handleEditSubmit = async () => {
    if (!editPost) return;
    const { _id, title, content, author, tags } = editPost;
    try {
      const res  = await fetch(`http://localhost:9090/api/posts/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          author: author.trim(),
          tags: tags.map((t) => t.trim()),
        }),
      });
        const data = await res.json();
        console.log(data)

      setModalOpen(false);
      setEditPost(null);
      fetchPosts();
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 mt-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <Link href="/create-post">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Post
            </Button>
          </Link>
        </div>

        {error && (
          <Alert className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card
              key={post._id}
              className="border border-gray-200 hover:shadow-lg transition"
            >
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>
                  {post.author} • {formatDate(post.createdAt)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-2 line-clamp-3 text-gray-700">
                  {post.content}
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setViewPost(post)}>
                    <Eye className="w-4 h-4 mr-1" /> Read More
                  </Button>
                  <Button variant="outline" onClick={() => openEditModal(post)}>
                    <Pencil className="w-4 h-4 mr-1" /> Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => setDeletePostId(post._id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {viewPost && (
          <Dialog open={!!viewPost} onOpenChange={() => setViewPost(null)}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto px-6 py-5 rounded-xl shadow-lg">
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold">
                  {viewPost.title}
                </DialogTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {viewPost.author} • {formatDate(viewPost.createdAt)}
                </p>
              </DialogHeader>

              <div className="mt-4 space-y-4">
                <div className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
                  {viewPost.content}
                </div>

                {viewPost.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {viewPost.tags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="rounded-full px-3 py-1 text-xs"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}

        {editPost && (
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Post</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Title
                  </label>
                  <Input
                    value={editPost.title}
                    onChange={(e) =>
                      setEditPost({ ...editPost, title: e.target.value })
                    }
                    placeholder="Title"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Author
                  </label>
                  <Input
                    value={editPost.author}
                    onChange={(e) =>
                      setEditPost({ ...editPost, author: e.target.value })
                    }
                    placeholder="Author"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Tags</label>
                  <Input
                    value={editPost.tags.join(", ")}
                    onChange={(e) =>
                      setEditPost({
                        ...editPost,
                        tags: e.target.value.split(","),
                      })
                    }
                    placeholder="Tags (comma separated)"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">
                    Content
                  </label>
                  <Textarea
                    value={editPost.content}
                    onChange={(e) =>
                      setEditPost({ ...editPost, content: e.target.value })
                    }
                    rows={6}
                    placeholder="Content"
                  />
                </div>
              </div>
              <DialogFooter className="pt-4">
                <Button onClick={handleEditSubmit}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {deletePostId && (
          <Dialog
            open={!!deletePostId}
            onOpenChange={() => setDeletePostId(null)}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Delete</DialogTitle>
              </DialogHeader>
              <p>
                Are you sure you want to delete this post? This action cannot be
                undone.
              </p>
              <DialogFooter className="pt-4">
                <Button variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
                <Button variant="outline" onClick={() => setDeletePostId(null)}>
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
