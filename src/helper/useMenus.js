import { useEffect, useState } from "react";
import { baseURL } from "../helper";

const useMenus = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${baseURL}/version2/init/menus`);
        
        if (!res.ok) {
          throw new Error(`Failed to fetch menus: ${res.status}`);
        }
        
        const json = await res.json();
        setMenus(json.data || []);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Menu fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);
  
  return { menus, loading, error };
};

export default useMenus;