import React, { useEffect } from "react";
import auth from "../../firebase.init";
import {useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import Loading from "../Shared/Loading";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";

const Login = () => {

  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  
  const {register,formState: { errors },handleSubmit} = useForm();
  
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const [token] =useToken(user||gUser); /*token create er por eta use kore navigate korbo (75.3)*/

  let signInError;
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || "/";




  // rendering  error er karone use effect a rakha hoyese ..sob dependency change hoye jabe 
  // useEffect(()=>{
  //   //   je page silo (appointment) oi page a niye jabe
  //   if (user || gUser) {
  //   console.log(user ||gUser);
  //   navigate(from, { replace: true });
  //   }
  //   },[user,gUser,from,location])


  // TODO: token er upor nirvor kore sign in korbo(75.3)

  useEffect( () =>{
    if (token) {
        navigate(from, { replace: true });
    }
}, [token, from, navigate])




  if(error || gError){
      signInError = <p className="text-red-500"><small>{error?.message || gError?.message}</small></p>
  }



  if(loading||gLoading){
   return <Loading></Loading>
  }



  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email,data.password)
    // console.log(data);
  };


  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Login</h2>
         
         
          {/* login or er majhe form hbe */}
          <form onSubmit={handleSubmit(onSubmit)}>

              {/*TODO: from daisy */}
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Enter your mail</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered w-full max-w-xs"
                {...register("email", {
                    required:{
                        value:true,
                        message:"email is required"
                    },
                    pattern: {
                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                      message: 'provide a valid email'
                    }
                  })}
              />
              <label className="label">
                {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}   
                
                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}      
              </label>
            </div>
           
           
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Enter your Password</span>
              </label>
              <input
                type="password"
                placeholder="enter password"
                className="input input-bordered w-full max-w-xs"
                {...register("password", {
                    required:{
                        value:true,
                        message:"password is required"
                    },
                    minLength: {
                        value: 6,
                      message: 'provide a valid password with 6 length '
                    }
                  })}
              />
              <label className="label">
                  {/* error mesage for password */}
                {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}  

                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}      
              </label>
            </div>
           
           
            {/* error message for login */}
            {signInError}

            {/* submit */}
            <input className="btn w-full max-w-xs text-white" type="submit" value="login" />
          </form>
        
        {/* login and or er majhe form hbe(hook theke) */}

          <p><small>New To Doctors Portal <Link className="text-primary" to="/signup">create new account</Link></small></p>      
          <div className="divider">OR</div>
          <button onClick={() => signInWithGoogle()} className="btn btn-info">
            continue with google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
