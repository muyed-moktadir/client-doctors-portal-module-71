import { useEffect, useState } from "react"

const useAdmin= user =>{
    /*backend theke boolean value ashbe e jonno true or false*/ 
    const [admin,setAdmin]= useState(false)
    const [adminLoading,setAdminLoading]=useState(true)

    useEffect(()=>{
        /*new user na jeta state a set hoye ase tar email*/ 
        const email = user?.email;
        console.log(email);
        if(email){
            fetch(`http://localhost:5000/admin/${email}`,{
                method:'GET',
                headers:{
                    'content-type':'application/json',
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                },
            })
            .then(res=>res.json())
            .then(data=>{
                console.log("data inside useToken",data);
                
                setAdmin(data.admin);
                setAdminLoading(false)
            })
        }
    },[user])
    return [admin,adminLoading]
} 

export default useAdmin;

//eta use korbo dashboard er all users link a 75.8