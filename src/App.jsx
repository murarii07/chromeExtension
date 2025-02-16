import React, { useEffect, useState } from "react";
import { ExternalLink, RefreshCw } from "lucide-react";

const App = () => {
  const [url, setUrl] = useState("");
  const [flag, setFlag] = useState("");
  const [percent, setPercent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [start, setStart] = useState(0);

  useEffect(() => {
    sendPredictionRequest(url);
  }, [url]);

  useEffect(() => {
    if (typeof chrome !== "undefined" && chrome.tabs) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0) {
          setUrl(tabs[0].url);
        }
      });
    } else {
      setUrl(window.location.href);
    }
  }, []);

  async function sendPredictionRequest(url) {
    if (!url) {
      setIsLoading(true);
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(
        "https://16e5-103-14-233-220.ngrok-free.app/news",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setFlag(Object.keys(data)[0]);
      let r = Object.values(data)[0];
      let s = parseFloat(r) * 100;
      setPercent(s.toFixed(2));
    } catch (error) {
      setError(error.message || "Failed to analyze URL");
    } finally {
      setIsLoading(false);
    }
  }

  const getStatusInfo = () => {
    if (!flag || !percent) return null;

    if (flag.toLowerCase() === "false") {
      return {
        color: "bg-red-200",
        textColor: "text-red-900",
        title: "⚠️ Potentially Fake Content",
        description: `Confidence: ${percent}%`,
      };
    }

    return {
      color: "bg-green-200",
      textColor: "text-green-900",
      title: "✅ Real Content",
      description: `Confidence: ${percent}%`,
    };
  };

  const statusInfo = getStatusInfo();
  useEffect(() => {
    if (percent) {
      setTimeout(() => {
        setStart(1);
      }, 500);
    }
  }, [percent]);
  useEffect(() => {
    if (start >= 1 && start<=parseInt(percent)) {
      setTimeout(() => {
        setStart(s=>s+1);
      }, 10);
    }
  }, [start]);
  return (
    <div className="w-[350px] bg-white shadow-lg rounded-xl font-sans p-5 flex flex-col space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
        <div className="text-3xl font-semibold tracking-wide text-blue-900">
          NewsFact<span className="text-blue-400">.</span>
        </div>
      </div>

      <div className="mt-3 flex items-center bg-gray-100 p-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-out">
        <div className="text-sm text-gray-700 truncate flex-1" title={url}>
          {url || "No URL detected"}
        </div>
        <ExternalLink className="h-5 w-5 text-gray-500 hover:text-blue-500 cursor-pointer transition-all duration-300 ease-out" />
      </div>

      {(!url || typeof chrome === "undefined") && (
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL to analyze"
          className="mt-4 w-full p-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ease-out placeholder-gray-500"
        />
      )}

      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <RefreshCw className="w-12 h-12 animate-spin text-blue-600" />
        </div>
      ) : (
        <>
          {error && (
            <div className="mt-4 p-3 bg-red-200 text-red-900 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}

          {statusInfo && !isLoading && !error && (
            <div
              className={`mt-4 p-6 rounded-lg ${statusInfo.color} ${statusInfo.textColor} text-center shadow-lg hover:shadow-xl transition-all duration-300 ease-out`}
            >
              <h2 className="font-semibold text-lg mb-2">{statusInfo.title}</h2>
              <p className="text-sm mb-4">{statusInfo.description}</p>

              <div className="mt-4">
                <div className="text-sm font-medium">Confidence Score</div>
                <div className="w-full bg-white rounded-full h-3 mt-2 shadow-inner">
                  <div
                    className="h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${start}%`,
                      backgroundColor:
                        flag.toLowerCase() === "false" ? "#ef4444" : "#22c55e",
                    }}
                  />
                  {/* <LoadingBar percentage={percent} color={flag.toLowerCase() === "false" ? "#ef4444" : "#22c55e"} /> */}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
