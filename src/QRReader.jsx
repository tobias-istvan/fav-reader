import { useState } from "react";
import { useZxing } from "react-zxing";
import { decompressFromUTF16 } from "lz-string";
import { motion } from "framer-motion";

export const QRREader = () => {
  const [result, setResult] = useState("");
  const { ref } = useZxing({
    onDecodeResult(result) {
      const str = decompressFromUTF16(result.getText());
      setResult(str);
    },
  });

  return (
    <>
      <video ref={ref} />
      <p>
        <span>Last result:</span>
        {!!result && (
          <motion.pre
            key={result}
            initial={{ opacity: 0, y: '500px' }}
            animate={{ opacity: 1, y: '0px' }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: "left" }}
          >
            {result}
          </motion.pre>
        )}
      </p>
    </>
  );
};
