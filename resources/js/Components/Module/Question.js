import { Inertia } from '@inertiajs/inertia';
import { useState } from 'react';
import Input from '../../Components/Input'
import Button from '../Button';


export default function Question({ 
  question,
}) {
  const [value, setValue] = useState(null);

  function handleChange(value) {
    setValue(value);
  }

  function submitQuestion() {
    Inertia.post(route('question.attempt', question.id), {
      question_id: question.id,
      answer: value,
    }, {
      preserveScroll: true,
    });
  }

  const onHandleChange = (event) => {
    setValue( event.target.type === 'checkbox' ? event.target.checked : event.target.value);
  };

  function isShowCorrectOrMaxAttempt() {
    return question.max_attempts >= question.attempts.length && 
    !question.question_options.find(opt => opt.show_correct == 1);
  }
  
  return (
    <div>
      {
        question.question_type_id == 1 &&
        <div className="question-input mb-3">
          <div dangerouslySetInnerHTML={{
            __html: question.question,
          }}></div>
          <label className='mr-3'>Answer:</label>
          <Input
            type='text' 
            name={`input-${question.id}`}
            value={isShowCorrectOrMaxAttempt() ? value : question.question_options.find(opt => opt.show_correct == 1).name}
            disabled={isShowCorrectOrMaxAttempt() ? false : true}
            className={`${isShowCorrectOrMaxAttempt() ? '' : 'opacity-30'}`}
            handleChange={onHandleChange}
            prefix={question.input_prefix}/>
        </div> 
      }
      {
        question.question_type_id == 2 &&
          <div className='mb-3'>
            <div dangerouslySetInnerHTML={{ __html: question.question }}></div>
            {
              question.question_options.map(option => ( 
                  <div className="flex align-center">
                    <Input 
                      id={`input-${question.id}-${option.id}`}
                      name={`input-${question.id}`}
                      // type='radio'
                      value={option.id} 
                      type={
                        isShowCorrectOrMaxAttempt() ?
                          'radio' : 'hidden'
                      }
                      checked={value == option.id}
                      className={
                        isShowCorrectOrMaxAttempt() ?
                          '' : 'invisible' 
                      }
                      handleChange={(e) => handleChange(e.target.value)}
                      containerClassName={`inline-block items-center mr-3 justify-center align-center ${
                        isShowCorrectOrMaxAttempt() ?'' : ''}`}/>
                    <label 
                      htmlFor={`input-${question.id}-${option.id}`} 
                      className={`inline-block text-gray-800${option.show_correct ? ' text-green-400 font-bold' : ''}`}>
                        { option.name }
                    </label>
                  </div>
              ) )
            }
          </div>
      }
      {
        (question.max_attempts >= question.attempts.length && !question.question_options.find(opt => opt.show_correct == 1)) &&
          <Button type={'button'}
            onClick={() => submitQuestion() }>
              Submit
          </Button> 
      }
      {
        !isShowCorrectOrMaxAttempt() && question.explanation &&
          <div className='p-6 border border-gray-400'>
            <p className='font-bold text-blue-400 mb-3'>Explanation: </p>
            <div dangerouslySetInnerHTML={{ __html: question.explanation }}></div>
          </div>
      }
    </div>
  )
}