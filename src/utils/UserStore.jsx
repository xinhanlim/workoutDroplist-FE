import { atom, useAtom } from 'jotai'
import { jwtDecode } from 'jwt-decode';
const jwtAtom = atom('');

function isTokenExpired() {
    const token = localStorage.getItem('jwt');
    const decoded = token ? jwtDecode(token) : null;
    if (!decoded || !decoded.exp) return false;          // treat no exp as "not expired"
    const now = Math.floor(Date.now() / 1000);   // seconds
    return decoded.exp <= now;
}

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

    const isExpired = () => isTokenExpired(getJwt());
    const ensureFresh = () => {
        if (isExpired()) clearJwt();
    };


    return { setJwt, getJwt, clearJwt, decodeJwtDisplayName, decodeJwtId, isExpired, ensureFresh };
}