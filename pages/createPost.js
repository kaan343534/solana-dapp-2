// pages/create.tsx

import React, { useState } from 'react'
import Router, { useRouter } from 'next/router'

const CreatePost = () => {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const router = useRouter()

  
  const submitData = async (e) => {
    e.preventDefault();
    try {
      const body = { title, content, imageUrl };
      await fetch('/api/post/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await router.replace(router.asPath);
    } catch (error) {
        console.error(error);
      }
    };

  return (
      <div className='container flex items-center justify-center bg-indigo-100/50 max-w-5xl mx-auto m-8 rounded-2xl'>
        <form onSubmit={submitData} className='flex flex-col items-start px-4 py-3 w-4/5 space-y-4'>
          
          <h1 className='relative text-xl font-semibold text-center'>New Post Draft</h1>
          <div className="relative flex items-center gap-x-4 w-3/4">
           
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            name="Title"
            type="text"
            value={title}
            className = "w-4/5 px-4 py-2 border-2 border-gray-300 outline-none focus:border-gray-400 bg-white"
          />
          
          </div>
           <div className="relative flex items-center gap-x-4 w-3/4">
           
          <textarea
            cols={50}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            name="Content"
            rows={8}
            value={content}
            className = "w-4/5 px-4 py-2 border-2 border-gray-300 outline-none focus:border-gray-400 bg-white"
          />
          </div>
           <div className="relative flex items-center gap-x-4 w-3/4">
           
          <input
            autoFocus
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URI"
            name="Image"
            type="text"
            value={imageUrl}
            className = "w-4/5 px-4 py-2 border-2 border-gray-300 outline-none focus:border-gray-400 bg-white"
          />
          </div>
          <div className='relative flex justify-center items-center space-x-10 ml-25 p-4'>
          <input disabled={!content || !title} type="submit" value="Create" className='rounded-2xl max-h-12 text-center text-normal font-bold px-4 py-3 bg-green-300 text-white hover:bg-green-500 transition ease-in-out duration-150' />
          <a className=" rounded-2xl max-h-12 text-center text-normai font-bold px-4 py-3 bg-red-400 text-white hover:bg-red-600 transition ease-in-out duration-150" href="#" onClick={() => Router.push('/')}>
            Cancel
          </a>
          </div>
        </form>
      </div>
  )
  }

export default CreatePost;