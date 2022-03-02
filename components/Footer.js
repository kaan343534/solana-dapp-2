import Image from "next/image"

const Footer = () => {
    return (
        <div>
           <footer className="border-t border-gray-200 bg-blue-800/80 h-30">
            <div className="container flex flex-wrap items-center justify-center px-12 py-8 mx-auto  lg:justify-between">
                <div className="flex flex-wrap justify-center">
                  <ul className="flex  flex-grow items-center space-x-4 text-white mr-15">
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                    <li>Terms</li>
                  </ul>
                </div> 
                <div className="flex flex-col items-center justify-center p-2 mr-20">
                  <div><span className="text-white font-semibold text-base">Powered by</span></div>
                  <div className="p-4">
                      <Image src="/algorand_logo.png" alt="Algorand Inc" width={120} height={30} objectFit="cover" />
                  </div>
                </div>
             </div>
         </footer>
        </div>
    )
}

export default Footer
