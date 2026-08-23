import DeviceSync from "@/lib/device-sync";
import "./styles.css";

export default function DesktopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DeviceSync expected="desktop" />
      <div data-device="desktop">{children}</div>
    </>
  );
}
