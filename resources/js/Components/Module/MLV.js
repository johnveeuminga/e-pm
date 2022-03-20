import ReactPlayer from "react-player";

export default function MLV({ config, task }) {
  return (
    <div>
      <ReactPlayer
        width={'100%'}
        height={'480px'}
        url={task.media_url} 
        controls={true}/>
        <div className="p-6">
          <h3 className="font-bold mb-3 text-2xl capitalize mb-3">{task.name}</h3>
          <div dangerouslySetInnerHTML={{
            __html: task.description,
          }}></div>
      </div>
    </div>
  )
}