import React from "react";
import Header from "../components/common/Header";
import {
  BookAudioIcon,
  BookDashedIcon,
  BookTemplate,
  ChartColumnBig,
  ChartColumnStacked,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="dark:bg-boxdark-2 h-screen">
      <Header />
      <div className="dark:bg-boxdark-2 py-10">
        <div className="">
          <div className="md:w-[40%] w-full md:mx-auto flex flex-col gap-3 text-center">
            <h1 className="text-3xl dark:text-white font-bold">
              AI Content <span className="text-purple-700">Generator</span>
            </h1>
            <p className="dark:text-white">
              The AI Content Generator creates high-quality written content
              automatically based on user input and topics provided.
            </p>

            <span>
              <button
                onClick={() => navigate("/dashboard")}
                className="border rounded-lg text-white bg-[#7E5FF9] py-2 px-6"
              >
                Get Started
              </button>
            </span>
          </div>
        </div>

        <div className="container grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 mx-auto p-5">
          <div className="flex flex-col gap-3 border border-stroke bg-white dark:border-strokedark dark:bg-boxdark rounded-lg p-5">
            <div className="bg-[#7E5FF9] w-10 h-10 flex justify-center items-center rounded-lg text-center">
              <BookTemplate className="text-white" />
            </div>
            <h4 className="font-bold dark:text-white">25+ Templated</h4>
            <p className="italic dark:text-white">
              Access over 25 professionally designed content templates.
            </p>
          </div>
          <div className="flex flex-col gap-3 border border-stroke bg-white dark:border-strokedark dark:bg-boxdark rounded-lg p-5">
            <div className="bg-[#7E5FF9] w-10 h-10 flex justify-center items-center rounded-lg text-center">
              <ChartColumnStacked className="text-white" />
            </div>
            <h4 className="font-bold dark:text-white ">10,000 Words Free</h4>
            <p className="italic dark:text-white">
              Generate up to 10,000 words at no cost.
            </p>
          </div>
          <div className="flex flex-col gap-3 border border-stroke bg-white dark:border-strokedark dark:bg-boxdark rounded-lg p-5">
            <div className="bg-[#7E5FF9] w-10 h-10 flex justify-center items-center rounded-lg text-center">
              <BookAudioIcon className="text-white" />
            </div>
            <h4 className="font-bold dark:text-white">Optimize Content</h4>
            <p className="italic dark:text-white">
              Enhance your content for better engagement and SEO.
            </p>
          </div>
          <div className="flex flex-col gap-3 border border-stroke bg-white dark:border-strokedark dark:bg-boxdark rounded-lg p-5">
            <div className="bg-[#7E5FF9] w-10 h-10 flex justify-center items-center rounded-lg text-center">
              <ChartColumnBig className="text-white" />
            </div>
            <h4 className="font-bold dark:text-white"> Easy to Use</h4>
            <p className="italic dark:text-white">
              User-friendly interface for seamless content generation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
