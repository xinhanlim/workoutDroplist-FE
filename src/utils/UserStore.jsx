import { atom, useAtom } from 'jotai'
import { jwtDecode } from 'jwt-decode';
const jwtAtom = atom('');

export default function useJwt() {
    const [jwt, setJwtAtom] = useAtom(jwtAtom)

    const setJwt = (newJwt) => {
        localStorage.setItem('jwt', newJwt);
        setJwtAtom(newJwt);
    }

    const getJwt = () => {
        const storedJwt = localStorage.getItem('jwt');
        if (storedJwt && !jwt) {
            setJwtAtom(storedJwt)
        }
        return jwt || storedJwt
    }

    const clearJwt = () => {
        localStorage.removeItem('jwt');
        setJwtAtom(null);
    }

    const decodeJwtDisplayName = () => {
        const token = localStorage.getItem('jwt');
        const decoded = token ? jwtDecode(token) : null;
        const displayName = decoded?.displayName;

        return displayName
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }

    const decodeJwtId = () => {
        const token = localStorage.getItem('jwt');
        const decoded = token ? jwtDecode(token) : null;
        const id = decoded?._id;

        return id
    }

    return { setJwt, getJwt, clearJwt, decodeJwtDisplayName, decodeJwtId };
}