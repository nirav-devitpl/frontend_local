import { Button } from "@/components/custom/button";
import { DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useGetCategoryTreeQuery } from "@/services/category";
import CategoryNode from "./category-node";
import { IconX } from "@tabler/icons-react";

/**
 * Function to render the tree view
 * @param handleCloseTree function to handle the close event
 * @returns tree view component
 */
function TreeView({ handleCloseTree }: { handleCloseTree: () => void }) {
    const { data: categoryTree } = useGetCategoryTreeQuery("CATEGORY", {
        selectFromResult: ({ data, ...rest }) => ({
            data: data?.result,
            ...rest,
        })
    });

    /**
     * Function to render the tree view
     * @returns tree view component
     */
    return (
        <div>
            <DrawerHeader className="pl-0">
                <DrawerTitle>
                    <div className="flex items-center justify-between">
                        <div>Tree View</div>
                        <Button size="action" variant="action" onClick={() => handleCloseTree()} className="text-red-500 bg-red-500/10 hover:bg-red-500/30"><IconX /></Button>
                    </div>
                </DrawerTitle>
            </DrawerHeader>

            <div className="mb-4">
                {categoryTree?.map((category:any) => {
                    const renderCategoryTree = (cat: any, level: number) => {
                        return (
                            <div key={cat._id} style={{marginLeft: `${level * 20}px`}}>
                                <CategoryNode category={cat} level={level} />
                                {cat.children?.map((child: any) => renderCategoryTree(child, level + 1))}
                            </div>
                        );
                    };
                    return renderCategoryTree(category, 0);
                })}
            </div>

        </div>
    )
}

export default TreeView;
