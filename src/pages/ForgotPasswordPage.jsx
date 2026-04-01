import ForgotPassword from '../components/Auth/ForgotPassword';

const ForgotPasswordPage = () => {
  return (
    <section className="account py-80">
      <div className="container container-lg">
        <div className="row gy-4 justify-content-center">
          <ForgotPassword />
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
