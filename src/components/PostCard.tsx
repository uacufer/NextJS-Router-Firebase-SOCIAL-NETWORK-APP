import { useState } from 'react';
import Image from 'next/image';
import { Heart, MessageCircle } from 'lucide-react';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Post } from '@/types';
import { useAuth } from '@/lib/auth-context';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(user ? post.likes.includes(user.uid) : false);
  const [likesCount, setLikesCount] = useState(post.likes.length);

  const handleLike = async () => {
    if (!user) return;

    const postRef = doc(db, 'posts', post.id);
    if (isLiked) {
      await updateDoc(postRef, {
        likes: arrayRemove(user.uid)
      });
      setLikesCount(prev => prev - 1);
    } else {
      await updateDoc(postRef, {
        likes: arrayUnion(user.uid)
      });
      setLikesCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center space-x-3 mb-4">
        {post.authorPhotoURL ? (
          <Image
            src={post.authorPhotoURL}
            alt={post.authorName}
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <div className="w-10 h-10 bg-gray-200 rounded-full" />
        )}
        <div>
          <h3 className="font-semibold">{post.authorName}</h3>
          <p className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <p className="mb-4">{post.content}</p>

      {post.imageUrl && (
        <div className="relative w-full h-64 mb-4">
          <Image
            src={post.imageUrl}
            alt="Post image"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}

      <div className="flex items-center space-x-4">
        <button
          onClick={handleLike}
          className={`flex items-center space-x-1 ${
            isLiked ? 'text-red-500' : 'text-gray-500'
          }`}
        >
          <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
          <span>{likesCount}</span>
        </button>

        <button className="flex items-center space-x-1 text-gray-500">
          <MessageCircle size={20} />
          <span>{post.comments.length}</span>
        </button>
      </div>
    </div>
  );
} 