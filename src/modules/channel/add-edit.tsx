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
      <div className="flex justify-between px-4 py-2 items-center h-[52px]">
        <h1 className="font-semibold text-lg">{id ? 'Edit Channel' : 'Add Channel'}</h1>
        <div className="flex items-center">
          <Button className='ml-2 flex items-center' variant="default" onClick={() => navigate('/channel-manager') } >Back</Button>
        </div>
      </div>
      <Card>
        <CardContent className="p-4">
          {isLoading ? (
            <Loader />
          ) : (
            <ChannelForm />
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default ChannelAddEditPage;
