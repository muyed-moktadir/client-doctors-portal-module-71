/*75.2  user er information vetore use korbo e jonno ekhane ekta dependency thakbe*/

import { useEffect, useState } from "react"

const useToken = user =>{
    const [token, setToken] = useState('');
    useEffect(()=>{
        /*user create er somoy mail ta niye backed a pathabo (75.2)*/
        const email =user?.user?.email;
        const currentUser = {email:email};
        if(email){
            fetch(`http://localhost:5000/user/${email}`,{
                method:'PUT',
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(currentUser)
            })
            .then(res=>res.json())
            .then(data=>{
                console.log("data inside useToken",data);
                /*token paowar por localstorage a save korbo (75.3)*/ 
                const accessToken = data.token;
                localStorage.setItem('accessToken', accessToken);
                setToken(accessToken);
            })
        }
        console.log(" inside use token",user);
    },[user]);

    return [token];
}

export default useToken;