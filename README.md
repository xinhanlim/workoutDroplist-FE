## Unable to display `Exercises` that the user created and system created 

```js 
 const [exercises,setExercises] = useState([])
    const { getJwt }  = useJwt();


    // so i need to get the exercise from the database that the user create based on their id and the system created.
    const getExercise = async () => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const token = getJwt();
            console.log(token);
            const response = await axios.get(apiUrl + '/api/users/exercise/',
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setExercises(response.data);
            console.log(response);
        } catch (e) {
            console.error(e);
        }

    }
    useEffect(()=>{
        getExercise()
    },[])
```

the reason for token is to get the JWT to access the user data so i can fetch the backend ,
next using a useState

