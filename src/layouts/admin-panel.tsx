import { Outlet } from "react-router";
import { Layout } from "@/components/common/layout";
import useIsCollapsed from "@/hooks/use-is-collapsed";
import Sidebar from "@/components/common/sidebar";

export default function AdminLayout() {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed();
  return (
    <div className="relative h-full overflow-hidden bg-background mt-[50px]">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        id="content"
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${
          isCollapsed ? "md:ml-14" : "md:ml-64"
        } h-full`}
      >
        <Layout>
          {/* <LayoutHeader className="sticky top-0 justify-between px-4 py-3 shadow md:px-4"> */}
            {/* <Header />  */}
          {/* </LayoutHeader> */}
          <Outlet />
          {/* <LayoutBody className="space-y-4 px-2 bg-secondary h-full">
            <Outlet />
          </LayoutBody> */}
        </Layout>
      </main>
    </div>
  );
}
