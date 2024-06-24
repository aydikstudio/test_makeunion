
import { BrowserRouter, Routes, Route, useParams, Link, useLocation } from 'react-router-dom';

function User() {
    // let { id } = useParams();
    let { state } = useLocation();
    let user = state.user

    // useEffect(() => {
    //     getData();
    // }, [])



    // const getData = async () => {
    //     await axios({
    //         method: 'get',
    //         url: process.env.REACT_APP_LINK + "/" + id
    //     })
    //         .then(function (response) {
    //             setUser(response.data)
    //         });
    // }


    return (
        <>
            {user && (
                <div style={{ textAlign: 'center' }}>
                    <div><Link to="/">Домой</Link></div>
                    <img src={user.avatar} width={50} />
                    <div style={{ marginTop: 5 }}>name: {user.name}</div>
                    <div style={{ marginTop: 5 }}>phone: {user.phone}</div>
                    <div style={{ marginTop: 5 }}>email: {user.email}</div>
                    <div style={{ marginTop: 5 }}>description: {user.description}</div>
                </div>
            )}
        </>
    );
}

export default User;
