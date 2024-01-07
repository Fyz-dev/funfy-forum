import { CreateTopicDTO } from '.';

export type UpdateTopicDTO = Omit<CreateTopicDTO, 'userID'> & {
  topicId: string;
};
