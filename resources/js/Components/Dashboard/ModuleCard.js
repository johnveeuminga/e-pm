import { Link } from '@inertiajs/inertia-react';

export default function ModuleCard({ module }) {
  return (
    <Link 
      href={route('module.single', [module.id])}
      className='display-block'>
      <div className="bg-white overflow-hidden shadow-sm rounded-sm cursor-pointer">
        <div className='w-full mb-2'>
          <img 
            className='module__img w-full'
            src={module.media_url} />
        </div>
        <div className='p-3'>
          <h2>{ module.name }</h2>
          <p>{module.description}</p>
        </div>
      </div>
    </Link>
  );
}