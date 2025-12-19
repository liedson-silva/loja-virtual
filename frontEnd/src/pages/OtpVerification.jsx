import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";

const OtpVerification = () => {
  const [data, setData] = useState(['', '', '', '', '', '']);
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const location = useLocation();

  useEffect(() => {
    if (!location?.state?.email) {
      navigate("/forgot-password");
    }
  }, []);


  const valideValue = data.every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.verify_otp,
        data: { otp: data.join(""), email: location?.state?.email }
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);''
        setData(['', '', '', '', '', '']);
        navigate("/reset-password", { state: { data: response.data, email: location?.state?.email } });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="font-semibold">Formulário OTP</p>
        <form className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <div className="flex items-center justify-between gap-2 mt-3">
              {data.map((element, index) => {
                return (
                  <input
                    key={"otp" + index}
                    type="text"
                    id="otp"
                    ref={(ref) => {
                      (inputRef.current[index] = ref);
                      return ref;
                    }}
                    maxLength={1}
                    value={data[index]}
                    onChange={(e) => {
                      const value = e.target.value;
                      const newData = [...data];
                      newData[index] = value;
                      setData(newData);

                      if (value && index < 5) {
                        inputRef.current[index + 1].focus();
                      }
                    }}
                    className="bg-blue-50 p-2 w-full max-w-15 border rounded outline-none focus:border-secondary-100 text-center font-semibold"
                  />
                )
              })}
            </div>
          </div>

          <button
            disabled={!valideValue}
            className={` ${valideValue
              ? "bg-secondary-100 hover:bg-primary-100"
              : "bg-gray-500"
              } text-white py-2 rounded font-semibold my-3 tracking-wide`}
          >
            Verificar
          </button>
        </form>

        <p>
          Já tem uma conta?{" "}
          <Link
            to={"/login"}
            className="font-semibold text-secondary-100 hover:text-primary-100"
          >
            Faça login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default OtpVerification;
