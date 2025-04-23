import { Card } from '@/components/ui/card';
import Loader from '@/components/common/loader';
import { Suspense, lazy, useState } from 'react';
import { Button } from '@/components/custom/button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import FilterPopOver from './components/FilterPopOver';
import { AddIcon, SearchIcon } from '@/components/common/icon';

const RoleListingPage = lazy(() => import('./components/listing'));

function RolePage() {  
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [roleValues, setRoleValues] = useState<Record<string, string>>({
    filterValue: '',
    searchValue: '',
  });

  /**
   * @method handleFilterChange
   * @description Handles the filter change event and updates the filter value in the state.
   * @param value - The selected filter value.
   * @returns {void}
   */
  const handleFilterChange = (value: string) => {
    setRoleValues((prev) => ({ ...prev, filterValue: value === 'clear' ? '' : value }));
  };

  /**
   * @method handleSearchChange
   * @description Handles the search input change event and updates the search value in the state.
   * @param e - The event object from the input change.
   * @returns {void}
   */
  const handleSearchChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setRoleValues((prev) => ({ ...prev, searchValue: (e.target as HTMLInputElement).value }));
  }
 
  return (
    <Card className="px-4">
      <div className="flex justify-between px-4 py-2 items-center h-[52px]">
        <div className="flex items-center w-[400px] h-[36px] gap-2 rounded-md border px-5 border-gray-200 bg-white">
          <SearchIcon />
          <input
            type="text"
            className="flex-1 h-full bg-transparent outline-none"
            placeholder={t('PLACEHOLDER.SEARCH')}
            value={roleValues.searchValue}
            onChange={handleSearchChange} 
          />
        </div>
        <FilterPopOver roleProps={roleValues} t={t} handleFilterChangeProps={handleFilterChange} />
      </div>      
      <div className="flex justify-end px-4 py-2 items-center h-[52px]">
        <Button
          className="ml-2 flex items-right w-[160px] h-[40px] gap-2 rounded-[4px] bg-[#E64560] text-white cursor-pointer"
          variant="filter"
          onClick={() => navigate('/roles/add')}
        >
          <AddIcon />
          {t('BUTTON.ADD_ROLE')}
        </Button>
      </div>
      <Suspense fallback={<Loader />}>
        <RoleListingPage filterValue={roleValues.filterValue} searchValue={roleValues.searchValue} />
      </Suspense>      
    </Card>
  );
}

export default RolePage;