import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarWrapper } from "@/modules/dashboard/componets/sidebar-wrapper";
import { AppSidebar } from "@/modules/dashboard/componets/app-sidebar";
import AppHeader from "@/modules/dashboard/componets/app-header";

const SettingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarWrapper>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarWrapper>
  );
};

export default SettingLayout;
