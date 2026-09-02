import type { SVGProps } from "react";

export function ArrowUpRight(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}><path d="M4 12 12 4M5 4h7v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" /></svg>;
}

export function ArrowDown(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}><path d="M8 2v11M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

export function Mail(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}><rect x="2" y="3" width="12" height="10" stroke="currentColor" strokeWidth="1.3" /><path d="m3 4 5 4 5-4" stroke="currentColor" strokeWidth="1.3" /></svg>;
}
