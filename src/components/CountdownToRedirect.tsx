"use client";
import { LinearProgress, Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const CountdownToRedirect = ({
  path,
  seconds,
}: {
  path: string;
  seconds: number;
}) => {
  const [progress, setProgress] = useState(100);
  const router = useRouter();
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    elementRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((previousProgress) => {
        if (previousProgress <= 0) {
          clearInterval(interval);
          router.push(path);
          return 0;
        }
        return previousProgress - 10 / seconds;
      });
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [path, router, seconds]);

  return (
    <Box sx={{ width: "100%", mt: 1 }} ref={elementRef}>
      <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
        Du blir videresendt om {Math.ceil((progress / 100) * seconds)}{" "}
        sekunder...
      </Typography>
      <LinearProgress
        color={"success"}
        variant="determinate"
        value={progress}
        sx={{ height: 10, borderRadius: 5 }}
      />
    </Box>
  );
};

export default CountdownToRedirect;
