import Login from './Auth/Login';
import Register from './Auth/Register';
import ForgotPassword from './Auth/ForgotPassword';

const Account = ({ specialTab = null }) => {

    return (
        <section className="account py-80">
            <div className="container container-lg">
                <div className="row gy-4">

                    {/* FORGOT PASSWORD FORM */}
                    {specialTab === 'forgotPassword' ? (
                        <ForgotPassword />
                    ) : (
                        <>
                            {/* LOGIN FORM */}
                            <Login />

                            {/* REGISTER FORM */}
                            <Register />
                        </>
                    )}

                </div>
            </div>
        </section>
    );
};

export default Account
