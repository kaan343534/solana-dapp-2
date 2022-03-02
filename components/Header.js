import  Link  from "next/link"
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { signOut, signIn, useSession } from 'next-auth/react';
import { useMainContext  } from "../context/mainContext";
import { languagesObject } from "../assets/languagesObjects";

const Header = () => {
    const router = useRouter()
    const { data: session, status } = useSession()
    const { state, dispatch} = useMainContext()
    const [language, setLanguage] = useState()
    const { menuItem, menuItem2, menuItem3 } = languagesObject[state.language]

    useEffect(() => {
      setLanguage(state.language)
    },[])


    const changeLanguage = () => {
      if (language == 'en') {
        dispatch({type: "change_language", value: 'tr'})
        router.push('/')
        return
      }
      dispatch({type: "change_language", value: 'en'})
      router.push('/')
      
    }

    return (
         <div className="sticky top-0 w-6xl h-30 bg-blue-900">
           <nav className='relative flex items-center flex-wrap p-3 '>
                <Link href='/'>
                  <a className='inline-flex flex-grow items-center p-2 mr-4 '>
                    <svg
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                    className='fill-current text-white h-8 w-8 mr-2'
                    >
                    <path d='M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z' />
                    </svg>
                    <span className='text-xl text-white font-bold uppercase tracking-wide'>
                    EasyPayTokens
                    </span>
                    </a>
                </Link>
                <div className="flex items-center text-xl font-bold space-x-8 mr-12">
                    <Link href="#">
                      <a><span className="text-white hover:font-extrabold">{menuItem}</span></a>
                  </Link>
                  <Link href="/createPost">
                      <a><span className=" text-white">{menuItem2}</span></a>
                  </Link>
                  <Link href="#">
                      <a><span className=" text-white">{menuItem3}</span></a>
                  </Link>
                  {session ? (
                   <button className="border-none rounded-xl bg-blue-600 hover:bg-blue-800 transition ease-in-out duration-100 text-white  border border-transparent px-4 py-2 ml-6" onClick={signOut}>Logout
                  </button> ) : (
                  <button className="border-none rounded-xl bg-blue-600 hover:bg-blue-800 transition ease-in-out duration-100 text-white  p border border-transparent px-4 py-2 ml-6" onClick={signIn}>Login
                  </button> ) }
                  <button className="border-none rounded-xl bg-sky-600 hover:bg-sky-800 transition ease-in-out duration-100 text-white   border border-transparent px-4 py-2 ml-8 capitalize" onClick={changeLanguage}>{language}
                  </button> 
                </div>
           </nav>
         </div>
    )
}

export default Header
