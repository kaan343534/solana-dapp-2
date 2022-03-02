// pages/api/post/index.ts

import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { title, content, imageUrl } = req.body;

  const session = await getSession({ req });
  if (!session) { 
      res.json({ error: "Not authenticated"})
      return
  }

  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      image: imageUrl,
      published: true,
      author: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}