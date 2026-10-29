import React, { forwardRef } from "react";
import {
  Link as RouterLink,
  useNavigate,
  useLocation,
  useParams,
  useSearchParams as useRouterSearchParams,
} from "react-router-dom";

export const Link = forwardRef(function Link(
  { href, to, onClick, children, ...props },
  ref
) {
  const target = to || href || "/";

  const handleClick = (e) => {
    // If not a hash anchor, scroll smoothly to top
    if (typeof target === "string" && !target.includes("#")) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
    if (onClick) onClick(e);
  };

  return (
    <RouterLink ref={ref} to={target} onClick={handleClick} {...props}>
      {children}
    </RouterLink>
  );
});

export function useRouter() {
  const navigate = useNavigate();
  const location = useLocation();

  return {
    push: (path) => {
      navigate(path);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    },
    replace: (path) => {
      navigate(path, { replace: true });
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    },
    back: () => {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate("/");
      }
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    },
    forward: () => {
      navigate(1);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    },
    refresh: () => window.location.reload(),
    pathname: location.pathname,
  };
}

export function usePathname() {
  const location = useLocation();
  return location.pathname;
}

// Next.js returns a URLSearchParams instance directly from useSearchParams()
// whereas react-router returns [searchParams, setSearchParams]
export function useSearchParams() {
  const [searchParams] = useRouterSearchParams();
  return searchParams;
}

export { useParams };
export default Link;
