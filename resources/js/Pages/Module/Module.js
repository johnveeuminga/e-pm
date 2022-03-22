import Button from "@/Components/Button";
import LessonCard from "@/Components/Dashboard/LessonCard";
import Authenticated from "@/Layouts/Authenticated";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link } from "@inertiajs/inertia-react";
import ReactPlayer from "react-player";

export default function Module({ module, lessons, auth }) {
  function goToSynthesis() {
    Inertia.visit(route('module.synthesis', [module.id]))
  };

  return (
    <Authenticated
      auth={auth}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          {module.name}
        </h2>
        }>
      <Head title={module.name} />
      <div className='py-12'>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-3">
          <h1 className="font-bold text-2xl mb-3">{ module.name }</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: module.description
            }} className='mb-9'></div>
        </div>
        <div className='bg-gray-300 w-100'>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-3">
            <ReactPlayer 
              url={module.introduction_url}
              width={'100%'}
              controls={true}
              height={'480px'}/>
        </div>
        </div>
      </div>
      <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
        <h2 className="text-xl font-semibold mb-3">Lessons</h2>
        {
          lessons && lessons.map(lesson => (
            <LessonCard lesson={lesson} />
          ) )
        }
        {
          <div className="flex bg-white rounded-md overflow-hidden drop-shadow-md mb-4 items-stretch">
              <div className='flex-initial w-1/4 rounded-l-md bg-gray-300 a'>
                {/* <div className="h-full w-full flex justify-center items-center">
                  <CheckCircleIcon className="w-20 h-20 text-green-600"/>
                </div> */}
                <img 
                  src={module.synthesis_cover_photo_url}
                  className='w-full object-cover h-full' />
              </div>
              <div className="flex-initial w-3/4 px-6 py-6">
                <h2 className='text-2xl font-bold capitalize mb-3'>Synthesis</h2> 
                {/* <p className="mb-3">Here's a summary of all the concepts tackled on the lessone above.</p> */}
                <div className='mb-3' dangerouslySetInnerHTML={{ __html: module.synthesis_short_text  }}></div>
                <Button 
                  onClick={(event) => goToSynthesis(event)}
                  type='button'>
                    Go To Synthesis
                </Button>
              </div>
            </div>
        }
      </div>
    </Authenticated>
  )
}