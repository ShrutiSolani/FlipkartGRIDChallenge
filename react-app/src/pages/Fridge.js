import React, { useEffect, useRef } from "react";

const MODEL_UID = "df9a8f7f4b5a4dd3b6bcad6a8bdc1ad2";

const Fridge = () => {
  // This ref will contain the actual iframe object
  const viewerIframeRef = useRef(null);

  const ViewerIframe = (
    <iframe
      // We feed the ref to the iframe component to get the underlying DOM object
      ref={viewerIframeRef}
      title="sketchfab-viewer"
      style={{
        height: "100vh",
        width: 1200,
        flex: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
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

export default Fridge;