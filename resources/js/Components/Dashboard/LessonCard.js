import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import Button from "../Button";

export default function LessonCard({ lesson }) {
  function goToLesson(event) {
    event.preventDefault();
    Inertia.get(route('module.lesson.single', [lesson.module_id, lesson.id]));
  }

  return (
    <div className="flex bg-white rounded-md overflow-hidden drop-shadow-md mb-4">
      <div className='flex-initial w-1/4 rounded-l-md'>
        <img 
          src={lesson.media_url}
          className='w-full object-cover' />
      </div>
      <div className="flex-initial w-3/4 px-6 py-6">
        <h2 className='text-2xl font-bold capitalize mb-3'>{ lesson.name }</h2> 
        <div dangerouslySetInnerHTML={{
          __html: lesson.description, 
        }}></div>
        <Button 
          onClick={(event) => goToLesson(event)}
          type='button'>
            Go To Lesson
        </Button>
      </div>
    </div>
  )
}