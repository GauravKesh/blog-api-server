'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, PenTool, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface FormData {
  title: string;
  content: string;
  author: string;
  tags: string;
}

interface FormErrors {
  title?: string;
  content?: string;
  author?: string;
  tags?: string;
  general?: string;
}

export default function CreatePostPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    author: '',
    tags: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Title cannot exceed 200 characters';
    }

    // Content validation
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length < 10) {
      newErrors.content = 'Content must be at least 10 characters';
    }

    // Author validation
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    } else if (formData.author.length > 100) {
      newErrors.author = 'Author name cannot exceed 100 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag);

      const response = await fetch('http://localhost:9090/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          author: formData.author,
          tags: tagsArray
        }),
      });

      const data = await response.json();
      console.log(data)

      if (!response.ok) {
        if (data.errors) {
          // Handle validation errors from backend
          const backendErrors: FormErrors = {};
          data.errors.forEach((error: string) => {
            if (error.includes('Title')) backendErrors.title = error;
            else if (error.includes('Content')) backendErrors.content = error;
            else if (error.includes('Author')) backendErrors.author = error;
            else backendErrors.general = error;
          });
          setErrors(backendErrors);
        } else {
          setErrors({ general: data.message || 'Failed to create post' });
        }
        return;
      }

      setSuccess(true);
      
      // Redirect to posts page after short delay
      setTimeout(() => {
        router.push('/blogs');
      }, 2000);

    } catch (error) {
      console.error('Error creating post:', error);
      setErrors({ 
        general: 'Network error. Please check if the backend server is running.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PenTool className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Post Created Successfully!
              </h3>
              <p className="text-gray-600 mb-4">
                Your blog post has been created and will be available shortly.
              </p>
              <p className="text-sm text-gray-500">
                Redirecting to posts page...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 mt-10">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/blogs" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Posts
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Post</h1>
          <p className="text-gray-600">Share your thoughts with the world</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PenTool className="w-5 h-5 text-blue-600" />
              New Blog Post
            </CardTitle>
            <CardDescription>
              Fill in the details below to create your blog post
            </CardDescription>
          </CardHeader>
          <CardContent>
            {errors.general && (
              <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">
                  {errors.general}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Field */}
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter your post title..."
                  value={formData.title}
                  onChange={handleInputChange}
                  className={errors.title ? 'border-red-500 focus:border-red-500' : ''}
                />
                {errors.title && (
                  <p className="text-sm text-red-600">{errors.title}</p>
                )}
                <p className="text-xs text-gray-500">
                  {formData.title.length}/200 characters
                </p>
              </div>

              {/* Author Field */}
              <div className="space-y-2">
                <Label htmlFor="author">Author *</Label>
                <Input
                  id="author"
                  name="author"
                  placeholder="Your name..."
                  value={formData.author}
                  onChange={handleInputChange}
                  className={errors.author ? 'border-red-500 focus:border-red-500' : ''}
                />
                {errors.author && (
                  <p className="text-sm text-red-600">{errors.author}</p>
                )}
                <p className="text-xs text-gray-500">
                  {formData.author.length}/100 characters
                </p>
              </div>

              {/* Tags Field */}
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  name="tags"
                  placeholder="Enter tags separated by commas (e.g., technology, web development)"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className={errors.tags ? 'border-red-500 focus:border-red-500' : ''}
                />
                {errors.tags && (
                  <p className="text-sm text-red-600">{errors.tags}</p>
                )}
                <p className="text-xs text-gray-500">
                  Optional: Add tags to help categorize your post
                </p>
              </div>

              {/* Content Field */}
              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Write your blog post content here..."
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={12}
                  className={`resize-none ${errors.content ? 'border-red-500 focus:border-red-500' : ''}`}
                />
                {errors.content && (
                  <p className="text-sm text-red-600">{errors.content}</p>
                )}
                <p className="text-xs text-gray-500">
                  {formData.content.length} characters (minimum 10)
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating Post...
                    </>
                  ) : (
                    <>
                      <PenTool className="w-4 h-4 mr-2" />
                      Create Post
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/posts')}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}