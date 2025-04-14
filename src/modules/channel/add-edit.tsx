import { Button } from '@/components/custom/button';
import { Card, CardContent } from '@/components/ui/card';
import Loader from '@/components/common/loader';
import ChannelForm from './components/channel-form';
import { useNavigate, useParams } from 'react-router';

function ChannelAddEditPage() {

  
  const { id } = useParams();

    const navigate = useNavigate();

    const isLoading = false;
  return (    
      <>
      <div className="mt-[43px] mx-[35px] mb-[16px]">
        <div className="flex items-center space-x-2">
          <button
            className="font-poppins font-normal text-sm leading-5 tracking-normal text-[#e64560] bg-transparent border-none cursor-pointer"
            onClick={() => navigate('/channel-manager')}
          >
            Channels
          </button>
          <span>&gt;</span>
          <span className="font-poppins font-normal text-sm leading-5 tracking-normal text-[#475569]">{id ? 'Edit Channel' : 'Add Channel'}</span>
        </div>
      </div>
      <div className="mx-[35px] bg-white border border-gray-200 rounded-lg pb-6 space-y-6 overflow-hidden">        
        <div className="bg-white border-[#e2e8f0] w-full">
          <div className="flex justify-between p-6 bg-white shadow-[0_0_11.2px_0_rgba(0,0,0,0.1)] items-center">
            <p className="w-[914px] h-6 font-poppins font-medium text-lg leading-6 tracking-normal">{id ? 'Edit Channel' : 'Add Channel'}</p>
            <div className="flex items-center">
              <Button className="w-40 h-9 rounded-md p-2.5 gap-2 bg-[#e64560]" variant="default" onClick={() => navigate('/channel-manager') } >Save</Button>
            </div>      
          </div>
        </div>
        <div className="w-[70px] m-6 space-x-5 border-b-[3px] border-red-500 text-center items-center">
          Create
        </div>
        <div className="space-x-5">
          <Card className="">
            <CardContent className="mt-0 mx-6 p-4 border border-gray-200 rounded-lg space-y-6">
              {isLoading ? (
                <Loader />
              ) : (
                <ChannelForm />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      </>
  );
}

export default ChannelAddEditPage;
