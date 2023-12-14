import React from "react";
import "./animation.css";
function Home() {
  return (
    <div>
      <div
        className="h-[502px] w-full m-0 flex items-center justify-center"
        style={{
          backgroundImage: "url('/main.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          height: "870px",
        }}
      >
        <div
          className="text-white text-center animate-fade-in text-6xl"
          style={{ animationDuration: "6s", animationDelay: "0.3s" }}
        >
          Rejuvenating vacant houses with youth and vitality
        </div>
      </div>
      <section className="font-semibold uppercase">
        <div className="flex justify-center bg-white w-full pt-10 pb-10 lg:pr-24">
          <div className="text-center text-xl md:text-2xl lg:text-3xl border-b-2 border-solid border-b-gray-950 h-12 ">
            SERVICE
          </div>
        </div>
        <div className="flex justify-center bg-white w-100% h-[500px] sm:h-[530px] md:h-[550px] lg:h-[300px] pb-10 ">
          <div className="lg:flex lg:space-x-60">
            <div className="text-center mt-10">
              <div className="text-xl md:text-2xl lg:text-3xl pb-5">
                3D modeling
              </div>
              <span>Accurate</span>
              <br />
              <span>modeling based</span>
              <br />
              <span>on measured</span>
              <br />
              <span>data</span>
              <br />
              <span>BIM</span>
            </div>
            <div className="text-center mt-10">
              <div className="text-xl md:text-2xl lg:text-3xl pb-5">
                projection mapping
              </div>
              <span>Leverages various</span>
              <br />
              <span>media from</span>
              <br />
              <span>building facade</span>
              <br />
              <span>based on 3d</span>
              <br />
              <span>modeling</span>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div
          className="w-100% pt-10 pb-10 "
          style={{
            backgroundImage: "url('/2.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-center text-xl md:text-2xl lg:text-3xl border-b-2 border-solid border-b-white h-12 justify-center text-white font-semibold">
            DIGITAL TWIN DATA
          </div>

          <div className="flex justify-center w-100% h-[500px] sm:h-[530px] md:h-[550px] lg:h-[300px]  pb-10 ">
            <div className="lg:flex lg:space-x-60 pt-10">
              <div className="text-center mt-10">
                <div className="text-lg md:text-xl lg:text-2xl pb-5 text-white font-semibold">
                  BIM
                </div>
              </div>
              <div className="text-center mt-10">
                <div className="ext-lg md:text-xl lg:text-2xl pb-5 text-white font-semibold">
                  3D
                  <br />
                  Scanning
                </div>
              </div>
              <div className="text-center mt-10">
                <div className="ext-lg md:text-xl lg:text-2xl pb-5 text-white font-semibold">
                  Reality
                  <br />
                  Capture
                </div>
              </div>
              <div className="text-center mt-10">
                <div className="ext-lg md:text-xl lg:text-2xl pb-5 text-white font-semibold">
                  Drone
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section>
                <div className="flex justify-center bg-white w-100% pt-10 pb-10 ">
                    <div className="text-center text-xl md:text-2xl lg:text-3xl border-b-2 border-solid border-b-gray-950 pb-3">
                        CONTACT
                    </div>
                </div>
                <div className="flex justify-center bg-white w-100% pb-10 ">
                    <div className="lg:flex lg:space-x-10 pt-20">
                        <div className="w-96 h-52 bg-slate-500"></div>
                        <div className="text-center mt-10">
                            <div className="text-left text-sm md:text-md lg:text-lg">
                                Tel : 010-5659-2218
                                <br />
                                Email : jnk2218@naver.com
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
    </div>
  );
}

export default Home;
