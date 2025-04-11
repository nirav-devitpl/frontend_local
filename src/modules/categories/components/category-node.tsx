/**
 * Function to render the category node
 * @param category category object
 * @param level level of the category
 * @returns category node component
 */
function CategoryNode ({category, level}:{category:any, level:number}){

    /**
     * Function to render the category node
     * @returns category node component
     */
    return(
        <div>
            <div className="flex items-center gap-2">
                <span className="text-gray-500">{level === 0  ? '├─' : '└─'}</span>
                <div className="flex items-center gap-2">
                    <span className="font-medium">{category.name}</span>
                    {category.children?.length > 0 && (
                        <span className="text-xs text-gray-500">({category.children.length})</span>
                    )}
                </div>
            </div>
        </div>
    )

}
export default CategoryNode