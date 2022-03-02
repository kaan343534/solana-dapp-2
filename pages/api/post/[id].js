
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const postId = req.query.id

  if (req.method === 'DELETE') {
      try {
         const post = await prisma.post.delete({
             where: { id : Number(postId)}
         }) 
         res.status(200).json(post)
         return
      } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Error occured while deleting ...'})
          
      }
  }
  const { title, content, imageUrl } = req.body;

  const session = await getSession({ req });
  if (!session) { 
      res.status(401).json({ error: "Not authenticated"})
      return
  }
  try {
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
} catch (error) {
    console.log(error)
    res.status(401).json({error: 'Error occured'})
}
}