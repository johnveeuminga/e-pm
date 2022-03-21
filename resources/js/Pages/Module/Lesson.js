import Modal from "@/Components/Modal";
import Authenticated from "@/Layouts/Authenticated";
import { ExclamationIcon, CheckIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { Inertia } from "@inertiajs/inertia";
import { Head, Link, usePage } from "@inertiajs/inertia-react";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Content from "../../Components/Module/Content";

export default function Lesson({ auth, lesson, config, task, questions, flash, not_allowed, selected_task_id, message }) {
  const page = usePage(); 

  console.log(page);
  function handleTaskClick(task) {
    Inertia.get(
      route('module.lesson.task.single',
      [lesson.module_id, lesson.id, task.id]
    ));
  }

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if(flash && flash.message)
      setOpenModal(true);
  }, [flash]);

  useEffect(() => {
    let interval;
    if(task && !not_allowed)  {
      interval = setInterval(() => {
        axios.post(route('logs.store'), {
          user: auth.user.id,
          url: page.url,
        });
      }, 10000)
    }

    return () => {
      clearTimeout(interval);
    }
  }, []);

  function handleClose(val) {
    setOpenModal(false);
  }

  return (
    <Authenticated
      auth={auth}>
      <Head title={lesson.name} />
      <div className="flex">
        <div className="flex-initial w-3/4">
          {
            <div className="py-3 px-4">
              <Link href={route('module.single', [lesson.module_id])}>
                <span className="text-sm inline-flex items-center">
                  <ChevronLeftIcon className="w-4 inline-block mr-1" />
                  Back to Module
                </span>
              </Link>
              
            </div>
          }
          {
            not_allowed &&
              <div className="flex flex-col align-center h-96 justify-center items-center text-center">
                <img 
                  src="/images/not-allowed.png"
                  className="w-56 mb-4 mt-8"/>
                <p>Sorry! You are not allowed to view this task.</p>
                <p>{ message }</p>
              </div>
          }
          { task &&  !not_allowed &&
              <Content 
                config={config}
                task={task}
                questions={questions}/>   
          } 
          { !task && !not_allowed && 
            <div className="py-8">
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                  <div className="border-gray-200">
                    <p className='mb-4 text-2xl text-bold'>
                      {/* <link href={route('module.lesson.single', [lesson.module_id, lesson.id ])}>{ lesson.name }</link>  */}
                      { lesson.name }
                    </p> 
                    <div dangerouslySetInnerHTML={{ __html: lesson.description }}></div>
                  </div>
                </div>
            </div> 
          }
        </div>
        <div className="flex-initial w-1/4 min-h-screen overflow-scroll bg-white">
          <div className="p-6 border-b border-solid border-gray-300 uppercase font-bold">
            <Link href={route('module.lesson.single', [lesson.module_id, lesson.id ])}>{ lesson.name }</Link> 
          </div>
          {
            lesson.tasks.map(lessonTask => (
              <div 
                onClick={() => handleTaskClick(lessonTask)}
                className={`p-6 px-8 border-b border-solid border-gray-200 cursor-pointer transition ease-in-out hover:bg-gray-100 duration-300${ selected_task_id == lessonTask.id ? ' bg-gray-100' : '' }`}>
                  <div className="flex align-center">
                    <div className="mr-6">
                      <span className="font-bold">&lt;</span>
                    </div>
                    <div className='capitalize'>{ lessonTask.name }</div>
                  </div>
              </div>
            ))
          }
          {
              <Modal 
                isOpened={openModal}
                onClose={(val) => handleClose(val)}
                content={{
                  title: flash.message && flash.message.correct ? "Congratulations!" : "Sorry",
                  content: flash.message && !flash.message.correct ? "Understand what is being asked in the problem. Check the bulb and gear icons to guide you through solving the problem." : "Your answer is correct!"
                }}
                icon = {flash.message && !flash.message.correct ?  
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div> : 
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <CheckIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                }
                />
          }
        </div>
      </div>
    </Authenticated>  
  )
}