import prisma from '../../lib/prisma';
import Post from '../../components/Post';

export const getServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  
  return {
    props: post,
  };
}

const PostDetail = (props) => {
  console.log(props)
  if (!props) { return (
      <div className='container flex items-center max-w-3xl bg-fuchsia-100/50'> 
          <h2 className='text-2x font-semibold'>No posts available!</h2>
      </div>
  ) }

  return (
       <div className='flex flex-col justify-center items-center mx-auto min-w-4x space-y-4 px-4 py-2'>
         <div className='relative flex rounded-2xl items-center justify-center max-w-3xl bg-fuchsia-100/50 py-10 mx-auto m-10'> 
            <Post post={props} />
         </div>
        

      </div>
  )

}

export default PostDetail