import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Game } from "./components/Game";
import React, { useEffect, useState } from "react";
import { Infos } from "./components/panels/Infos";
import { useTranslation } from "react-i18next";
import { Settings } from "./components/panels/Settings";
import { useSettings } from "./hooks/useSettings";
import { Stats } from "./components/panels/Stats";

function App() {
  const { t, i18n } = useTranslation();

  const [infoOpen, setInfoOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);

  const [settingsData, updateSettings] = useSettings();

  useEffect(() => {
    if (settingsData.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [settingsData.theme]);

  return (
    <>
      <div className="absolute hidden md:block" style={{ opacity: 0.15 }}>
        <img
          src="https://pngimg.com/d/book_PNG51067.png"
          alt="logo"
          width="300"
        />
      </div>
      <ToastContainer
        hideProgressBar
        position="top-center"
        transition={Flip}
        theme={settingsData.theme}
        autoClose={5000}
        bodyClassName="font-bold text-center"
      />
      <Infos
        isOpen={infoOpen}
        close={() => setInfoOpen(false)}
        settingsData={settingsData}
      />
      <Settings
        isOpen={settingsOpen}
        close={() => setSettingsOpen(false)}
        settingsData={settingsData}
        updateSettings={updateSettings}
      />
      <Stats
        isOpen={statsOpen}
        close={() => setStatsOpen(false)}
        distanceUnit={settingsData.distanceUnit}
      />
      <div
        className="flex justify-center flex-auto relative"
        // style={{ background: "linear-gradient(#2c5363,#0f2027)" }}
      >
        <div className="w-full max-w-lg flex flex-col relative z-10 bg-white bg-opacity-75 md:bg-transparent">
          <header className="border-b-2 px-3 py-2 border-gray-200 flex items-center relative justify-between">
            <button
              className="text-xl"
              type="button"
              onClick={() => setInfoOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="absolute left-1/2 transform -translate-x-1/2 my-1">
              <img
                src={`${process.env.PUBLIC_URL}/images/versedle-logo-title.png`}
                alt="VERSEDLE"
                className="h-7 md:pr-0"
                style={{ paddingRight: "2.625rem" }}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1 text-xs cursor-pointer">
                <span className={!settingsData.easyMode ? "font-bold" : ""}>
                  Hard
                </span>
                <div
                  className="relative inline-block w-10 h-5 transition duration-200 ease-in-out"
                  onClick={() =>
                    updateSettings({ easyMode: !settingsData.easyMode })
                  }
                >
                  <div
                    className="absolute top-0 left-0 right-0 bottom-0 rounded-full transition-colors"
                    style={{
                      backgroundColor: settingsData.easyMode
                        ? "rgb(210, 167, 16)"
                        : "rgb(16, 73, 59)",
                    }}
                  />
                  <div
                    className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                      settingsData.easyMode ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </div>
                <span className={settingsData.easyMode ? "font-bold" : ""}>
                  Easy
                </span>
              </label>
              <button
                className="text-xl"
                type="button"
                onClick={() => setStatsOpen(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
              </button>
            </div>
          </header>
          <Game settingsData={settingsData} />
          <footer className="flex justify-center text-sm mt-8 mb-1"></footer>
        </div>
        <div
          className="absolute bottom-0 right-0 z-0"
          style={{ opacity: 0.15 }}
        >
          <img
            src="https://pngimg.com/d/book_PNG51067.png"
            alt="logo"
            width="342"
          />
        </div>
      </div>
    </>
  );
}

export default App;
