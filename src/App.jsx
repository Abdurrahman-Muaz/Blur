import { useEffect, useState } from "react";
import { requestSampleRequest } from "./requests/sample-requests";
import Navigation from "./components/Navigation";
import { Link, useLocation } from "react-router";

function App() {
  useEffect(() => {
    requestSampleRequest({ message: "Ping" })
      .then((data) => {
        console.log(data.user_message);
      })
      .catch((error) => {
        console.error(error.status, error.message);
      });
  }, []);

  return (
    <>
      <Navigation />
      <div className="flex w-full h-screen justify-center items-center text-gray-950 bg-gray-200">
        <div className="flex flex-col items-center w-full max-w-[1280px] gap-5">
          <div className="flex flex-col w-full max-w-[900px] p-5 px-3 md:px-8 rounded-lg bg-gray-100 shadow-md drop-shadow-md hover:shadow-lg hover:drop-shadow-lg transition-all duration-300">
            <span className="text-xl font-bold">Blur Teknoloji</span>
            <span className="text-lf font-semibold">
              Tam Zamanlı Full-Stack Pozisyonu
            </span>
            <span className="font-semibold">Kodlama Mülakatı</span>
          </div>

          <div className="flex flex-col w-full max-w-[900px] p-5 px-3 md:px-8 rounded-lg bg-gray-100 shadow-md drop-shadow-md hover:shadow-lg hover:drop-shadow-lg transition-all duration-300">
            <span>Mülakat kodlama mücadelesine hoşgeldiniz!</span>
            <span>
              Proje içerik ve gerekçelerini <code>README.md</code> dosyasında
              bulabilirsiniz.
            </span>
            <span className="font-semibold">Başarılar dileriz!</span>
          </div>
          <div className="flex flex-col w-full max-w-[900px] p-5 px-3 md:px-8 rounded-lg bg-gray-100 shadow-md drop-shadow-md hover:shadow-lg hover:drop-shadow-lg transition-all duration-300">
            <span>
              <Link
                to="/Companys"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 font-semibold"
              >
                Companys
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
