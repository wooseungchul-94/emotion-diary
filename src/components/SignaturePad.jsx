import React, { useRef, useEffect } from "react";
import SignaturePad from "signature_pad";

export default function CustomSignaturePad() {
  const canvasRef = useRef(null);
  const signaturePadRef = useRef(null);

  useEffect(() => {
    // SignaturePad 초기화
    signaturePadRef.current = new SignaturePad(canvasRef.current);
  }, []);

  const clear = () => {
    signaturePadRef.current.clear();
  };

  const save = () => {
    if (!signaturePadRef.current.isEmpty()) {
      const dataURL = signaturePadRef.current.toDataURL("image/png");
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'signature.png';
      link.click();
    } else {
      alert("서명을 먼저 해주세요!");
    }
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={500}
        height={200}
        style={{ border: "1px solid #000", borderRadius: "8px" }}
      />
      <div style={{ marginTop: 10 }}>
        <button onClick={clear} style={{ marginRight: 10 }}>지우기</button>
        <button onClick={save}>저장하기</button>
      </div>
    </div>
  );
}
