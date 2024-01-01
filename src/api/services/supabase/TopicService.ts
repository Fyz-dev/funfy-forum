import { ITopic } from 'src/interface';
import { ITopicService } from '../InterfaceServices';
import { TopicCreateDTO } from 'src/api/dto';
import { createTopic, getTopicById, getTopicsByTitle } from './actions';

export default class TopicService implements ITopicService {
  async create(topic: TopicCreateDTO): Promise<void> {
    createTopic(topic);
  }

  async getByTitle(name: string): Promise<ITopic[]> {
    return getTopicsByTitle(name);
  }

  async getById(id: string): Promise<ITopic> {
    return getTopicById(id);
  }
}
