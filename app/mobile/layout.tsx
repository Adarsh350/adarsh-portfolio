import DeviceSync from "@/lib/device-sync";
import "./styles.css";

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DeviceSync expected="mobile" />
      <div data-device="mobile">{children}</div>
    </>
  );
}
