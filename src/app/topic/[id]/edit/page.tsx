import { notFound } from 'next/navigation';
import { FC } from 'react';
import { getTopicById } from 'src/api/supabase';
import { ITopic } from 'src/interface';
import CreateEditTopicPage from 'src/app/(home)/create/topic/CreateEditTopicPage';

const getTopic = async (id: string): Promise<ITopic> => {
  try {
    return await getTopicById(id);
  } catch (error) {
    notFound();
  }
};

const EditTopic: FC<{ params: { id: string } }> = async ({ params }) => {
  const topic = await getTopic(params.id);

  return <CreateEditTopicPage editTopicData={topic} />;
};

export default EditTopic;
