import Login from './Auth/Login';
import Register from './Auth/Register';

const Account = () => {

    return (
        <section className="account py-80">
            <div className="container container-lg">
                <div className="row gy-4">

                    {/* LOGIN FORM */}
                    <Login />

                    {/* REGISTER FORM */}
                    <Register />

                </div>
            </div>
        </section>
    );
};

export default Account