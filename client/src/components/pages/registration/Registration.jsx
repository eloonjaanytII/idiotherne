import { useState } from 'react';
import { useLoginMutation, useRegisterMutation } from '../../services/auth';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';
import SignInForm  from './signInForm/SignInForm';
import SignUpForm from './signUpForm/SignUpForm';
import PictureRegistration from './PictureRegistration';
import ToggleRegistration from './ToggleRegistration';

const Registration = () => {

  const [mode, setMode] = useState('login');
  const [step, setStep] = useState(0);
  const [totem, setTotem] = useState("bird");
  const [gender, setGender] = useState("female")

  const [register, { error: registerError, isLoading: registerLoading }] = useRegisterMutation();
  const [login, { error: loginError, isLoading: loginLoading }] = useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlerSubmit = async (formData) => {

    try {
      let response = null;
      if(mode === 'login') {
        response = await login(formData).unwrap();
      } else {
        response = await register({ ...formData, avatar : totem, gender }).unwrap();
      }
      
      localStorage.setItem('token', response.token)
      localStorage.setItem('userId', response.userId)
      dispatch(setCredentials(response.userId))
      navigate(`/user/${response.userId}`)
    } 
    catch (error) {
      console.log(`some error ${error}`)
    }
  }

  return (
    <div className='flex min-h-screen w-full '>
      <PictureRegistration />
      <div className='md:w-1/2 w-full flex flex-col justify-center items-center'>
        <div className='w-[90%] m-auto'>
          {step !== 1 &&
          <ToggleRegistration {...{mode, setMode}}/>
          } 
          {mode === 'login' 
          ? 
          <SignInForm {...{handlerSubmit, loginError}}/> 
          : 
          <SignUpForm {...{handlerSubmit, registerError, step, setStep, totem, setTotem, gender, setGender}}/>
          }
        </div>
      </div>
    </div>
  )
}

export default Registration;