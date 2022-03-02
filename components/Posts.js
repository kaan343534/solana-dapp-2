import Link from "next/link"
import Post from "./Post"

const Posts = ({ feeds }) => {

    if (!feeds) {
        return (<div className="flex items-center p-4"><span className="text-xl">No Post available!</span></div>)
    }

    if ((feeds) && (feeds != "undefined")) {
        return (
            <div className="flex flex-col space-y-4 border-t-1 border-gray-200 mt-12 bg-purple-200/50 mx-4 my-2 rounded-2xl py-1 px-4 ">
            <div><span className="text-3xl text-blue-900 font-semibold py-2">Great Offers</span></div>
              <div className="flex flex-col md:flex-row   mx-auto p-4 justify-start  my-8">
                 { feeds.map((post) => (
                    <div key={post.id} className="border-1 max-w-xl rounded-lg bg-slate-100/50 px-4 py-2">
                        <Link href={"/p/" + post.id}>
                          <a><Post post={post} /></a>
                       </Link>
                     </div>
                  ))}
              </div>
           </div>
        )
    }
  
}

export default Posts