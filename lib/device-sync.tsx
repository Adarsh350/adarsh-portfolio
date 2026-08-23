"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BREAKPOINT_PX, COOKIE_NAME } from "@/lib/device";

type Device = "mobile" | "desktop";

function actualDevice(): Device {
  return window.innerWidth < BREAKPOINT_PX ? "mobile" : "desktop";
}

function currentCookieDevice(): Device | null {
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE_NAME}=(mobile|desktop)`)
  );
  return match ? (match[1] as Device) : null;
}

function correctIfWrong(expected: Device, router: ReturnType<typeof useRouter>) {
  const real = actualDevice();
  if (real === expected) return;
  if (currentCookieDevice() === real) return; // already correct, avoid redundant refresh

  document.cookie = `${COOKIE_NAME}=${real}; path=/; max-age=31536000; samesite=lax`;
  router.refresh();
}

export default function DeviceSync({ expected }: { expected: Device }) {
  const router = useRouter();

  useEffect(() => {
    correctIfWrong(expected, router);

    const mql = window.matchMedia(`(max-width: ${BREAKPOINT_PX - 1}px)`);
    const onChange = () => correctIfWrong(expected, router);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expected]);

  return null;
}
