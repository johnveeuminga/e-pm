import Modal from "@/Components/Modal";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link, usePage } from "@inertiajs/inertia-react";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function Synthesis({ 
  auth, 
  module,
  not_allowed
 }) {
  return (
    <Authenticated
      auth={auth}>
      <Head title={module.name} />
      <div className='py-12 '>
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
          <h1 className="text-2xl font-bold">{module.name} - Synthesis</h1>  
          {
            not_allowed &&
            <div className="flex flex-col align-center h-96 justify-center items-center text-center">
              <img 
                src="/images/not-allowed.png"
                className="w-56 mb-4 mt-8"/>
              <p>Sorry! You haven't finished all the lessons yet.</p>
            </div>

          }
          {
            !not_allowed &&
              <div className='bg-black mt-6'>
                <ReactPlayer 
                  url={module.synthesis_media_url}
                  width={'100%'}
                  controls={true}
                  height={'480px'}/>
              </div>
          }
        </div>
      </div>
    </Authenticated>  
  )
}