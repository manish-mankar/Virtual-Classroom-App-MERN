import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { Link } from "react-router-dom";
import './login.css';

const USER_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [validLastName, setValidLastName] = useState(false);

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setValidFirstName(firstName.trim().length > 0);
    }, [firstName]);

    useEffect(() => {
        setValidLastName(lastName.trim().length > 0);
    }, [lastName]);

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [firstName, lastName, user, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);

        if (!v1 || !v2 || !validFirstName || !validLastName) {
            setErrMsg("Invalid Entry");
            return;
        }

        try {

            const response = await axios.post(`${process.env.REACT_APP_PATH_URL}/register`, {
                firstName: firstName,
                lastName: lastName,
                username: user,
                password: pwd
            });
            console.log(JSON.stringify(response));

            setSuccess(true);
            setFirstName('');
            setLastName('');
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed');
            }
            errRef.current.focus();
        }
    };

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                    <Link to={"/login"}>Sign In</Link>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="firstName">
                            First Name:
                            <FontAwesomeIcon icon={faCheck} className={validFirstName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validFirstName || !firstName ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            required
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        
                        <label htmlFor="lastName">
                            Last Name:
                            <FontAwesomeIcon icon={faCheck} className={validLastName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validLastName || !lastName ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            required
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />

                        <label htmlFor="username">
                            Email:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="email"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                            style={{ width: "100%" }}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                        </p>

                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                        </p>

                        <button disabled={!validFirstName || !validLastName || !validName || !validPwd || !validMatch}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        
                        <Link to="/login" className="btn2 btn-secondary">
                            Login
                        </Link>
                            {/* <a href="#">Sign In</a> */}
                        
                    </p>
                </section>
            )}
        </>
    );
}

export default Register;
