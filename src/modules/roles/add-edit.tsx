import { Button } from '@/components/custom/button';
import { Card, CardContent } from '@/components/ui/card';
import Loader from '@/components/common/loader';
import RoleForm from './components/role-form';
import { useNavigate, useParams } from 'react-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next'; 

function RoleAddEditPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [formSubmitHandler, setFormSubmitHandler] = useState<(() => void) | null>(null);

  const handleSaveClick = () => {
    if (formSubmitHandler) {
      formSubmitHandler(); 
    }
  };

  const isDataLoading = false;
  return (
    <>
      <div className="mx-[35px] mb-[10px]">
        <div className="flex items-center space-x-2">
          <button
            className="font-poppins font-normal text-sm leading-5 tracking-normal text-[#e64560] bg-transparent border-none cursor-pointer"
            onClick={() => navigate('/role-manager')}
          >
            {t('SIDEBAR.ROLE_MANAGER')}
          </button>
          <span>&gt;</span>
          <span className="font-poppins font-normal text-sm leading-5 tracking-normal text-[#475569]">
            {id ? t('BUTTON.EDIT_ROLE') : t('BUTTON.ADD_ROLE')}
          </span>
        </div>
      </div>

      <div className="mx-[35px] bg-white border border-gray-200 rounded-lg pb-6 space-y-6 overflow-hidden">
        <div className="bg-white border-[#e2e8f0] w-full">
          <div className="flex justify-between p-6 bg-white shadow-[0_0_11.2px_0_rgba(0,0,0,0.1)] items-center">
            <p className="w-[914px] h-6 font-poppins font-medium text-lg leading-6 tracking-normal">
              {id ? t('BUTTON.EDIT_ROLE') : t('BUTTON.ADD_ROLE')}
            </p>
            <div className="flex items-center">
              <Button
                className="w-40 h-9 rounded-md p-2.5 gap-2 bg-[#e64560] cursor-pointer hover:bg-[#E64560]/90"
                variant="default"
                onClick={handleSaveClick}
              >
                {t('BUTTON.SAVE')}
              </Button>
            </div>
          </div>
        </div>
        <div className="space-x-5">
          <Card>
            {isDataLoading ? (
                <Loader />
              ) : (
                <RoleForm setSubmitHandler={setFormSubmitHandler} />
            )}
          </Card>
        </div>                
      </div>
    </>
  );
}

export default RoleAddEditPage;