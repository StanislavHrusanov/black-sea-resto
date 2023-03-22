export const isValidFullName = (e, setError) => {
    const pattern = /^([A-Z]{1}[a-z]*[ |-]{0,1})+[A-Z]{1}[a-z]*$/g;

    setError(state => ({
        ...state,
        [e.target.name]: !pattern.test(e.target.value)
    }));
}

export const minLengthRegister = (e, setError, length) => {
    setError(state => ({
        ...state,
        [e.target.name]: e.target.value.length < length || e.target.value.includes(' ')
    }));
}

export const isPaswordsMatch = (e, password, setError) => {
    setError(state => ({
        ...state,
        [e.target.name]: e.target.value !== password
    }));
}

export const minLength = (e, setError, length) => {
    setError(state => ({
        ...state,
        [e.target.name]: e.target.value.length < length
    }));
}