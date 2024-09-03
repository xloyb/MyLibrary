import Link from 'next/link'
import React from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";

const NotFoundBitch = () => {
  return (
    <>
    <section className="bg-base-200">
  <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
    <div>
      <p className="text-sm font-medium text-primary">404 error</p>
      <h1 className="mt-3 text-2xl font-semibold  md:text-3xl">
        Uh oh, it’s a ghost town in here!
      </h1>
      <p className="mt-4 ">
        Sorry, the page you are looking for doesn’t exist or has been moved.
      </p>

      <div className="flex items-center mt-6 gap-x-3">
      <Link href={'/c/'}>
        <button className="btn btn-outline w-1/2 gap-x-2 sm:w-auto">
        <IoMdArrowRoundBack />


          <span>Go back</span>
        </button>
        </Link>
        <Link href={'/'}>
        <button className="btn btn-primary w-1/2 sm:w-auto">
          Take me home
        </button>
        </Link>

      </div>
    </div>
  </div>
</section>

    </>
  )
}

export default NotFoundBitch