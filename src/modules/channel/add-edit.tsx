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
      <div className="flex p-6 pb-6 gap-6 bg-white border-[#e2e8f0]">
        <div className="flex justify-between p-6 bg-white shadow-[0_0_11.2px_0_rgba(0,0,0,0.1)]">
          <p className="w-[914px] h-6 font-poppins font-medium text-lg leading-6 tracking-normal">{id ? 'Edit Channel' : 'Add Channel'}</p>
          <div className="flex items-center">
            <Button className="w-40 h-9 rounded-md p-2.5 gap-2 bg-[#e64560]" variant="default" onClick={() => navigate('/channel-manager') } >Back</Button>
          </div>      
        </div>
      </div>
      <div>
        <Card className="flex">
          <CardContent className="p-4">
            {isLoading ? (
              <Loader />
            ) : (
              <ChannelForm />
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default ChannelAddEditPage;
