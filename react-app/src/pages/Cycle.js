import React, { useEffect, useRef } from "react";

const MODEL_UID = "810aced2ca6f433f8c4597057eb0a9b8";

const Cycle = () => {
  // This ref will contain the actual iframe object
  const viewerIframeRef = useRef(null);

  const ViewerIframe = (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <iframe
        // We feed the ref to the iframe component to get the underlying DOM object
        ref={viewerIframeRef}
        title="sketchfab-viewer"
        style={{
          height: "100vh",
          width: 1500,
          flex: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </div>
  );

  useEffect(
    () => {
      // Initialize the viewer
      let client = new window.Sketchfab(viewerIframeRef.current);
      client.init(MODEL_UID, {
        success: () => {},
        error: () => {
          console.log("Viewer error");
        },
      });
    },
    // We only want to initialize the viewer on first load, so we don't add any dependencies to useEffect
    []
  );

  return ViewerIframe;
};

export default Cycle;
