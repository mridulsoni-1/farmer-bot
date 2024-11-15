// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


const Signin = () => {
    const otpflag = "Verify your email address by entering the OTP sent to your email"
    const [values, setValues] = useState({
        Email:"",
        Password:"",
    });
    const navigate = useNavigate()
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try{
          const response = await axios.post("http://localhost:7000/signin", {
            ...values,
          }
          );
          //console.log(response);
          localStorage.setItem("accessToken",response.data.accessToken)
          localStorage.setItem("userId",response.data._id)
          localStorage.setItem("email",response.data.email)
          localStorage.setItem("userType",response.data.userType)
          toast.success("Login successful! Redirecting to Dashboard")
          navigate("/");

        }catch (error){
            console.log(error);
            toast.error(error.response.data.message)
            if(error.response.data.message == otpflag){
                const id = error.response.data.userId;
                navigate("/verification", {state: {key : id}});
            }
            //console.log(error);
        }
    }
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="src/assets/icon.png" alt="logo"/>
          Flames@2024   
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form onSubmit={(e)=>handleSubmit(e)} className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="Email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" onChange={(e)=>setValues({...values, [e.target.name]:e.target.value})}/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="Password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={(e)=>setValues({...values, [e.target.name]:e.target.value})}/>
                  </div>
                  <div className="text-end">
                      <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Dont have an account yet? <a href="/Farmersignup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                  </p>
                  <Toaster/>
              </form>
          </div>
      </div>
      
  </div>
  
</section>
  )
}

export default Signin