
const Post = ({ post }) => {

    if (!post) {
        return (<div className="flex items-center p-4"><span className="text-xl font-semibold">No Post available!</span></div>)
    }

    if ((post) && (post != "undefined")) {
        return (
            
                <div className="relative max-w-sm max-h-sm rounded overflow-hidden shadow-lg leading-normal space-y-2">
                  <div><img className="w-full overflow-hidden" src={post.image} alt="Istanbul Old City" /></div>
                  <div><span className="text-2xl text-gray-600 font-semibold px-2 py-4 ">{post.title}</span></div>
                  <div><p className=" text-xl text-gray-600 font-normal overflow-wrap px-2 py-3">{post.content}</p></div>
                </div>
            
        )
    }
  
}

export default Post