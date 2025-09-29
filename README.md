# Workout Droplist — Frontend

- Front-end workout list for personal workout tracking.
- Back-end: https://github.com/xinhanlim/workoutDroplist-BE
- Live Demo: https://workout-droplist-fe.vercel.app

## Features:

- Full **CRUD functionality** for workouts and exercises
- **Exercise filtering** by muscle group
- **Workout search bar** for quick access
- **Responsive UI** optimized for mobile web view
- **Backend RESTful API** built with Express & MongoDB
- **User authentication** with JWT-based login
- **User-specific tagging** — workouts and exercises created by a user are securely linked to their account via JWT

## Tech Stack:

**Frontend:** React, Wouter, Tailwind CSS, Headless UI, Jotai, Axios, Formik, Yup, React-Toastify, jwt-decode  
**Backend:** Node.js, Express, MongoDB, JWT, bcrypt, CORS  
**Dev & Build:** Vite, Nodemon
<br>
**Hosting:** Vercel (frontend), Render (backend)

## Getting Started

### Clone the repo

```bash
# HTTPS
git clone https://github.com/xinhanlim/workoutDroplist-FE.git
cd workoutDroplist-FE
```

```bash
# SSH
git clone git@github.com:xinhanlim/workoutDroplist-FE.git
cd workoutDroplist-FE
```

### Install Dependencies

```bash
npm install
```

### Environment Variables

Vite exposes only variables starting with `VITE_`.

- **Local (Codespaces)** — create a `.env` file in the frontend root:

```env
VITE_API_URL=https://<your-codespaces-backend>.github.dev
# Codespaces generates a new URL each session — replace the placeholder with your current backend URL.
```

- Production (Vercel + Render) – in Vercel → Project → Settings → Environment Variables:

```.env
Key : VITE_API_URL
Value: https://workoutdroplist-be.onrender.com
```

## Run Command

```bash
npm run dev
```

# Screenshot

- Live Demo: https://workout-droplist-fe.vercel.app

![Live Demo](public/Project1Photo.jpg)

# Contact

- Portfolio Website: [portfolio-sooty-delta-wdgwgb0mnz.vercel.app](https://portfolio-sooty-delta-wdgwgb0mnz.vercel.app/project/1)
- LinkedIn: [linkedin.com/in/xinhanlim](https://www.linkedin.com/in/xinhanlim/)
- Email: [xhxhan00@gmail.com](mailto:xhxhan00@gmail.com)

# Lesson Learned - WORKOUT

## 1. Sorting Positioning of array

<details><summary>Expand</summary>

```js
setWorkout(
  response.data.sort((a, b) => {
    const createdSystem = String(a.createdBy).toLowerCase() === "system";
    const notSystem = String(b.createdBy).toLowerCase() === "system";
    if (createdSystem && !notSystem) return -1;
    if (!createdSystem && notSystem) return 1;
  })
);
```

- `.sort` : For each workout `a` and `b`, check if its `createdBy` === `"system"`.<br>
  `-1` → put `a` before `b`<br>
  if `a` is `system` but `b` is not → **put** `a` **before** `b`.<br>
  `1` → put `b` before `a`<br>
  If `a` is **not** `system` but `b` is → put `b` **before** `a`.<br>
  `0` → keep them in the `same order`<br>
  If `both are system` or `both are not` → keep the `same order`.<br>

</details>

## 2. Usage of `useMemo` from 'react'

<details><summary>Expand</summary>

`useMemo` calls a function when dependencies change, and memoizes (remembers) the result of the function between renders.

- Cons: `useMemo `takes up more memory in order to free up CPU time. If your app is hammering the CPU with a lot of calculations, that's when you might consider taking up some memory and use useMemo instead.

- When to use ?
  You're noticing a component's render is frustratingly slow, and you're passing a calculation to an unknowable number of children
  Your app often becomes unresponsive because you're fetching a large amount of data, and having to transform it into a usable format
  The key is to focus on the problem.

</details>

## 3. Understanding Filtering

<details><summary>Expand</summary>

```js
const q = query.trim().toLowerCase();
const hasText = (t) => (t || "").toLowerCase().includes(q);

const filterWorkout = workout.filter((w) => {
      const nameMatch = hasText(w.name);
      const notesMatch = hasText(w.notes);
      const setsMatch =
        Array.isArray(w.sets) && w.sets.some((s) => hasText(s.name));
      return nameMatch || notesMatch || setsMatch;
    });
```

- `const q` is to search text lowercase "eg. squats"
- `const hastext = (t)...` is to return true / false is q is found inside (t)
- `const nameMatch = hasText(w.name);` is to find say "Legs Day, the user type leg, it will show up result with legs equivalent
- `w.sets.some` basically is to go thru each item in sets and check if it's exercise name is matches the search. so say if q = squ , and the exercise has squats,
  it will become true which lead to the final part .
- returning `namematch` `OR` `notesMatch` `OR` `setsMatch`

</details>

# Lesson Learned - EXERCISE

## 1. Unable to display `Exercises` that the user created and system created

<details><summary>Expand</summary>

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

<details><summary>Expand</summary>

```js
const [isActivitiesGroup, setActivitiesGroup] = useState("all");
const groups = ["all", "core", "arms", "legs"];
```

- Instead of having onClick function for each of the tabs `ALL`,`CORE`,`ARMS`,`LEGS`
- we use state variable `isActivtiesGroup` to map through an array of `groups` to generate the buttons dynamically.
- `useState(['all'])` -> it shows 'all' first when first render as initial value.

```js
{
  groups.map((g) => (
    <button
      key={g}
      type="button"
      onClick={() => setActivitiesGroup(g)}
      className={
        isActivitiesgroup === g
          ? "font-bold text-[#282828] uppercase"
          : "text-gray-500 hover:text-[#111827] uppercase"
      }
    >
      - {g}
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
- thus `CORE` tab will be `className="font-bold text-[#282828] uppercase"` while the rest of `ALL,ARMS,LEGS` will be `"text-gray-500 hover:text-[#111827] uppercase"`

How the 4 buttons show up ?

```js
const groups = ["all", "core", "arms", "legs"];
{groups.map((g) => (<button>...) -{g} </button>;}
```

- the array holds 4 tabs in groups.
- the map function take each item as a variable `(g)` and create each button for it
- first item : `g ='all'` and create a button for it -> `<button> -'all'<button>`, and so fore till `LEGS` button.

</details>
