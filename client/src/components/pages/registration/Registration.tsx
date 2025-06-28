import { useState } from 'react';
import { useLoginMutation, useRegisterMutation } from '../../services/auth';
import { setCredentials } from '../../store/features/authSlice';
import { useNavigate } from 'react-router-dom';
import SignInForm  from './signInForm/SignInForm';
import SignUpForm from './signUpForm/SignUpForm';
import PictureRegistration from './PictureRegistration';
import ToggleRegistration from './ToggleRegistration';
import { useAppDispatch } from '../../store/hooks';
import { ErrorResponse } from '../../services/types/common';
import { parseErrorMessage } from '../../utils/parseErrorMessage';

type LoginFormData = {
  username: string;
  password: string;
};

type RegisterFormData = {
  username: string;
  email: string;
  password: string;
};

type dataForm = LoginFormData | RegisterFormData;

const Registration: React.FC = () => {

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [step, setStep] = useState<number>(0);
  const [totem, setTotem] = useState<string>("bird");
  const [gender, setGender] = useState<'female' | 'male'>('female')

  document.documentElement.setAttribute("data-theme", "my_abyss");

  const [register, { error: registerError, isLoading: registerLoading }] = useRegisterMutation();
  const [login, { error: loginError, isLoading: loginLoading }] = useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handlerSubmit = async (formData: dataForm) => {

    try {
      let response = null;
      if(mode === 'login') {
        const loginData = formData as LoginFormData;
        response = await login(loginData).unwrap();
      } else {
        const registerData = formData as RegisterFormData;
        response = await register({ ...registerData, avatar : totem, gender, status : ''}).unwrap();
      }
      
      localStorage.setItem('token', response.token)
      localStorage.setItem('userId', response.userId.toString())
      dispatch(setCredentials(response.userId))
      navigate(`/user/${response.userId}`)
    } 
    catch (error) {
      console.log(`some error ${error}`)
    }
  }

  if (registerLoading || loginLoading) return <div>is Loading...</div>

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
          <SignInForm handlerSubmit = {handlerSubmit} 
                      loginError={parseErrorMessage(loginError)}/> 
          : 
          <SignUpForm {...{handlerSubmit,step, setStep, totem, setTotem, gender, setGender}} 
                           registerError={parseErrorMessage(registerError)}/>
          }
        </div>
      </div>
    </div>
  )
}

export default Registration;