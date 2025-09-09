# Problems Encountered - LESSON LEARNT

## 1. Unable to display `Exercises` that the user created and system created 
<details>

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

### Why `useEffect()` for getExercise ?
- Anything that contain things doesn't belong to react will need to use useEffect,
it only runs when the page render.

### 

</details>

