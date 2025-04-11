export interface Category {
    name: string;
    parentCategory: string;
    isActive: boolean;    
}

export interface CategoryResponse extends Category {
    parentCategoryDetails: Category;
    _id: string;
}

export interface CategoryAddEditProps {
    name: string;
    id: string | null;
    handleClose: () => void;
}

export interface CategoryFormData {
    name: string;
    parentCategory?: {
        label: string;
        value: string;
    };
    status: "active" | "inactive";
}
