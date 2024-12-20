import React, { useEffect } from "react";

export default function Auth() {
  useEffect(() => {
    const kakao_code = new URL(window.location.href).searchParams.get("code");
  }, []);

  return (
    <div>
      <h1>AUTH</h1>
    </div>
  );
}
