import { ITopic } from 'src/interface';
import { ITopicService } from '../InterfaceServices';
import { topics } from './data';

export default class TopicService implements ITopicService {
  async getByTitle(name: string): Promise<ITopic[]> {
    return Promise.resolve(
      topics.filter(topic => {
        return topic.title.toLowerCase().includes(name.toLowerCase());
      }),
    );
  }

  async getById(id: string): Promise<ITopic> {
    const topic = topics.find(topic => id === topic.id);

    if (topic) return Promise.resolve(topic);

    throw new Error('Not find user');
  }
}
