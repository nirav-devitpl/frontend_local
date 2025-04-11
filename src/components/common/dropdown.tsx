import { useEffect, useState } from "react";
import Select, { Props } from "react-select";
 
interface DropdownProps extends Props {
  placeholder:any;
  list: any;
  handleSelectOnChange: (value: any) => void;
  selectValue: any;
}
 
/**
 * @interface DropdownProps
 * @property {Array<ColumnDef>} columns - Array of column definitions used to configure the table structure and behavior.
 * @property {Array} data - Array of data objects to be displayed in the table.
 */
function Selectable({
  placeholder,
  list,
  handleSelectOnChange,
  selectValue,
  ...props
}: DropdownProps) {
  const [ddOptions, setDdOptions] = useState([]);
  const [dropdownThreshold, setDropdownThreshold] = useState(50);
 
  /**
   * Will update threshold value of dropdown to add next 50 users
   */
 
  const updateThreshold = () => {
    setDdOptions(list?.slice(0, dropdownThreshold + 50));
    setDropdownThreshold((prev) => prev + 50);
  };
 
  /**
   * Will search user from list
   * @param inputValue input value to search into user's data
   */
  const handleSearch = (inputValue: string) => {
    if (inputValue.length > 2) {
      const filteredData = ddOptions.filter((user: any) =>
        user.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      setDdOptions(filteredData);
    } else {
      setDdOptions(list?.slice(0, 50));
    }
  };
  useEffect(() => {
    setDdOptions(list);
  }, [list]);
  return (
      <Select
        placeholder={placeholder}
        className="border-gray-300"
        options={ddOptions}
        onMenuScrollToBottom={updateThreshold}
        isSearchable={true}
        onInputChange={handleSearch}
        onChange={(value) => handleSelectOnChange(value)}
        value={selectValue}
        {...props}
      />
  );
}
export default Selectable;