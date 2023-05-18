console.log("working");
let dataQueue = [];
const MAX_BATCH_SIZE = 50;
const MAX_WAIT_TIME = 5000; // 5 seconds

chrome.webRequest.onCompleted.addListener(
  (details) => {
    if (details.type === "image") {
      dataQueue.push(details);
      if (
        dataQueue.length >= MAX_BATCH_SIZE ||
        (dataQueue.length > 0 &&
          new Date().getTime() - dataQueue[0].timeStamp > MAX_WAIT_TIME)
      ) {
        console.log("reached");
        fetch("http://localhost:6969/queue", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: details.url,
            tabId: details.tabId,
          }),
        })
          .then((response) => {
            console.log("Data sent to server");
            // Clear queue
            dataQueue = [];
          })
          .catch((error) => {
            console.error("Error sending data to server:", error);
          });
      }
    }
  },
  { urls: ["<all_urls>"] }
);
