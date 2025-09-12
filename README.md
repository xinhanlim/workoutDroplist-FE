# Problems Encountered - LESSON LEARNT

## 1. Unable to display `Exercises` that the user created and system created

<details>

```js
const [exercises, setExercises] = useState([]);
const { getJwt } = useJwt();

// so i need to get the exercise from the database that the user create based on their id and the system created.
const getExercise = async () => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const token = getJwt();
    console.log(token);
    const response = await axios.get(apiUrl + "/api/users/exercise/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setExercises(response.data);
    console.log(response);
  } catch (e) {
    console.error(e);
  }
};
useEffect(() => {
  getExercise();
}, []);
```

### Why `useEffect()` for getExercise ?

- Anything that doesn't belong to react will need to use useEffect,
  it only runs once when the page render due to the `useEffect... ,[]]`

### why not setExercise.map?

- useState create a empty array
- when setExercise(response.data), this wil trigger a re-render
- when this re-render, exercise will have the data from setExerise(response.data)
- and thus we can map thru exercise

</details>

## 2.Displaying tabs in ExercisePage for filteration of Muscle Groups

<details>

- Instead of having onClick for each of the tabs `ALL`,`CORE`,`ARMS`,`LEGS`
- we can use one onClick and map thru to render whichever user clicks.
- `useState(['all'])` -> it shows 'all' first when first render as initial value.

```js
    const groups = ["all", "core", "arms", "legs"];
```

- we need to create the tabs here into an array WHY? 
- instead of writing 4 buttons for each. we can later on use .map to map thru the array as a key value and generate the buttons.
```js
{groups.map((g) => (
    <button
      key={g}
      type="button"
      onClick={() => setActivitiesGroup(g)}
      className={
        isActivitiesgroup === g
          ? "font-bold text-[#282828] uppercase"
          : "text-gray-500 hover:text-[#111827] uppercase"
      }>- {g}
    </button>
  ));
}
```
- `isActivitiesG === g ?` if it's true we gave the `className = font-bold... uppercase` if false then `text-gray-500 hover:text-[#111827] uppercase`
- map thru the array of `groups =['all','core','arms','legs']` , initialvalue will be `'all'` since i called it at the top when `useState('all')`
- by default it will show the `ALL` tab first. 
- so `onClick => setActivitiesGroup(g)` we change the value and re-render after it trigger again . 
- so say we click on `CORE` tab, `setAcitivitesGroup(g)` value will change to `setAcitivitesGroup('core')`.
- and then it passed it value to `isActivitiesGroup` and thus `isActivitiesGroup === g   //('g = core')` 
- thus `CORE` tab will be  `className="font-bold text-[#282828] uppercase"` while the rest of `ALL,ARMS,LEGS` will be `"text-gray-500 hover:text-[#111827] uppercase"`



</details>
