import React from 'react';
import auth from "../../firebase.init";
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import Loading from "../Shared/Loading";
import { Link, useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";



const SignUp = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const {register,formState: { errors },handleSubmit} = useForm();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);

      const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    
      const navigate = useNavigate();
    
      const [token] = useToken(user || gUser);/*use from hook ( 75.2)*/

      let signInError;
  

    if(error || gError || updateError){
        signInError = <p className="text-red-500"><small>{error?.message || gError?.message || updateError.message}</small></p>
    }

  
    if(loading||gLoading ||updating){
     return <Loading></Loading>
    }
  
    /*TODO: jokhon token pabe tokhon navigate korbe  (75.2)*/
    if (token) {
      navigate('/appointment');
  }  

    /*after get token then ignored it (75.2)*/ 
    // if (user || gUser) {
    //   console.log(user ||gUser)
    //   // navigate("/appointment");
    // }
    
    
    const onSubmit = async (data) => {
        await createUserWithEmailAndPassword(data.email,data.password)
        await updateProfile({ displayName:data.name});
        // console.log("update user",data);
        // navigate("/appointment") {ignore this 75.2}
      }


      
    return (
        <div className="flex justify-center items-center h-screen my-28">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="text-center text-2xl font-bold">Sign Up</h2>

            {/* login or er majhe form hbe */}
            <form onSubmit={handleSubmit(onSubmit)}>
  
                {/*TODO: from daisy */}
                {/* name field */}
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Enter your name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  className="input input-bordered w-full max-w-xs"
                  {...register("name", {
                      required:{
                          value:true,
                          message:"name is required"
                      }
                    })}
                />
                <label className="label">
                  {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}  
                </label>
              </div>

              {/* email field */}
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
              <input className="btn w-full max-w-xs text-white" type="submit" value="Sign Up" />
            </form>
          
          {/* login and or er majhe form hbe(hook theke) */}
  
            <p><small>Already have account <Link className="text-primary" to="/login">Please Login</Link></small></p>      
            <div className="divider">OR</div>
            <button onClick={() => signInWithGoogle()} className="btn btn-info">
              continue with google
            </button>
          </div>
        </div>
      </div>
    );
};

export default SignUp;