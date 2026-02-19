import { useEffect, useState } from "react";
import { baseURL } from "./helper";

export const useThemes =()=> {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    const [themes, setThemes] = useState([]);
    useEffect(() => {
    const fetchTheme = async () => {
      try {
        const res = await fetch(
            `${baseURL}/version2/init/theme`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch theme");
        }
        const json = await res.json();
        setThemes(json.data?.theme || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTheme();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
    return {themes};
}