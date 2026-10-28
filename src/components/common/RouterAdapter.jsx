import React, { forwardRef } from "react";
import {
  Link as RouterLink,
  useNavigate,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";

export const Link = forwardRef(function Link(
  { href, to, children, ...props },
  ref
) {
  const target = to || href || "/";
  return (
    <RouterLink ref={ref} to={target} {...props}>
      {children}
    </RouterLink>
  );
});

export function useRouter() {
  const navigate = useNavigate();
  const location = useLocation();

  return {
    push: (path) => navigate(path),
    replace: (path) => navigate(path, { replace: true }),
    back: () => navigate(-1),
    forward: () => navigate(1),
    refresh: () => window.location.reload(),
    pathname: location.pathname,
  };
}

export function usePathname() {
  const location = useLocation();
  return location.pathname;
}

export { useParams, useSearchParams };
export default Link;

