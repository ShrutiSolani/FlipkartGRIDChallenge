import React, { useEffect, useRef } from "react";

// Our wonderful chair model
const MODEL_UID = "3421e492257f40959859104f46128304";

const Microwave = () => {
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

export default Microwave;
