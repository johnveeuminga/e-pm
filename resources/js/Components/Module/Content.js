import { CogIcon, LightBulbIcon } from "@heroicons/react/outline";
import { useState } from "react";
import Button from "../Button";
import Modal from "../Modal";
import MLV from "./MLV";
import Question from "./Question";

export default function Content({ task, questions, config }) {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [modalDetails, setModalDetails] = useState({
    type: 'tip',
    content: '',
  });
  const [tip, setTip] = useState('');
  const [strategy, setStrategy] = useState('');
  const [isGearModalOpened, setIsGearModalOpened] = useState(false);

  function handleBulbClicked({
    type = 'tip',
    content
  }) {
    setModalDetails({
      type,
      content,
    });

    setIsModalOpened(true);
  }

  function RenderContent() {
    if(task.task_type_id == 1)
      return (
        <MLV 
          config={config}
          task={task}/>
      ) 
    else if(task.task_type_id == 2)
        return (
          <div
            className='p-12'>
            <h2 class='text-2xl font-bold capitalize mb-3'>{task.name}</h2>
            <div 
              dangerouslySetInnerHTML={{
                __html: task.description
              }}
              className='mb-3'>
            </div>
            {
              task.media_url &&
                <img 
                  src={task.media_url} 
                  className={'mx-auto max-w-full block'}
                  style={{ width: '500px'}}/>
            }
            { 
              questions.map(question => (
                <div>
                  <div className="py-6 border-t border-gray-200 border-b relative">
                    {
                      question.hint_strategy && question.hint_tips &&
                      <div className="text-right top-2 right-0">
                        <Button 
                          onClick={()=> handleBulbClicked({
                            type: 'tip',
                            content: question.hint_tips,
                          })}
                          className="px-2 bg-yellow-400 rounded">
                          <LightBulbIcon className="w-5"/>
                        </Button>
                        <Button 
                          onClick={()=> handleBulbClicked({
                            type: 'strategy',
                            content: question.hint_strategy,
                          })}
                          className="px-2 ml-2 bg-blue-400 rounded">
                          <CogIcon className="w-5"/>
                        </Button>
                      </div>
                    }
                    <Question 
                      question={question} />
                    {
                      question.max_attempts >= question.attempts.length && 
                      !question.question_options.find(opt => opt.show_correct == 1) && 
                        <p className='mt-3'>{ question.max_attempts - question.attempts.length } Attempts Left</p>
                    }
                  </div>

                </div>
              )) 
             }
          </div>
        )
    else if(task.task_type_id == 3) 
      return (
        <div
          className='p-12'>
          <h2 class='text-2xl font-bold capitalize mb-3'>{task.name}</h2>
          <div 
            dangerouslySetInnerHTML={{
              __html: task.description
            }}
            className='mb-3'>
          </div>
          {
              task.media_url &&
                <img 
                  src={task.media_url} 
                  className={'mx-auto max-w-full block'}
                  style={{ width: '500px'}}/>
            }
        </div>
      )

    return <p>This task type is not supported yet.</p>
  }

  return (
    <div>
      <div className="mb=3">
        <RenderContent />
        <Modal 
          isOpened={isModalOpened}
          onClose={() => setIsModalOpened(false)}
          content={{
            title: modalDetails.type == 'strategy' ? "Strategy" : "Tip", 
            content: modalDetails.content,
          }}
          icon={
            <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10${modalDetails.type == 'strategy' ? ' bg-yellow-400' : ' bg-blue-400'}`}>
              {
                modalDetails.type == 'tip' &&
                  <LightBulbIcon className="h-6 w-6 text-white" aria-hidden="true" />
              }
              {
                modalDetails.type == 'strategy' &&
                  <CogIcon className="h-6 w-6 text-white" aria-hidden="true" />
              }
            </div>
          }/>
      </div>
    </div>
  );
}
