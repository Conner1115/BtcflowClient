import { useState } from "react";
import { postJson } from "src/lib/request";

export default function usePostJson(
  url: string,
  {
    onComplete,
    onError,
    body,
  }: {
    onComplete?: (result: any) => void;
    onError?: (error: string) => void;
    body: Record<string, any>;
  }
): [
  () => void,
  { data: Record<string, any> | null; loading: boolean; error: string | null }
] {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cb = () => {
    setLoading(true);
    postJson(url, body)
      .then((result) => {
        setData(result);
        onComplete?.(result);
        setLoading(false);
      })
      .catch((error: Error) => {
        setError(error.message);
        onError?.(error.message);
        setLoading(false);
      });
  };

  return [cb, { data, loading, error }];
}
