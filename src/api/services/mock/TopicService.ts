import { ITopic } from 'src/interface';
import { ITopicService } from '../InterfaceServices';
import { topics } from './data';

export default class TopicService implements ITopicService {
  getByTitle(name: string): Promise<ITopic[]> {
    return Promise.resolve(
      topics.filter(topic => {
        return topic.title.toLowerCase().includes(name.toLowerCase());
      }),
    );
  }
}
