import React from 'react';

const Hero = () => {
  return (
    <div className='container border-gray-300 rounded-2xl flex flex-col  max-w-4xl mx-auto space-y-4 my-8 bg-indigo-50/50 px-4 py-2'>
       <div><h2 className='text-2xl font-bold  text-indigo-800 text-center items-center'>Find Great Deals on Algorand</h2></div>
       <div><p className='text-xl  text-gray-600 text-left '>
           We offer great content, services or goods offered by creators and providers from across world.</p></div>
         <div><p className='text-xl  text-gray-600 text-left '>You can purchase these offerings through Algorand blockchain technology, which is most secure, efficent and cheap platform.
        </p></div>

    </div>
  )
};

export default Hero;
